import { Arbitrary } from 'fast-check';
import { LitElement } from 'lit';
import { Edit, Insert, Remove, Update } from '../foundation.js';
export declare namespace util {
    export const xmlAttributeName: RegExp;
    export function descendants(parent: Element | XMLDocument): Node[];
    export const sclDocString = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>\n<SCL version=\"2007\" revision=\"B\" xmlns=\"http://www.iec.ch/61850/2003/SCL\">\n  <Substation name=\"A1\" desc=\"test substation\"></Substation>\n</SCL>";
    export type TestDoc = {
        doc: XMLDocument;
        nodes: Node[];
    };
    export const testDocs: Arbitrary<[TestDoc, TestDoc]>;
    export function remove(nodes: Node[]): Arbitrary<Remove>;
    export function insert(nodes: Node[]): Arbitrary<Insert>;
    export function update(nodes: Node[]): Arbitrary<Update>;
    export function simpleEdit(nodes: Node[]): Arbitrary<Insert | Update | Remove>;
    export function complexEdit(nodes: Node[]): Arbitrary<Edit[]>;
    export function edit(nodes: Node[]): Arbitrary<Edit>;
    /** A series of arbitrary edits that allow us to test undo and redo */
    export type UndoRedoTestCase = {
        doc1: XMLDocument;
        doc2: XMLDocument;
        edits: Edit[];
    };
    export function undoRedoTestCases(testDoc1: TestDoc, testDoc2: TestDoc): Arbitrary<UndoRedoTestCase>;
    export function isParentNode(node: Node): node is ParentNode;
    export function isParentOf(parent: Node, node: Node | null): boolean;
    export function isValidInsert({ parent, node, reference }: Insert): boolean;
    const EditingElement_base: typeof LitElement & (new (...args: any[]) => LitElement & import("./Editing.js").EditingMixin);
    export class EditingElement extends EditingElement_base {
    }
    export {};
}
