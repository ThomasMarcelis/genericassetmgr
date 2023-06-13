import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { NgbdSortableHeader, SortEvent } from '../../sortable.directive';
import { Message } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';




@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  providers: [MessageService, DecimalPipe],
})
export class AppComponent {
	messages$: Observable<Message[]>;
	total$: Observable<number>;
	selectedMessage: Message;

	@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;

	constructor(public service: MessageService) {
		this.messages$ = service.messages$;
		this.total$ = service.total$;
	}

	onSort({ column, direction }: SortEvent) {
		// resetting other headers
		this.headers.forEach((header) => {
			if (header.sortable !== column) {
				header.direction = '';
			}
		});

		this.service.sortColumn = column;
		this.service.sortDirection = direction;
	}

	onRowClicked(message: Message): void {
		console.log('Message clicked: ', message);
		this.selectedMessage = message;
	  }
}
