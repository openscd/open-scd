export interface EditEvent {
	element: Element
}

export function createEditEvent (element: Element): EditEvent {
	return { element }
}

export function sum (a: number, b: number): number {
	return a + b
}
