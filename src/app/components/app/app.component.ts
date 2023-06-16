import { DecimalPipe } from '@angular/common';
import { Component, QueryList, ViewChildren } from '@angular/core';
import { Observable } from 'rxjs';

import { NgbdSortableHeader, SortEvent } from '../../sortable.directive';
import { Message, MessageType, Restriction } from 'src/app/models/message';
import { MessageService } from 'src/app/services/message.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { map, filter, tap } from 'rxjs/operators'


interface NodeInfo {
	element: Element;
	depth: number;
	startTag: string;
	restrictions: Restriction[];
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
	let flatList: Array<NodeInfo> = [{element: node.element, depth: depth, startTag: getStartTag(node.element), restrictions: []}];
  
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
	nodes: NodeInfo[];
	showTextBox: Map<string, boolean>;
	newRestriction: Map<string, string>;
	selectedMessageRestrictions: Restriction[];
	selectedRestrictionMap: Map<string, Restriction[]>;

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
		const rootNode = xmlToTree(xmlDoc.documentElement);
		// Flatten the tree to a list
		//TODO function scope is beyond flattening now, find better name or stucture
		const flatList = flattenTree(rootNode);
		console.log(flatList);
		this.nodes = flatList;

		this.selectedRestrictionMap = new Map<string, Restriction[]>();
		this.newRestriction = new Map<string, string>();
		this.showTextBox = new Map<string, boolean>();
		this.nodes.forEach(node => {
			//outerHTML is the unique ID for the element
			this.selectedRestrictionMap.set(node.element.outerHTML, []);
			this.newRestriction.set(node.element.outerHTML, '');
			this.showTextBox.set(node.element.outerHTML, false);
		});
		this.selectedRestrictionMap.set("unmappedrestrictions", []);

		// Get the restrictions for this message, async
		this.service.getRestrictions(message.id.toString()).then(restrictions => {
			restrictions.forEach(restriction => {
				console.log("restrictions: ", restriction);
				const elementList = this.selectedRestrictionMap.get(restriction.elementId);
				console.log(elementList);
				console.log(restriction.elementId);
				if(elementList != undefined) {
					elementList.push(restriction);
				} else {
					this.selectedRestrictionMap.get("unmappedrestrictions")?.push(restriction);
				}
			});
			//this.logRestrictions()
		});
	}

	getUnqiqueMessageOwners(): Observable<String[]> {
		return this.messages$.pipe(
			map(messages => [ ...new Set(messages.map(message => message.domainOwner))]),
			tap(_ => console.log('fetched message owners')),
		)
	}

	getUnqiqueMessageApplications(): Observable<String[]> {
		return this.messages$.pipe(
			map(messages => [ ...new Set(messages.map(message => message.application))]),
			tap(_ => console.log('fetched message apps')),
		)
	}

	getUnqiqueMessageDomains(): Observable<String[]> {
		return this.messages$.pipe(
			map(messages => [ ...new Set(messages.map(message => message.domain))]),
			tap(_ => console.log('fetched message Domains')),
		)
	}

	parseMessage(message: Message): NodeListOf<Element> {
		//if(message.type == MessageType.XSD) {
			var document = new DOMParser().parseFromString(message.content, "text/xml");
			var nodes = document.querySelectorAll('*')
			return nodes
		//}
	}

	addNewRestriction(node: NodeInfo) {
		this.showTextBox.set(node.element.outerHTML, true);
	  }
	
	  async saveRestriction(node: NodeInfo) {

		//TODO: Change node IDs
		//let addRestriction = new Restriction()
		//addRestriction.messageId = this.selectedMessage.id.toString();
		//addRestriction.elementId = node.element.outerHTML;
		//addRestriction.id = addRestriction.messageId + addRestriction.elementId;
		//addRestriction.rule = this.newRestriction;

		//await this.service.addRestriction(addRestriction);
		// Add any additional logic after saving the restriction
		this.showTextBox.set(node.element.outerHTML, false);
	  }


	  log(val: any) { console.log(val); }

	  logRestrictions() {

		this.selectedRestrictionMap.forEach((value, key) => {
			console.log(key);
			console.log(value);
		});

	   }
}
