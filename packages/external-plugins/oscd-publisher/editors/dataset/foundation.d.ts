import { Insert } from '@openscd/open-scd-core';
/** @returns Action array adding new `FCDA`s to parent [[`DataSet`]] */
export declare function addFCDAs(dataSet: Element, paths: Element[][]): Insert[];
/** @returns Action array adding new `FCDA`s to parent [[`DataSet`]] */
export declare function addFCDOs(dataSet: Element, fcPaths: {
    path: Element[];
    fc: string;
}[]): Insert[];
