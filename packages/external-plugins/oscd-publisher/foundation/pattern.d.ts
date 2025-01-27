/** Patterns from IEC 61850-6 for all `P` elements */
export declare const typePattern: Partial<Record<string, string>>;
/** Whether `P` element is required within `Address` */
export declare const typeNullable: Partial<Record<string, boolean>>;
export declare const patterns: {
    string: string;
    normalizedString: string;
    name: string;
    nmToken: string;
    names: string;
    nmTokens: string;
    decimal: string;
    unsigned: string;
    alphanumericFirstUpperCase: string;
    asciName: string;
    lnClass: string;
    tRestrName1stL: string;
    abstractDataAttributeName: string;
    cdc: string;
};
export declare const maxLength: {
    cbName: number;
    abstracDaName: number;
};
