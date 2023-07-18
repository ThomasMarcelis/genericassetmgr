import { Message, MessageType, Restriction } from "./message";


export let sampleMessages: Message[] = [
    new Message(
      'com.eoc.stpcom.005.01', // ID
      'Message1', // name
      'a shiporder message, essential in e-commerce logistics. It tracks key aspects: customer details, shipment address, and specific item data including quantity and price. Each shiporder is tagged with a unique order ID, allowing effective order identification and management.', // description
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
      `<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">

      <xs:element name="items"> <!-- root element will be <items> -->
          <xs:complexType> <!-- it will be complex (there are complex and simple) -->
              <xs:sequence> <!-- it will consists from sequence of other elements -->
                  <xs:element name="item" minOccurs="0" maxOccurs="unbounded"> <!-- there will be zero or more <item> elements in sequence -->
                      <xs:complexType> <!-- they all have complex type -->
                          <xs:sequence> <!-- each of them will have next sequence of elements -->
                              <xs:element name="name" type="NonEmptyString" minOccurs="1"/> <!-- required (minOccurs="1") non empty (look for NonEmptyString at bottom) name field -->
                              <xs:element name="photo" minOccurs="1"> <!-- required photo with given pattern to validate urls for images -->
                                  <xs:simpleType> <!-- this is example how to use additional restrictions for elements -->
                                      <xs:restriction base="xs:anyURI">
                                          <xs:minLength value="1" />
                                          <xs:pattern value="http://.*(png|jpg|jpeg|gif)" />
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                              <xs:element name="tags" type="NonEmptyString" minOccurs="1"/>
                              <xs:element name="diameter" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="weight" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="price" type="positiveDecimal" minOccurs="1"/>
                              <xs:element name="size" minOccurs="0" default=""> <!-- example of enum field -->
                                  <xs:simpleType>
                                      <xs:restriction base="xs:string">
                                          <xs:enumeration value=""/>
                                          <xs:enumeration value="Big"/>
                                          <xs:enumeration value="Small"/>
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                          </xs:sequence>
                      </xs:complexType>
                  </xs:element>
              </xs:sequence>
          </xs:complexType>
      </xs:element>
      <xs:simpleType name="positiveDecimal">
          <xs:restriction base="xs:decimal">
              <xs:minExclusive value="0"/>
              <xs:fractionDigits value="2"/>
          </xs:restriction>
      </xs:simpleType>
      <xs:simpleType name="NonEmptyString"> <!-- we can describe our types separately to reuse them later -->
          <xs:restriction base="xs:string">
              <xs:minLength value="1" />
              <xs:pattern value=".*[^\s].*" />
          </xs:restriction>
      </xs:simpleType>
  </xs:schema>`, // content (xsd)
      456, // ownerId
      "BSI", // appId
      MessageType.XSD,
      "ASR MOD (Asset services modernization)",
      "GBS"
    ),
    new Message(
      'com.eoc.equity.100.01', // ID
      'Message3', // name
      `description for m3`, // description
      `<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">

      <xs:element name="items"> <!-- root element will be <items> -->
          <xs:complexType> <!-- it will be complex (there are complex and simple) -->
              <xs:sequence> <!-- it will consists from sequence of other elements -->
                  <xs:element name="item" minOccurs="0" maxOccurs="unbounded"> <!-- there will be zero or more <item> elements in sequence -->
                      <xs:complexType> <!-- they all have complex type -->
                          <xs:sequence> <!-- each of them will have next sequence of elements -->
                              <xs:element name="name" type="NonEmptyString" minOccurs="1"/> <!-- required (minOccurs="1") non empty (look for NonEmptyString at bottom) name field -->
                              <xs:element name="photo" minOccurs="1"> <!-- required photo with given pattern to validate urls for images -->
                                  <xs:simpleType> <!-- this is example how to use additional restrictions for elements -->
                                      <xs:restriction base="xs:anyURI">
                                          <xs:minLength value="1" />
                                          <xs:pattern value="http://.*(png|jpg|jpeg|gif)" />
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                              <xs:element name="tags" type="NonEmptyString" minOccurs="1"/>
                              <xs:element name="diameter" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="weight" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="price" type="positiveDecimal" minOccurs="1"/>
                              <xs:element name="size" minOccurs="0" default=""> <!-- example of enum field -->
                                  <xs:simpleType>
                                      <xs:restriction base="xs:string">
                                          <xs:enumeration value=""/>
                                          <xs:enumeration value="Big"/>
                                          <xs:enumeration value="Small"/>
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                          </xs:sequence>
                      </xs:complexType>
                  </xs:element>
              </xs:sequence>
          </xs:complexType>
      </xs:element>
      <xs:simpleType name="positiveDecimal">
          <xs:restriction base="xs:decimal">
              <xs:minExclusive value="0"/>
              <xs:fractionDigits value="2"/>
          </xs:restriction>
      </xs:simpleType>
      <xs:simpleType name="NonEmptyString"> <!-- we can describe our types separately to reuse them later -->
          <xs:restriction base="xs:string">
              <xs:minLength value="1" />
              <xs:pattern value=".*[^\s].*" />
          </xs:restriction>
      </xs:simpleType>
  </xs:schema>`, // content (xsd)
      789, // ownerId
      "EQP", // appId
      MessageType.XSD,
      "EQT (Equity Trading)",
      "GSC"
    ),
    new Message(
      'com.eoc.derv.200.06', // ID
      'Message4', // name
      `description for m4`, // description
      `<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">

      <xs:element name="items"> <!-- root element will be <items> -->
          <xs:complexType> <!-- it will be complex (there are complex and simple) -->
              <xs:sequence> <!-- it will consists from sequence of other elements -->
                  <xs:element name="item" minOccurs="0" maxOccurs="unbounded"> <!-- there will be zero or more <item> elements in sequence -->
                      <xs:complexType> <!-- they all have complex type -->
                          <xs:sequence> <!-- each of them will have next sequence of elements -->
                              <xs:element name="name" type="NonEmptyString" minOccurs="1"/> <!-- required (minOccurs="1") non empty (look for NonEmptyString at bottom) name field -->
                              <xs:element name="photo" minOccurs="1"> <!-- required photo with given pattern to validate urls for images -->
                                  <xs:simpleType> <!-- this is example how to use additional restrictions for elements -->
                                      <xs:restriction base="xs:anyURI">
                                          <xs:minLength value="1" />
                                          <xs:pattern value="http://.*(png|jpg|jpeg|gif)" />
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                              <xs:element name="tags" type="NonEmptyString" minOccurs="1"/>
                              <xs:element name="diameter" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="weight" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="price" type="positiveDecimal" minOccurs="1"/>
                              <xs:element name="size" minOccurs="0" default=""> <!-- example of enum field -->
                                  <xs:simpleType>
                                      <xs:restriction base="xs:string">
                                          <xs:enumeration value=""/>
                                          <xs:enumeration value="Big"/>
                                          <xs:enumeration value="Small"/>
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                          </xs:sequence>
                      </xs:complexType>
                  </xs:element>
              </xs:sequence>
          </xs:complexType>
      </xs:element>
      <xs:simpleType name="positiveDecimal">
          <xs:restriction base="xs:decimal">
              <xs:minExclusive value="0"/>
              <xs:fractionDigits value="2"/>
          </xs:restriction>
      </xs:simpleType>
      <xs:simpleType name="NonEmptyString"> <!-- we can describe our types separately to reuse them later -->
          <xs:restriction base="xs:string">
              <xs:minLength value="1" />
              <xs:pattern value=".*[^\s].*" />
          </xs:restriction>
      </xs:simpleType>
  </xs:schema>`, // content (xsd)
      789, // ownerId
      "GRP", // appId
      MessageType.XSD,
      "DRV (Derivative Reporting)",
      "DRE"
    ),
    new Message(
      'com.eoc.derv.200.07', // ID
      'Message5', // name
      `description for m5`, // description
      `<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">

      <xs:element name="items"> <!-- root element will be <items> -->
          <xs:complexType> <!-- it will be complex (there are complex and simple) -->
              <xs:sequence> <!-- it will consists from sequence of other elements -->
                  <xs:element name="item" minOccurs="0" maxOccurs="unbounded"> <!-- there will be zero or more <item> elements in sequence -->
                      <xs:complexType> <!-- they all have complex type -->
                          <xs:sequence> <!-- each of them will have next sequence of elements -->
                              <xs:element name="name" type="NonEmptyString" minOccurs="1"/> <!-- required (minOccurs="1") non empty (look for NonEmptyString at bottom) name field -->
                              <xs:element name="photo" minOccurs="1"> <!-- required photo with given pattern to validate urls for images -->
                                  <xs:simpleType> <!-- this is example how to use additional restrictions for elements -->
                                      <xs:restriction base="xs:anyURI">
                                          <xs:minLength value="1" />
                                          <xs:pattern value="http://.*(png|jpg|jpeg|gif)" />
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                              <xs:element name="tags" type="NonEmptyString" minOccurs="1"/>
                              <xs:element name="diameter" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="weight" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="price" type="positiveDecimal" minOccurs="1"/>
                              <xs:element name="size" minOccurs="0" default=""> <!-- example of enum field -->
                                  <xs:simpleType>
                                      <xs:restriction base="xs:string">
                                          <xs:enumeration value=""/>
                                          <xs:enumeration value="Big"/>
                                          <xs:enumeration value="Small"/>
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                          </xs:sequence>
                      </xs:complexType>
                  </xs:element>
              </xs:sequence>
          </xs:complexType>
      </xs:element>
      <xs:simpleType name="positiveDecimal">
          <xs:restriction base="xs:decimal">
              <xs:minExclusive value="0"/>
              <xs:fractionDigits value="2"/>
          </xs:restriction>
      </xs:simpleType>
      <xs:simpleType name="NonEmptyString"> <!-- we can describe our types separately to reuse them later -->
          <xs:restriction base="xs:string">
              <xs:minLength value="1" />
              <xs:pattern value=".*[^\s].*" />
          </xs:restriction>
      </xs:simpleType>
  </xs:schema>`, // content (xsd)
      789, // ownerId
      "GRP", // appId
      MessageType.XSD,
      "DRV (Derivative Reporting)",
      "DRE"
    ),
    new Message(
      'com.eoc.muni.400.01', // ID
      'Message3', // name
      `description for m3`, // description
      `<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">

      <xs:element name="items"> <!-- root element will be <items> -->
          <xs:complexType> <!-- it will be complex (there are complex and simple) -->
              <xs:sequence> <!-- it will consists from sequence of other elements -->
                  <xs:element name="item" minOccurs="0" maxOccurs="unbounded"> <!-- there will be zero or more <item> elements in sequence -->
                      <xs:complexType> <!-- they all have complex type -->
                          <xs:sequence> <!-- each of them will have next sequence of elements -->
                              <xs:element name="name" type="NonEmptyString" minOccurs="1"/> <!-- required (minOccurs="1") non empty (look for NonEmptyString at bottom) name field -->
                              <xs:element name="photo" minOccurs="1"> <!-- required photo with given pattern to validate urls for images -->
                                  <xs:simpleType> <!-- this is example how to use additional restrictions for elements -->
                                      <xs:restriction base="xs:anyURI">
                                          <xs:minLength value="1" />
                                          <xs:pattern value="http://.*(png|jpg|jpeg|gif)" />
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                              <xs:element name="tags" type="NonEmptyString" minOccurs="1"/>
                              <xs:element name="diameter" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="weight" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="price" type="positiveDecimal" minOccurs="1"/>
                              <xs:element name="size" minOccurs="0" default=""> <!-- example of enum field -->
                                  <xs:simpleType>
                                      <xs:restriction base="xs:string">
                                          <xs:enumeration value=""/>
                                          <xs:enumeration value="Big"/>
                                          <xs:enumeration value="Small"/>
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                          </xs:sequence>
                      </xs:complexType>
                  </xs:element>
              </xs:sequence>
          </xs:complexType>
      </xs:element>
      <xs:simpleType name="positiveDecimal">
          <xs:restriction base="xs:decimal">
              <xs:minExclusive value="0"/>
              <xs:fractionDigits value="2"/>
          </xs:restriction>
      </xs:simpleType>
      <xs:simpleType name="NonEmptyString"> <!-- we can describe our types separately to reuse them later -->
          <xs:restriction base="xs:string">
              <xs:minLength value="1" />
              <xs:pattern value=".*[^\s].*" />
          </xs:restriction>
      </xs:simpleType>
  </xs:schema>`, // content (xsd)
      789, // ownerId
      "MBP", // appId
      MessageType.XSD,
      "MUN (Municipal Bonds)",
      "GDC"
    ),
    new Message(
      'com.eoc.muni.400.02', // ID
      'Message3', // name
      `description for m3`, // description
      `<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">

      <xs:element name="items"> <!-- root element will be <items> -->
          <xs:complexType> <!-- it will be complex (there are complex and simple) -->
              <xs:sequence> <!-- it will consists from sequence of other elements -->
                  <xs:element name="item" minOccurs="0" maxOccurs="unbounded"> <!-- there will be zero or more <item> elements in sequence -->
                      <xs:complexType> <!-- they all have complex type -->
                          <xs:sequence> <!-- each of them will have next sequence of elements -->
                              <xs:element name="name" type="NonEmptyString" minOccurs="1"/> <!-- required (minOccurs="1") non empty (look for NonEmptyString at bottom) name field -->
                              <xs:element name="photo" minOccurs="1"> <!-- required photo with given pattern to validate urls for images -->
                                  <xs:simpleType> <!-- this is example how to use additional restrictions for elements -->
                                      <xs:restriction base="xs:anyURI">
                                          <xs:minLength value="1" />
                                          <xs:pattern value="http://.*(png|jpg|jpeg|gif)" />
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                              <xs:element name="tags" type="NonEmptyString" minOccurs="1"/>
                              <xs:element name="diameter" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="weight" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="price" type="positiveDecimal" minOccurs="1"/>
                              <xs:element name="size" minOccurs="0" default=""> <!-- example of enum field -->
                                  <xs:simpleType>
                                      <xs:restriction base="xs:string">
                                          <xs:enumeration value=""/>
                                          <xs:enumeration value="Big"/>
                                          <xs:enumeration value="Small"/>
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                          </xs:sequence>
                      </xs:complexType>
                  </xs:element>
              </xs:sequence>
          </xs:complexType>
      </xs:element>
      <xs:simpleType name="positiveDecimal">
          <xs:restriction base="xs:decimal">
              <xs:minExclusive value="0"/>
              <xs:fractionDigits value="2"/>
          </xs:restriction>
      </xs:simpleType>
      <xs:simpleType name="NonEmptyString"> <!-- we can describe our types separately to reuse them later -->
          <xs:restriction base="xs:string">
              <xs:minLength value="1" />
              <xs:pattern value=".*[^\s].*" />
          </xs:restriction>
      </xs:simpleType>
  </xs:schema>`, // content (xsd)
      789, // ownerId
      "MBP", // appId
      MessageType.XSD,
      "MUN (Municipal Bonds)",
      "GDC"
    ),
    new Message(
      'com.eoc.muni.400.03', // ID
      'Message3', // name
      `description for m3`, // description
      `<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">

      <xs:element name="items"> <!-- root element will be <items> -->
          <xs:complexType> <!-- it will be complex (there are complex and simple) -->
              <xs:sequence> <!-- it will consists from sequence of other elements -->
                  <xs:element name="item" minOccurs="0" maxOccurs="unbounded"> <!-- there will be zero or more <item> elements in sequence -->
                      <xs:complexType> <!-- they all have complex type -->
                          <xs:sequence> <!-- each of them will have next sequence of elements -->
                              <xs:element name="name" type="NonEmptyString" minOccurs="1"/> <!-- required (minOccurs="1") non empty (look for NonEmptyString at bottom) name field -->
                              <xs:element name="photo" minOccurs="1"> <!-- required photo with given pattern to validate urls for images -->
                                  <xs:simpleType> <!-- this is example how to use additional restrictions for elements -->
                                      <xs:restriction base="xs:anyURI">
                                          <xs:minLength value="1" />
                                          <xs:pattern value="http://.*(png|jpg|jpeg|gif)" />
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                              <xs:element name="tags" type="NonEmptyString" minOccurs="1"/>
                              <xs:element name="diameter" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="weight" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="price" type="positiveDecimal" minOccurs="1"/>
                              <xs:element name="size" minOccurs="0" default=""> <!-- example of enum field -->
                                  <xs:simpleType>
                                      <xs:restriction base="xs:string">
                                          <xs:enumeration value=""/>
                                          <xs:enumeration value="Big"/>
                                          <xs:enumeration value="Small"/>
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                          </xs:sequence>
                      </xs:complexType>
                  </xs:element>
              </xs:sequence>
          </xs:complexType>
      </xs:element>
      <xs:simpleType name="positiveDecimal">
          <xs:restriction base="xs:decimal">
              <xs:minExclusive value="0"/>
              <xs:fractionDigits value="2"/>
          </xs:restriction>
      </xs:simpleType>
      <xs:simpleType name="NonEmptyString"> <!-- we can describe our types separately to reuse them later -->
          <xs:restriction base="xs:string">
              <xs:minLength value="1" />
              <xs:pattern value=".*[^\s].*" />
          </xs:restriction>
      </xs:simpleType>
  </xs:schema>`, // content (xsd)
      789, // ownerId
      "MBP", // appId
      MessageType.XSD,
      "MUN (Municipal Bonds)",
      "GDC"
    ),
  
    new Message(
      'com.eoc.stpcom.005.03', // ID
      'Message3', // name
      `description for m3`, // description
      `<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">

      <xs:element name="items"> <!-- root element will be <items> -->
          <xs:complexType> <!-- it will be complex (there are complex and simple) -->
              <xs:sequence> <!-- it will consists from sequence of other elements -->
                  <xs:element name="item" minOccurs="0" maxOccurs="unbounded"> <!-- there will be zero or more <item> elements in sequence -->
                      <xs:complexType> <!-- they all have complex type -->
                          <xs:sequence> <!-- each of them will have next sequence of elements -->
                              <xs:element name="name" type="NonEmptyString" minOccurs="1"/> <!-- required (minOccurs="1") non empty (look for NonEmptyString at bottom) name field -->
                              <xs:element name="photo" minOccurs="1"> <!-- required photo with given pattern to validate urls for images -->
                                  <xs:simpleType> <!-- this is example how to use additional restrictions for elements -->
                                      <xs:restriction base="xs:anyURI">
                                          <xs:minLength value="1" />
                                          <xs:pattern value="http://.*(png|jpg|jpeg|gif)" />
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                              <xs:element name="tags" type="NonEmptyString" minOccurs="1"/>
                              <xs:element name="diameter" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="weight" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="price" type="positiveDecimal" minOccurs="1"/>
                              <xs:element name="size" minOccurs="0" default=""> <!-- example of enum field -->
                                  <xs:simpleType>
                                      <xs:restriction base="xs:string">
                                          <xs:enumeration value=""/>
                                          <xs:enumeration value="Big"/>
                                          <xs:enumeration value="Small"/>
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                          </xs:sequence>
                      </xs:complexType>
                  </xs:element>
              </xs:sequence>
          </xs:complexType>
      </xs:element>
      <xs:simpleType name="positiveDecimal">
          <xs:restriction base="xs:decimal">
              <xs:minExclusive value="0"/>
              <xs:fractionDigits value="2"/>
          </xs:restriction>
      </xs:simpleType>
      <xs:simpleType name="NonEmptyString"> <!-- we can describe our types separately to reuse them later -->
          <xs:restriction base="xs:string">
              <xs:minLength value="1" />
              <xs:pattern value=".*[^\s].*" />
          </xs:restriction>
      </xs:simpleType>
  </xs:schema>`, // content (xsd)
      789, // ownerId
      "BSI", // appId
      MessageType.XSD,
      "ASR MOD (Asset services modernization)",
      "GBS"
    ),
    new Message(
      'com.eoc.stpcom.005.04', // ID
      'Message3', // name
      `description for m3`, // description
      `<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">

      <xs:element name="items"> <!-- root element will be <items> -->
          <xs:complexType> <!-- it will be complex (there are complex and simple) -->
              <xs:sequence> <!-- it will consists from sequence of other elements -->
                  <xs:element name="item" minOccurs="0" maxOccurs="unbounded"> <!-- there will be zero or more <item> elements in sequence -->
                      <xs:complexType> <!-- they all have complex type -->
                          <xs:sequence> <!-- each of them will have next sequence of elements -->
                              <xs:element name="name" type="NonEmptyString" minOccurs="1"/> <!-- required (minOccurs="1") non empty (look for NonEmptyString at bottom) name field -->
                              <xs:element name="photo" minOccurs="1"> <!-- required photo with given pattern to validate urls for images -->
                                  <xs:simpleType> <!-- this is example how to use additional restrictions for elements -->
                                      <xs:restriction base="xs:anyURI">
                                          <xs:minLength value="1" />
                                          <xs:pattern value="http://.*(png|jpg|jpeg|gif)" />
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                              <xs:element name="tags" type="NonEmptyString" minOccurs="1"/>
                              <xs:element name="diameter" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="weight" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="price" type="positiveDecimal" minOccurs="1"/>
                              <xs:element name="size" minOccurs="0" default=""> <!-- example of enum field -->
                                  <xs:simpleType>
                                      <xs:restriction base="xs:string">
                                          <xs:enumeration value=""/>
                                          <xs:enumeration value="Big"/>
                                          <xs:enumeration value="Small"/>
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                          </xs:sequence>
                      </xs:complexType>
                  </xs:element>
              </xs:sequence>
          </xs:complexType>
      </xs:element>
      <xs:simpleType name="positiveDecimal">
          <xs:restriction base="xs:decimal">
              <xs:minExclusive value="0"/>
              <xs:fractionDigits value="2"/>
          </xs:restriction>
      </xs:simpleType>
      <xs:simpleType name="NonEmptyString"> <!-- we can describe our types separately to reuse them later -->
          <xs:restriction base="xs:string">
              <xs:minLength value="1" />
              <xs:pattern value=".*[^\s].*" />
          </xs:restriction>
      </xs:simpleType>
  </xs:schema>`, // content (xsd)
      789, // ownerId
      "BSI", // appId
      MessageType.XSD,
      "ASR MOD (Asset services modernization)",
      "GBS"
    ),
    new Message(
      'com.eoc.stpcom.005.05', // ID
      'Message3', // name
      `description for m3`, // description
      `<xs:schema attributeFormDefault="unqualified" elementFormDefault="qualified" xmlns:xs="http://www.w3.org/2001/XMLSchema">

      <xs:element name="items"> <!-- root element will be <items> -->
          <xs:complexType> <!-- it will be complex (there are complex and simple) -->
              <xs:sequence> <!-- it will consists from sequence of other elements -->
                  <xs:element name="item" minOccurs="0" maxOccurs="unbounded"> <!-- there will be zero or more <item> elements in sequence -->
                      <xs:complexType> <!-- they all have complex type -->
                          <xs:sequence> <!-- each of them will have next sequence of elements -->
                              <xs:element name="name" type="NonEmptyString" minOccurs="1"/> <!-- required (minOccurs="1") non empty (look for NonEmptyString at bottom) name field -->
                              <xs:element name="photo" minOccurs="1"> <!-- required photo with given pattern to validate urls for images -->
                                  <xs:simpleType> <!-- this is example how to use additional restrictions for elements -->
                                      <xs:restriction base="xs:anyURI">
                                          <xs:minLength value="1" />
                                          <xs:pattern value="http://.*(png|jpg|jpeg|gif)" />
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                              <xs:element name="tags" type="NonEmptyString" minOccurs="1"/>
                              <xs:element name="diameter" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="weight" type="xs:positiveInteger" minOccurs="1"/>
                              <xs:element name="price" type="positiveDecimal" minOccurs="1"/>
                              <xs:element name="size" minOccurs="0" default=""> <!-- example of enum field -->
                                  <xs:simpleType>
                                      <xs:restriction base="xs:string">
                                          <xs:enumeration value=""/>
                                          <xs:enumeration value="Big"/>
                                          <xs:enumeration value="Small"/>
                                      </xs:restriction>
                                  </xs:simpleType>
                              </xs:element>
                          </xs:sequence>
                      </xs:complexType>
                  </xs:element>
              </xs:sequence>
          </xs:complexType>
      </xs:element>
      <xs:simpleType name="positiveDecimal">
          <xs:restriction base="xs:decimal">
              <xs:minExclusive value="0"/>
              <xs:fractionDigits value="2"/>
          </xs:restriction>
      </xs:simpleType>
      <xs:simpleType name="NonEmptyString"> <!-- we can describe our types separately to reuse them later -->
          <xs:restriction base="xs:string">
              <xs:minLength value="1" />
              <xs:pattern value=".*[^\s].*" />
          </xs:restriction>
      </xs:simpleType>
  </xs:schema>`, // content (xsd)
      789, // ownerId
      "BSI", // appId
      MessageType.XSD,
      "ASR MOD (Asset services modernization)",
      "GBS"
    ),
  ];

  export let sampleRestrictions: Restriction[] = [
    new Restriction(
      `<xs:element xmlns:xs="http://www.w3.org/2001/XMLSchema" name="city" type="xs:string"/>`, // ID
      'com.eoc.stpcom.005.01', // messageId
      `<xs:element xmlns:xs="http://www.w3.org/2001/XMLSchema" name="city" type="xs:string"/>`, // elementId
      'can only be Brussels' // rule
    ),
    new Restriction(
      `<xs:element xmlns:xs="http://www.w3.org/2001/XMLSchema" name="item" maxOccurs="unbounded">\n              <xs:complexType>\n                <xs:sequence>\n                  <xs:element name="title" type="xs:string"/>\n                  <xs:element name="note" type="xs:string" minOccurs="0"/>\n                  <xs:element name="quantity" type="xs:positiveInteger"/>\n                  <xs:element name="price" type="xs:decimal"/>\n                </xs:sequence>\n              </xs:complexType>\n            </xs:element>`, // ID
      'com.eoc.stpcom.005.01', // messageId
      `<xs:element xmlns:xs="http://www.w3.org/2001/XMLSchema" name="item" maxOccurs="unbounded">\n              <xs:complexType>\n                <xs:sequence>\n                  <xs:element name="title" type="xs:string"/>\n                  <xs:element name="note" type="xs:string" minOccurs="0"/>\n                  <xs:element name="quantity" type="xs:positiveInteger"/>\n                  <xs:element name="price" type="xs:decimal"/>\n                </xs:sequence>\n              </xs:complexType>\n            </xs:element>`, // elementId
      'Value needs to be present in external system BNX as id' // rule
    ),
  ];