// message.service.ts

import { Injectable, PipeTransform } from '@angular/core';
import { Message } from '../models/message';
import { BehaviorSubject, Observable, Subject, debounceTime, delay, of, switchMap, tap } from 'rxjs';
import { sampleMessages } from '../models/messages';
import { SortColumn, SortDirection } from '../sortable.directive';
import { DecimalPipe } from '@angular/common';



interface SearchResult {
	messages: Message[];
	total: number;
}

interface State {
	page: number;
	pageSize: number;
	searchTerm: string;
	sortColumn: SortColumn;
	sortDirection: SortDirection;
}

const compare = (v1: string | number, v2: string | number) => (v1 < v2 ? -1 : v1 > v2 ? 1 : 0);

function sort(messages: Message[], column: SortColumn, direction: string): Message[] {
	if (direction === '' || column === '') {
		return messages;
	} else {
		return [...messages].sort((a, b) => {
			const res = compare(a[column], b[column]);
			return direction === 'asc' ? res : -res;
		});
	}
}

function matches(message: Message, term: string, pipe: PipeTransform) {
	return (
		message.name.toLowerCase().includes(term.toLowerCase()) ||
		pipe.transform(message.description).includes(term) ||
		pipe.transform(message.content).includes(term)
	);
}

@Injectable({
    providedIn: 'root'
  })
export class MessageService {

    private _loading$ = new BehaviorSubject<boolean>(true);
	private _search$ = new Subject<void>();
	private _messages$ = new BehaviorSubject<Message[]>([]);
	private _total$ = new BehaviorSubject<number>(0);

	private _state: State = {
		page: 1,
		pageSize: 4,
		searchTerm: '',
		sortColumn: '',
		sortDirection: '',
    };

	constructor(private pipe: DecimalPipe) {
		this._search$
			.pipe(
				tap(() => this._loading$.next(true)),
				debounceTime(200),
				switchMap(() => this._search()),
				delay(200),
				tap(() => this._loading$.next(false)),
			)
			.subscribe((result) => {
				this._messages$.next(result.messages);
				this._total$.next(result.total);
			});

		this._search$.next();
	}

    get messages$() {
        return this._messages$.asObservable();
    }
    get total$() {
        return this._total$.asObservable();
    }
    get loading$() {
        return this._loading$.asObservable();
    }
    get page() {
        return this._state.page;
    }
    get pageSize() {
        return this._state.pageSize;
    }
    get searchTerm() {
        return this._state.searchTerm;
    }

    set page(page: number) {
        this._set({ page });
    }
    set pageSize(pageSize: number) {
        this._set({ pageSize });
    }
    set searchTerm(searchTerm: string) {
        this._set({ searchTerm });
    }
    set sortColumn(sortColumn: SortColumn) {
        this._set({ sortColumn });
    }
    set sortDirection(sortDirection: SortDirection) {
        this._set({ sortDirection });
    }

    private _set(patch: Partial<State>) {
        Object.assign(this._state, patch);
        this._search$.next();
    }

    private _search(): Observable<SearchResult> {
        const { sortColumn, sortDirection, pageSize, page, searchTerm } = this._state;

        // 1. sort
        let messages = sort(sampleMessages, sortColumn, sortDirection);

        // 2. filter
        messages = messages.filter((message) => matches(message, searchTerm, this.pipe));
        const total = messages.length;

        // 3. paginate
        messages = messages.slice((page - 1) * pageSize, (page - 1) * pageSize + pageSize);
        return of({ messages, total });
    }
}
