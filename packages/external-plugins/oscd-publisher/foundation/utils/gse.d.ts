/** @returns a `GSE` element referenced to `GSEControl` element or `null` */
export declare function referencedGSE(gseControl: Element): Element | null;
/** @returns Whether the `gSE`s element attributes or instType has changed */
export declare function checkGSEDiff(gSE: Element, attrs: Record<string, string | null>, instType?: boolean): boolean;
