/**
 * @since 0.0.1
 *
 * @param Document - doc where the Element should be created
 * @param string Tag - Tagname of the element
 * @param Record<string, string | null> - Attributes to be added to the created element
 *
 * @returns a new [[`tag`]] element owned by [[`doc`]].
 */
export declare function createElement(doc: Document, tag: string, attrs: Record<string, string | null>): Element;
/**
 * @since 0.0.1
 *
 * @param Element - element to be cloned
 * @params Record<string, string | null> - Attributes to be added
 *
 * @returns a clone of `element` with attributes set to values from `attrs`.
 */
export declare function cloneElement(element: Element, attrs: Record<string, string | null>): Element;
export declare function getChildElementsByTagName(element: Element | null | undefined, tag: string | null | undefined): Element[];
/**
 * Format xml string in "pretty print" style and return as a string
 * @param xml - xml document as a string
 * @param tab - character to use as a tab
 * @returns string with pretty print formatting
 */
export declare function formatXml(xml: string, tab?: string): string;
export declare function getUniqueElementName(parent: Element, tagName: string, iteration?: number): string;
