export function cloneTestDoc(doc: XMLDocument): XMLDocument {
  const newDoc = document.implementation.createDocument(
    doc.lookupNamespaceURI(''),
    doc.documentElement.tagName,
    doc.doctype
  );

  newDoc.documentElement.replaceWith(doc.documentElement);

  return newDoc;
}
