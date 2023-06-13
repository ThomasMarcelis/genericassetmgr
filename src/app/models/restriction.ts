export class Restriction {
    id: number;
    messageId: number;
    fieldName: string;
    attributePath: string;
    restrictionType: string;
    restrictionValue: any;
  
    constructor(id: number, messageId: number, fieldName: string, attributePath: string, restrictionType: string, restrictionValue: any) {
      this.id = id;
      this.messageId = messageId;
      this.fieldName = fieldName;
      this.attributePath = attributePath;
      this.restrictionType = restrictionType;
      this.restrictionValue = restrictionValue;
    }
  }
  
  export enum RestrictionType {
    MinLength = 'MinLength',
    MaxLength = 'MaxLength',
    Pattern = 'Pattern',
    // add more restriction types as needed
  }

