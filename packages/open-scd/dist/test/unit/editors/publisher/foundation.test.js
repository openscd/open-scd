export function cloneTestDoc(doc) {
    const newDoc = document.implementation.createDocument(doc.lookupNamespaceURI(''), doc.documentElement.tagName, doc.doctype);
    newDoc.documentElement.replaceWith(doc.documentElement);
    return newDoc;
}
//# sourceMappingURL=foundation.test.js.map