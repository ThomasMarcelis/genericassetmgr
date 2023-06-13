import { Message } from "./message";


export let sampleMessages: Message[] = [
    new Message(
        1, // ID
      'Message1', // name
      'This is a description for Message1', // description
      '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="Message1" type="xs:string" /></xs:schema>', // content (xsd)
      123, // ownerId
      1 // appId
    ),
    new Message(
      2, // ID
      'Message2', // name
      'This is a description for Message2', // description
      '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="Message2" type="xs:int" /></xs:schema>', // content (xsd)
      456, // ownerId
      2 // appId
    ),
    new Message(
      3, // ID
      'Message3', // name
      'This is a description for Message3', // description
      '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="Message3" type="xs:float" /></xs:schema>', // content (xsd)
      789, // ownerId
      3 // appId
    ),
  ];
  