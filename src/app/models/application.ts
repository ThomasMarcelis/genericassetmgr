export class Application {
    id: number;
    name: string;
    description: string;
    
    constructor(id: number, name: string, description: string) {
      this.id = id;
      this.name = name;
      this.description = description;
    }
  }
  
  export enum ApplicationType {
    TypeA = 'TypeA',
    TypeB = 'TypeB',
    TypeC = 'TypeC',
    // add more application types as needed
  }
  