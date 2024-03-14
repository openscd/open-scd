export interface EditEvent {
	element: Element
}

export function createEditEvent(element: Element): EditEvent {
	return { element }
}

export function sum(a, b) {
	return a + b
}
