import { LitElement, TemplateResult } from 'lit';
import '@material/mwc-dialog';
import '@material/mwc-icon-button';
import type { Dialog } from '@material/mwc-dialog';
import type { IconButton } from '@material/mwc-icon-button';
import '@openenergytools/filterable-lists/dist/action-list.js';
import './dataset/data-set-element-editor.js';
export default class BaseElementEditor extends LitElement {
    /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
    doc: XMLDocument;
    /** SCL change indicator */
    editCount: number;
    selectCtrlBlock?: Element;
    selectedDataSet?: Element | null;
    selectDataSetDialog: Dialog;
    newDataSet: IconButton;
    changeDataSet: IconButton;
    protected selectDataSet(dataSet: Element): void;
    private addNewDataSet;
    protected renderSelectDataSetDialog(): TemplateResult;
    protected renderDataSetElementContainer(): TemplateResult;
}
