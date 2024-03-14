export interface EditEvent {
	element: Element
}

export function createEditEvent(element: Element): EditEvent {
	return { element }
}

