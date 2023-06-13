import { Restriction } from "./restriction";

export class Message {
    id: number;
    name: string;
    description: string;
    content: string;
    ownerId: number;
    appId: number;
  
    constructor(id: number, name: string, description: string, content: string, ownerId: number, appId: number) {
      this.id = id;
      this.name = name;
      this.description = description;
      this.content = content;
      this.ownerId = ownerId;
      this.appId = appId;
    }
    
  }
  