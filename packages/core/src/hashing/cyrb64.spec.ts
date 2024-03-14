import { expect, describe, it } from 'vitest'
import { cyrb64 } from './cyrb64.ts';

describe("cyrb64", () => {
	it('produces the same has for the same input', () => {
		const input = "input"
		const hash1 = cyrb64(input)
		const hash2 = cyrb64(input)
		expect(hash1).toBe(hash2)
	})

	it("produces different hashes for different inputs", () => {
		const input1 = "input1"
		const input2 = "input2"
		const hash1 = cyrb64(input1)
		const hash2 = cyrb64(input2)
		expect(hash1).not.toBe(hash2)
	})
})
