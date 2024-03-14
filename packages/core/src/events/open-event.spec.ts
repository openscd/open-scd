import { expect, describe, it } from 'vitest'
import { newOpenEvent } from './open-event.ts';

describe("newOpenEvent", () => {
	it('creates a new custom "OpenEvent" event', () => {
		const doc = new XMLDocument();
		const docName = "docName";
		const event = newOpenEvent(doc, docName);
		expect(event.type).toBe('oscd-open');
		expect(event.bubbles).toBe(true);
		expect(event.composed).toBe(true);
		expect(event.detail.doc).toBe(doc);
		expect(event.detail.docName).toBe(docName);
	})
})


// faking it for the sake of testing
class XMLDocument {}
