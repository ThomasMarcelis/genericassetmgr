import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { NgbdSortableHeader, SortEvent } from '../../sortable.directive';
import { Message, MessageType } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';


interface NodeInfo {
	element: Element;
	depth: number;
	startTag: string;
  }  

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
  


  function getStartTag(element: Element): string {
	let startTag = '<' + element.nodeName;
  
	// If the element has any attributes, add them to the start tag
	for (let i = 0; i < element.attributes.length; i++) {
	  const attr = element.attributes[i];
	  startTag += ' ' + attr.name + '="' + attr.value + '"';
	}
  
	startTag += '>';
  
	return startTag;
  }

  function flattenTree(node: NodeElement, depth = 0): Array<NodeInfo> {
	let flatList: Array<NodeInfo> = [{element: node.element, depth: depth, startTag: getStartTag(node.element)}];
  
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

	showTextBox = false;
	newRestriction: string;

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

	addNewRestriction() {
		this.showTextBox = true;
		this.newRestriction = '';
	  }
	
	  async saveRestriction() {
		await this.service.addRestriction(this.newRestriction);
		// Add any additional logic after saving the restriction
		this.showTextBox = false;
	  }
}
