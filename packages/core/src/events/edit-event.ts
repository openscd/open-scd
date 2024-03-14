/** Intent to `parent.insertBefore(node, reference)` */
export interface Insert {
	parent: Node
	node: Node
	reference: Node | null
}

// NOTE: this interface is not that usefull with two optional properties
// Not sure though where it is used and how we could improve it
export interface NamespacedAttributeValue {
	value: string | null
	namespaceURI: string | null
}
export type AttributeValue = string | null | NamespacedAttributeValue
/** Intent to set or remove (if null) attributes on element */
export interface Update {
	element: Element
	attributes: Partial<Record<string, AttributeValue>>
}

/** Intent to remove a node from its ownerDocument */
export interface Remove {
	node: Node
}

/** Represents the user's intent to change an XMLDocument */
export type Edit = Insert | Update | Remove | Edit[]

export function isComplex (edit: Edit | Edit[]): edit is Edit[] {
	return edit instanceof Array
}

export function isInsert (edit: Edit): edit is Insert {
	return edit.hasOwnProperty('parent')
}

export function isNamespaced (
	value: AttributeValue | null
): value is NamespacedAttributeValue {
	return value !== null && typeof value !== 'string'
}

export function isUpdate (edit: Edit): edit is Update {
	return (edit as Update).element !== undefined
}

export function isRemove (edit: Edit): edit is Remove {
	return (
		(edit as Insert).parent === undefined && (edit as Remove).node !== undefined
	)
}

export type EditEvent<E extends Edit = Edit> = CustomEvent<E>

export function newEditEvent<E extends Edit> (edit: E): EditEvent<E> {
	return new CustomEvent<E>('oscd-edit', {
		composed: true,
		bubbles: true,
		detail: edit
	})
}

declare global {
	interface ElementEventMap {
		['oscd-edit']: EditEvent
	}
}
