/** Intent to `parent.insertBefore(node, reference)` */
export type Insert = {
    parent: Node;
    node: Node;
    reference: Node | null;
};
export type NamespacedAttributeValue = {
    value: string | null;
    namespaceURI: string | null;
};
export type AttributeValue = string | null | NamespacedAttributeValue;
/** Intent to set or remove (if null) attributes on element */
export type Update = {
    element: Element;
    attributes: Partial<Record<string, AttributeValue>>;
};
/** Intent to remove a node from its ownerDocument */
export type Remove = {
    node: Node;
};
/** Represents the user's intent to change an XMLDocument */
export type Edit = Insert | Update | Remove | Edit[];
export declare function isComplex(edit: Edit): edit is Edit[];
export declare function isInsert(edit: Edit): edit is Insert;
export declare function isNamespaced(value: AttributeValue): value is NamespacedAttributeValue;
export declare function isUpdate(edit: Edit): edit is Update;
export declare function isRemove(edit: Edit): edit is Remove;
export type EditEvent<E extends Edit = Edit> = CustomEvent<E>;
export declare function newEditEvent<E extends Edit>(edit: E): EditEvent<E>;
declare global {
    interface ElementEventMap {
        ['oscd-edit']: EditEvent;
    }
}
