import { LitElement, TemplateResult } from 'lit';
import '@material/mwc-button';
import type { Button } from '@material/mwc-button';
import '@openenergytools/scl-checkbox';
import '@openenergytools/scl-select';
import '@openenergytools/scl-text-field';
import type { SclCheckbox } from '@openenergytools/scl-checkbox';
import type { SclSelect } from '@openenergytools/scl-select';
import { SclTextField } from '@openenergytools/scl-text-field';
export declare class ReportControlElementEditor extends LitElement {
    /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
    doc: XMLDocument;
    /** The element being edited as provided to plugins by [[`OpenSCD`]]. */
    element: Element | null;
    /** SCL change indicator */
    editCount: number;
    private optFieldsDiff;
    private trgOpsDiff;
    private reportControlDiff;
    optFieldsInputs: SclCheckbox[];
    optFieldsSave: Button;
    trgOpsInputs: SclCheckbox[];
    trgOpsSave: Button;
    reportControlInputs: (SclTextField | SclSelect | SclCheckbox)[];
    reportControlSave: Button;
    rptEnabledInput: SclTextField;
    resetInputs(): void;
    private onOptFieldsInputChange;
    private saveOptFieldChanges;
    private onTrgOpsInputChange;
    private saveTrgOpsChanges;
    private onReportControlInputChange;
    private saveReportControlChanges;
    private renderOptFieldsContent;
    private renderTrgOpsContent;
    private renderChildElements;
    private renderReportControlContent;
    render(): TemplateResult;
    static styles: import("lit").CSSResult;
}
