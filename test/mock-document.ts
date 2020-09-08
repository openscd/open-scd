export function emptySCD(): XMLDocument {
  return document.implementation.createDocument(
    'http://www.iec.ch/61850/2003/SCL',
    'SCL',
    null
  );
}

export function mockSCD(): XMLDocument {
  return new DOMParser().parseFromString(
    `<documentelement>
    <parent1>
    <child1 name="element1"> </child1>
    <child2 name="element2"> </child2>
    </parent1>
    <parent2>
    <child1 name="element3"> </child1>
    <child2 name="element4"> </child2>
    </parent2>
    </documentelement>`,
    'application/xml'
  );
}
