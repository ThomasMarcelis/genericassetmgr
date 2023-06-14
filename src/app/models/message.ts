export class Message {
    id: string;
    name: string;
    description: string;
    content: string;
    ownerId: number;
    application: string;
    type: MessageType;
    restrictions: string[];
    //todo: refer to registered domains
    domain: String;
    domainOwner: String;
//    notes: Note[];
  
    constructor(id: string, name: string, description: string, content: string, ownerId: number, application: string, type: MessageType, domain: string, domainOwner: string) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.content = content;
      this.ownerId = ownerId;
      this.application = application;
      this.type = type;
      this.restrictions = [];
      this.domain = domain;
      this.domainOwner = domainOwner;
//      this.notes = [];
    }
  }

export class Restriction {
    id: string;
    messageId: string;
    elementId: string;
    rule: string;  // the actual restriction rule, e.g. "can only have select values"

    constructor(id: string, messageId: string, elementId: string, rule: string) {
        this.id = id;
        this.messageId = messageId;
        this.elementId = elementId;
        this.rule = rule;
    }
}

export class Note {
    id: string;
    messageId: string;
    content: string;  // the text of the note
}

  export enum MessageType {
    XSD = 'XSD',
    JSON = 'JSON',
    FLAT = 'FLAT',
    // add more application types as needed
  }