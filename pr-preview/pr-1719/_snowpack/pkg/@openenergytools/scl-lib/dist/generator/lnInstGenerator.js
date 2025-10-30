function getChildElementsByTagName(element, tag) {
    return Array.from(element.children).filter((element) => element.tagName === tag);
}
/** maximum value for `lnInst` attribute */
const maxLnInst = 99;
const lnInstRange = Array(maxLnInst)
    .fill(1)
    .map((_, i) => `${i + 1}`);
/**
 * Generator function returning unique `inst` or `lnInst` attribute for element
 * [[`tagName`]] within [[`parent`]].
 * ```md
 * Valid range for both `inst` and `lnInst` is between 1 and 99
 * ```
 * @param parent - The parent element to be scanned for `inst` or `lnInst`
 * values already in use. Be sure to create a new generator every time the
 * children of this element change in SCL.
 * @param tagName - Tag name of the child elements containing the
 * `lnInst` or `inst` attribute
 * @returns a function generating increasing unused `inst` or `lnInst` values
 * element with [[`tagName`]] within [[`parent`]] on subsequent invocations
 */
function lnInstGenerator(parent, tagName) {
    const generators = new Map();
    const generatedAttribute = tagName === "LN" ? "inst" : "lnInst";
    return (lnClass) => {
        if (!generators.has(lnClass)) {
            const lnInstOrInst = new Set(getChildElementsByTagName(parent, tagName)
                .filter((element) => element.getAttribute("lnClass") === lnClass)
                .map((element) => element.getAttribute(generatedAttribute)));
            generators.set(lnClass, () => {
                const uniqueLnInstOrInst = lnInstRange.find((lnInst) => !lnInstOrInst.has(lnInst));
                if (uniqueLnInstOrInst)
                    lnInstOrInst.add(uniqueLnInstOrInst);
                return uniqueLnInstOrInst;
            });
        }
        return generators.get(lnClass)();
    };
}

export { lnInstGenerator };
