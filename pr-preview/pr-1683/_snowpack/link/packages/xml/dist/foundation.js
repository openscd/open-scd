/**
 * @since 0.0.1
 *
 * @param Document - doc where the Element should be created
 * @param string Tag - Tagname of the element
 * @param Record<string, string | null> - Attributes to be added to the created element
 *
 * @returns a new [[`tag`]] element owned by [[`doc`]].
 */
export function createElement(doc, tag, attrs) {
    const element = doc.createElementNS(doc.documentElement.namespaceURI, tag);
    Object.entries(attrs)
        .filter(([_, value]) => value !== null)
        .forEach(([name, value]) => element.setAttribute(name, value));
    return element;
}
/**
 * @since 0.0.1
 *
 * @param Element - element to be cloned
 * @params Record<string, string | null> - Attributes to be added
 *
 * @returns a clone of `element` with attributes set to values from `attrs`.
 */
export function cloneElement(element, attrs) {
    const newElement = element.cloneNode(false);
    Object.entries(attrs).forEach(([name, value]) => {
        if (value === null)
            newElement.removeAttribute(name);
        else
            newElement.setAttribute(name, value);
    });
    return newElement;
}
export function getChildElementsByTagName(element, tag) {
    if (!element || !tag)
        return [];
    return Array.from(element.children).filter(element => element.tagName === tag);
}
/**
 * Format xml string in "pretty print" style and return as a string
 * @param xml - xml document as a string
 * @param tab - character to use as a tab
 * @returns string with pretty print formatting
 */
export function formatXml(xml, tab) {
    let formatted = '', indent = '';
    if (!tab)
        tab = '\t';
    xml.split(/>\s*</).forEach(function (node) {
        if (node.match(/^\/\w/))
            indent = indent.substring(tab.length);
        formatted += indent + '<' + node + '>\r\n';
        if (node.match(/^<?\w[^>]*[^/]$/))
            indent += tab;
    });
    return formatted.substring(1, formatted.length - 3);
}
export function getUniqueElementName(parent, tagName, iteration = 1) {
    const newName = 'new' + tagName + iteration;
    const child = parent.querySelector(`:scope > ${tagName}[name="${newName}"]`);
    if (!child)
        return newName;
    else
        return getUniqueElementName(parent, tagName, ++iteration);
}
//# sourceMappingURL=foundation.js.map