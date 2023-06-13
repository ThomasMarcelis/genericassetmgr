import { Restriction } from "./restriction";

export class Message {
    id: number;
    name: string;
    description: string;
    content: string;
    ownerId: number;
    appId: number;
    type: MessageType;
  
    constructor(id: number, name: string, description: string, content: string, ownerId: number, appId: number, type: MessageType) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.content = content;
      this.ownerId = ownerId;
      this.appId = appId;
      this.type = type;
    }
  }

  export enum MessageType {
    XSD = 'XSD',
    JSON = 'JSON',
    FLAT = 'FLAT',
    // add more application types as needed
  }