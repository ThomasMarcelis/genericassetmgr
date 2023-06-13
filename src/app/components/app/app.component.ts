import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { NgbdSortableHeader, SortEvent } from '../../sortable.directive';
import { Message, MessageType } from 'src/app/models/message';
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
	nodes: NodeListOf<Element>;

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
		
		this.selectedMessage = message;
		this.nodes = this.parseMessage(message);
		console.log(this.nodes)
	  }

	parseMessage(message: Message): NodeListOf<Element> {
		//if(message.type == MessageType.XSD) {
			var document = new DOMParser().parseFromString(message.content, "text/xml");
			var nodes = document.querySelectorAll('*')
			return nodes
		//}
	}
}
