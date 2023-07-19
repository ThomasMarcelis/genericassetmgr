import { DecimalPipe } from '@angular/common';
import { Component, OnInit, QueryList, ViewChildren } from '@angular/core';
import { Observable, of } from 'rxjs';

import { NgbdSortableHeader, SortEvent } from '../../sortable.directive';
import { Message, MessageType, Restriction } from '../../models/message';
import { MessageService } from '../../services/message.service';
import { FormArray, FormControl, FormGroup } from '@angular/forms';
import { map, filter, tap } from 'rxjs/operators'
import { RestrictionService } from "../../services/restriction.service";
import { ExampleValueService } from 'app/services/exampleValue.service';

declare interface TableData {
    headerRow: string[];
    dataRows: string[][];
}


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
    selector: 'table-cmp',
    moduleId: module.id,
    templateUrl: 'table.component.html'
})
export class TableComponent{

    messages$: Observable<Message[]>;
	total$: Observable<number>;
	selectedMessage: Message;
	@ViewChildren(NgbdSortableHeader) headers: QueryList<NgbdSortableHeader>;
	nodes: NodeInfo[];
	showTextBox: Map<string, boolean>;
	newRestriction: Map<string, string>;
	selectedMessageRestrictions: Observable<Restriction[]>;
	selectedRestrictionMap: Map<string, Restriction[]>;
	selectedNodeForRestrictions: NodeInfo;
	selectedMessageExamples: Observable<Restriction[]>;
	newRestrictionText = '';

	constructor(public service: MessageService, public restrictionService: RestrictionService, public exampleValueService: ExampleValueService) {
		console.log(this.restrictionService)
		console.log(this.service)
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

	getExampleForNode(node: NodeInfo): Observable<Restriction> {
		return this.selectedMessageExamples.pipe(
			map((restrictions) => restrictions.filter( (restriction) => restriction.elementId == node.element.outerHTML)),
			map((restrictions) => (restrictions.length > 0) ? restrictions[0] : undefined)
		)
	}

	getExampleValueForNode(node: NodeInfo) : Observable<String> {
		return this.getExampleForNode(node).pipe(
			map( (restriction) => restriction ? restriction.rule : "" )
		)
	}

	selectNodeForRestrictions(node: NodeInfo): void {
		console.log("Selected node:")
		console.log(node)
		this.selectedNodeForRestrictions = node;
		this.selectedMessageRestrictions = this.restrictionService.getRestrictionsByMessageIdAndElementId(this.selectedMessage.id, this.selectedNodeForRestrictions.element.outerHTML)
	}

	onRowClicked(message: Message): void {
		
		this.selectedMessage = message;
		this.selectedMessageRestrictions = of([])
		this.selectedNodeForRestrictions = undefined
		this.selectedMessageExamples = this.exampleValueService.getExamplesByMessageId(this.selectedMessage.id);

		this.selectedMessageExamples.pipe(
			tap(messageExample => console.log('fetched message example', messageExample)),
		)
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

	addRestriction() {
		const restriction: Restriction = {
		  id: 'new', // Placeholder, replace with a function to generate a unique id
		  rule: this.newRestrictionText,
		  messageId: this.selectedMessage.id,
		  elementId: this.selectedNodeForRestrictions.element.outerHTML
		  // Add other required properties here
		};
		this.restrictionService.createRestriction(restriction).subscribe(() => {
		  this.newRestrictionText = '';  // Clear the input field after successful addition
		  this.updateRestrictions();
		});
	  }
	
	  editRestriction(restriction: Restriction) {
		this.newRestrictionText = restriction.rule;
	  }
	
	  saveRestriction(restriction: Restriction) {
		restriction.rule = this.newRestrictionText;
		this.restrictionService.updateRestriction(restriction).subscribe(() => {
		  this.newRestrictionText = '';
		  this.updateRestrictions();
		});
	  }
	
	  deleteRestriction(restriction: Restriction) {
		this.restrictionService.deleteRestriction(restriction.id).subscribe(() => {
		  this.updateRestrictions();
		});
	  }
	
	  private updateRestrictions() {
		this.selectedMessageRestrictions = this.restrictionService.getRestrictionsByMessageIdAndElementId(this.selectedMessage.id, this.selectedNodeForRestrictions.element.outerHTML);
	  }
	   
}
