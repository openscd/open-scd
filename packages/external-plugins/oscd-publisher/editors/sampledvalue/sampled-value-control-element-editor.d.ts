import { LitElement, TemplateResult } from 'lit';
import '@material/mwc-button';
import '@material/mwc-checkbox';
import '@material/mwc-formfield';
import type { Button } from '@material/mwc-button';
import type { Checkbox } from '@material/mwc-checkbox';
import '@openenergytools/scl-checkbox';
import '@openenergytools/scl-select';
import '@openenergytools/scl-text-field';
import type { SclCheckbox } from '@openenergytools/scl-checkbox';
import type { SclSelect } from '@openenergytools/scl-select';
import { SclTextField } from '@openenergytools/scl-text-field';
export declare class SampledValueControlElementEditor extends LitElement {
    /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
    doc: XMLDocument;
    /** The element being edited as provided to plugins by [[`OpenSCD`]]. */
    element: Element | null;
    /** SCL change indicator */
    editCount: number;
    get sMV(): Element | null;
    private sMVdiff;
    private smvOptsDiff;
    private sampledValueControlDiff;
    sampledValueControlInputs: (SclTextField | SclSelect | SclCheckbox)[];
    smvControlSave: Button;
    sMVInputs: SclTextField[];
    smvSave: Button;
    smvOptsInputs: SclCheckbox[];
    smvOptsSave: Button;
    instType?: Checkbox;
    resetInputs(type?: 'SampledValueControl' | 'SMV'): void;
    private onSampledValueControlInputChange;
    private saveSampledValueControlChanges;
    private onSMVInputChange;
    private saveSMVChanges;
    private onSmvOptsInputChange;
    private saveSmvOptsChanges;
    private renderSmvContent;
    private renderSmvOptsContent;
    private renderOtherElements;
    private renderSmvControlContent;
    render(): TemplateResult;
    static styles: import("lit").CSSResult;
}
