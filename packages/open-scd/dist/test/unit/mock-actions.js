const element = document.createElement('test-element');
const parent = document.createElement('test-parent');
const reference = document.createElement('test-sibling');
parent.appendChild(element);
parent.appendChild(reference);
export class MockAction {
    static get cre() {
        return { new: { parent, element, reference } };
    }
    static get del() {
        return { old: { parent, element, reference } };
    }
    static get mov() {
        return { old: { parent, element, reference }, new: { parent, reference } };
    }
    static get upd() {
        return { old: { element }, new: { element } };
    }
    static get complex() {
        return {
            actions: [MockAction.cre, MockAction.del, MockAction.mov, MockAction.upd],
            title: 'Test complex EditorAction',
        };
    }
}
//# sourceMappingURL=mock-actions.js.map