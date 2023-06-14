import { Message, MessageType, Restriction } from "./message";


export let sampleMessages: Message[] = [
    new Message(
      'com.eoc.stpcom.005.01', // ID
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
      "BSI", // appId
      MessageType.XSD,
      "STP (Straight thorough processing)",
      "GDC"
    ),
    new Message(
      'com.eoc.stpcom.004.06', // ID
      'Message2', // name
      'This is a description for Message2', // description
      '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="Message2" type="xs:int" /></xs:schema>', // content (xsd)
      456, // ownerId
      "BSI", // appId
      MessageType.XSD,
      "ASR MOD (Asset services modernization)",
      "GBS"
    ),
    new Message(
      'com.eoc.stpcom.005.02', // ID
      'Message3', // name
      'This is a description for Message3', // description
      '<xs:schema xmlns:xs="http://www.w3.org/2001/XMLSchema"><xs:element name="Message3" type="xs:float" /></xs:schema>', // content (xsd)
      789, // ownerId
      "BSI", // appId
      MessageType.XSD,
      "ASR MOD (Asset services modernization)",
      "GBS"
    ),
  ];

  export let sampleRestrictions: Restriction[] = [
    new Restriction(
      `'<xs:element xmlns:xs="http://www.w3.org/2001/XMLSchema" name="city" type="xs:string"/>'`, // ID
      'com.eoc.stpcom.005.01', // messageId
      `'<xs:element xmlns:xs="http://www.w3.org/2001/XMLSchema" name="city" type="xs:string"/>'`, // elementId
      'can only be Brussels' // rule
    ),
    new Restriction(
      `'<xs:element xmlns:xs="http://www.w3.org/2001/XMLSchema" name="item" maxOccurs="unbounded">\n              <xs:complexType>\n                <xs:sequence>\n                  <xs:element name="title" type="xs:string"/>\n                  <xs:element name="note" type="xs:string" minOccurs="0"/>\n                  <xs:element name="quantity" type="xs:positiveInteger"/>\n                  <xs:element name="price" type="xs:decimal"/>\n                </xs:sequence>\n              </xs:complexType>\n            </xs:element>'`, // ID
      'com.eoc.stpcom.005.01', // messageId
      `'<xs:element xmlns:xs="http://www.w3.org/2001/XMLSchema" name="item" maxOccurs="unbounded">\n              <xs:complexType>\n                <xs:sequence>\n                  <xs:element name="title" type="xs:string"/>\n                  <xs:element name="note" type="xs:string" minOccurs="0"/>\n                  <xs:element name="quantity" type="xs:positiveInteger"/>\n                  <xs:element name="price" type="xs:decimal"/>\n                </xs:sequence>\n              </xs:complexType>\n            </xs:element>'`, // elementId
      'can only have select values' // rule
    ),
  ];