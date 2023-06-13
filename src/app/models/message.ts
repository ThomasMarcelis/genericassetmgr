export class Message {
    id: number;
    name: string;
    description: string;
    content: string;
    ownerId: number;
    appId: number;
    type: MessageType;
//    restrictions: Restriction[];
//    notes: Note[];
  
    constructor(id: number, name: string, description: string, content: string, ownerId: number, appId: number, type: MessageType) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.content = content;
      this.ownerId = ownerId;
      this.appId = appId;
      this.type = type;
//      this.restrictions = [];
//      this.notes = [];
    }
  }

export class Restriction {
    id: string;
    messageId: string;
    elementId: string;
    rule: string;  // the actual restriction rule, e.g. "can only have select values"
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