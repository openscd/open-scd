import { LitElement, TemplateResult } from 'lit';
import '@material/mwc-button';
import '@material/mwc-dialog';
import type { Button } from '@material/mwc-button';
import type { Dialog } from '@material/mwc-dialog';
import '@openscd/oscd-tree-grid';
import type { TreeGrid } from '@openscd/oscd-tree-grid';
import '@openenergytools/filterable-lists/dist/action-list.js';
import '@openenergytools/scl-text-field';
import type { ActionList } from '@openenergytools/filterable-lists/dist/action-list.js';
import { SclTextField } from '@openenergytools/scl-text-field';
export declare class DataSetElementEditor extends LitElement {
    /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
    doc: XMLDocument;
    /** The element being edited */
    element: Element | null;
    /** SCL change indicator */
    editCount: number;
    private get name();
    private get desc();
    private get fcdaCount();
    private someDiffOnInputs;
    inputs: SclTextField[];
    saveButton: Button;
    fcdaList: ActionList;
    daPickerButton: Button;
    daPickerDialog: Dialog;
    daPicker: TreeGrid;
    doPickerButton: Button;
    doPickerDialog: Dialog;
    doPicker: TreeGrid;
    resetInputs(): void;
    private onInputChange;
    private saveChanges;
    private saveDataObjects;
    private saveDataAttributes;
    private onMoveFCDAUp;
    private onMoveFCDADown;
    private renderFCDAList;
    private renderDataObjectPicker;
    private renderDataAttributePicker;
    private renderDataPickers;
    private renderLimits;
    private renderDataSetAttributes;
    private renderHeader;
    render(): TemplateResult;
    static styles: import("lit").CSSResult;
}
