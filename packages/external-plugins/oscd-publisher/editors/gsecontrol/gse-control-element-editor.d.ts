import { LitElement, TemplateResult } from 'lit';
import '@material/mwc-button';
import '@material/mwc-formfield';
import '@material/mwc-checkbox';
import type { Button } from '@material/mwc-button';
import type { Checkbox } from '@material/mwc-checkbox';
import '@openenergytools/scl-checkbox';
import '@openenergytools/scl-select';
import '@openenergytools/scl-text-field';
import type { SclCheckbox } from '@openenergytools/scl-checkbox';
import type { SclSelect } from '@openenergytools/scl-select';
import { SclTextField } from '@openenergytools/scl-text-field';
export declare class GseControlElementEditor extends LitElement {
    /** The element being edited as provided to plugins by [[`OpenSCD`]]. */
    element: Element | null;
    /** SCL change indicator */
    editCount: number;
    get gSE(): Element | null;
    private gSEdiff;
    private gSEControlDiff;
    gSEInputs: SclTextField[];
    gseSave: Button;
    gSEControlInputs: (SclTextField | SclSelect | SclCheckbox)[];
    gseControlSave: Button;
    instType?: Checkbox;
    resetInputs(type?: 'GSEControl' | 'GSE'): void;
    private onGSEControlInputChange;
    saveGSEControlChanges(): void;
    private onGSEInputChange;
    private saveGSEChanges;
    private renderGseContent;
    private renderGseControlContent;
    render(): TemplateResult;
    static styles: import("lit").CSSResult;
}
