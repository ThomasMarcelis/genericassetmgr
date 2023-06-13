import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { NgbdSortableHeader, SortEvent } from '../../sortable.directive';
import { Message, MessageType } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';


interface NodeElement {
	element: Element;
	children: NodeElement[];
  }
  
  function xmlToTree(xml: Element, depth = 0): NodeElement {
	let node: NodeElement = { element: xml, children: [] };
  
	const childNodes = Array.from(xml.children);
	childNodes.forEach((child: Element) => {
	  node.children.push(xmlToTree(child, depth + 1));
	});
  
	return node;
  }
  
  function flattenTree(node: NodeElement, depth = 0): Array<{element: Element, depth: number}> {
	let flatList: Array<{element: Element, depth: number}> = [{element: node.element, depth: depth}];
  
	node.children.forEach(child => {
	  flatList = flatList.concat(flattenTree(child, depth + 1));
	});
  
	return flatList;
  }
  


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
	nodes: { element: Element; depth: number; }[];

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
		//this.nodes = this.parseMessage(message);
		// Parse the XML string to a DOM object
		const parser = new DOMParser();
		const xmlDoc = parser.parseFromString(message.content, "text/xml");

		// Convert the XML to a tree data structure
		const rootNode = xmlToTree(xmlDoc.documentElement);

		// Flatten the tree to a list
		const flatList = flattenTree(rootNode);

		console.log(flatList);
		this.nodes = flatList;

	  }

	parseMessage(message: Message): NodeListOf<Element> {
		//if(message.type == MessageType.XSD) {
			var document = new DOMParser().parseFromString(message.content, "text/xml");
			var nodes = document.querySelectorAll('*')
			return nodes
		//}
	}
}
