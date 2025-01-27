type pTypes = {
    'MAC-Address'?: string | null;
    APPID?: string | null;
    'VLAN-ID'?: string | null;
    'VLAN-PRIORITY'?: string | null;
};
type smvAttributes = {
    pTypes: pTypes;
    instType?: boolean;
};
/** @returns Whether the `sMV`s element attributes or instType has changed */
export declare function checkSMVDiff(sMV: Element, attributes?: smvAttributes): boolean;
export {};
