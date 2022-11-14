function newOpenEvent(doc, docName) {
    return new CustomEvent('oscd-open', {
        bubbles: true,
        composed: true,
        detail: { doc, docName },
    });
}

export { newOpenEvent };
//# sourceMappingURL=open-event.js.map
