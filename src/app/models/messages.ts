import { Message, MessageType } from "./message";


export let sampleMessages: Message[] = [
    new Message(
        1, // ID
      'Message1', // name
      'This is a description for Message1', // description
      `<?xml version="1.0" encoding="UTF-8" ?>
      <xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema">
      
      <xs:element name="shiporder">
        <xs:complexType>
          <xs:sequence>
            <xs:element name="orderperson" type="xs:string"/>
            <xs:element name="shipto">
              <xs:complexType>
                <xs:sequence>
                  <xs:element name="name" type="xs:string"/>
                  <xs:element name="address" type="xs:string"/>
                  <xs:element name="city" type="xs:string"/>
                  <xs:element name="country" type="xs:string"/>
                </xs:sequence>
              </xs:complexType>
            </xs:element>
            <xs:element name="item" maxOccurs="unbounded">
              <xs:complexType>
                <xs:sequence>
                  <xs:element name="title" type="xs:string"/>
                  <xs:element name="note" type="xs:string" minOccurs="0"/>
                  <xs:element name="quantity" type="xs:positiveInteger"/>
                  <xs:element name="price" type="xs:decimal"/>
                </xs:sequence>
              </xs:complexType>
            </xs:element>
          </xs:sequence>
          <xs:attribute name="orderid" type="xs:string" use="required"/>
        </xs:complexType>
      </xs:element>
      
      </xs:schema>`,
      123, // ownerId
      1, // appId
      MessageType.XSD
    ),
    new Message(
      2, // ID
      'Message2', // name
      'This is a description for Message2', // description
      '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="Message2" type="xs:int" /></xs:schema>', // content (xsd)
      456, // ownerId
      2, // appId
      MessageType.XSD
    ),
    new Message(
      3, // ID
      'Message3', // name
      'This is a description for Message3', // description
      '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="Message3" type="xs:float" /></xs:schema>', // content (xsd)
      789, // ownerId
      3, // appId
      MessageType.XSD
    ),
  ];
  