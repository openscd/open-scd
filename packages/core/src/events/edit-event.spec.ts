import { expect, describe, it } from 'vitest'
import {
	isComplex,
	isInsert,
	Insert,
	isUpdate,
	isRemove,
	newEditEvent,
	isNamespaced,
	type AttributeValue,
	type Edit,
} from './edit-event.ts';

describe("isComplex", () => {
        type TestCase = {
            desc: string,
			editEvents: Edit[] | Edit,
			expected: boolean,
        }

        const featureTests: TestCase[] = [
            {
                desc: "return false if it gets a non-array",
				editEvents: { parent: 'parent', node: 'node', reference: 'reference' },
				expected: false,
			},
			{
				desc: "returns true if it gets an array of Edit events with a single element",
				editEvents: [ { parent: 'parent', node: 'node', reference: 'reference' } ],
				expected: true,
            },
			{
				desc: "returns true if it gets an array of Edit events with multiple elements",
				editEvents: [
					{ parent: 'parent', node: 'node', reference: 'reference' },
					{ parent: 'parent', node: 'node', reference: 'reference' },
				],
				expected: true,
			},
        ]

        featureTests.forEach(testFeature)

        function testFeature(tc: TestCase) {
            it(tc.desc, () => {
				expect(isComplex(tc.editEvents)).toBe(tc.expected);
            })
        }
})


describe("isInsert", () => {
	type TestCase = {
		desc: string,
		event: Edit,
		expected: boolean,
	}

	const featureTests: TestCase[] = [
		{
			desc: 'returns true when the edit has a parent',
			event: { parent: {} },
			expected: true,
		},
		{
			desc: 'returns false when the edit does not have a parent',
			event: {},
			expected: false,
		},

	]

	featureTests.forEach(testFeature)

	function testFeature(tc: TestCase) {
		it(tc.desc, () => {
			expect(isInsert(tc.event)).toBe(tc.expected);
		})
	}
})


describe("isUpdate", () => {
	type TestCase = {
		desc: string,
		event: Edit,
		expected: boolean,
	}

	const featureTests: TestCase[] = [
		{
			desc: 'an Edit is an Update when it has an "element" property',
			event: { element: {} },
			expected: true,
		},
		{
			desc: 'an Edit is not an Update when it does not have an "element" property',
			event: {},
			expected: false,
		},

	]

	featureTests.forEach(testFeature)

	function testFeature(tc: TestCase) {
		it(tc.desc, () => {
			expect(isUpdate(tc.event)).toBe(tc.expected);
		})
	}
})
describe("isRemove", () => {
	type TestCase = {
		desc: string,
		event: Edit,
		expected: boolean,
	}

	const featureTests: TestCase[] = [
		{
			desc: 'an Edit is a Remove when it has a node, but no parent',
			event: { node: {} },
			expected: true,
		},
		{
			desc: 'an Edit is not a Remove when it has a parent',
			event: { parent: {} },
			expected: false,
		},
		{
			desc: 'an Edit is not a Remove when it has no node',
			event: { },
			expected: false,
		},

	]

	featureTests.forEach(testFeature)

	function testFeature(tc: TestCase) {
		it(tc.desc, () => {
			expect(isRemove(tc.event)).toBe(tc.expected);
		})
	}
})
describe("isNamespaced", () => {
	type TestCase = {
		desc: string,
		value: AttributeValue | null,
		expected: boolean,
	}

	const featureTests: TestCase[] = [
		{
			desc: 'a value is namespaced when it is not null and not a string',
			value: { value: 'value', namespaceURI: 'namespaceURI' },
			expected: true,
		},
		{
			desc: 'a value is not namespaced when it is null',
			event: null,
			expected: false,
		},
		{
			desc: 'a value is not namespaced when it is a string',
			event: 'value',
			expected: false,
		}

	]

	featureTests.forEach(testFeature)

	function testFeature(tc: TestCase) {
		it(tc.desc, () => {
			expect(isNamespaced(tc.event)).toBe(tc.expected);
		})
	}
})


describe("newEditEvent", () => {
	it("creates a new CustomEvent with the given edit", () => {
		const edit = { parent: 'parent', node: 'node', reference: 'reference' }
		const event = newEditEvent(edit)
		expect(event.detail).toBe(edit)
	})
})
