import { LitElement, TemplateResult } from 'lit';
import '@material/mwc-button';
import type { Button } from '@material/mwc-button';
import '@openenergytools/filterable-lists/dist/action-list.js';
import type { ActionList } from '@openenergytools/filterable-lists/dist/action-list.js';
import './data-set-element-editor.js';
import type { DataSetElementEditor } from './data-set-element-editor.js';
export declare class DataSetEditor extends LitElement {
    /** The document being edited as provided to plugins by [[`OpenSCD`]]. */
    doc: XMLDocument;
    /** SCL change indicator */
    editCount: number;
    selectedDataSet?: Element;
    selectionList: ActionList;
    selectDataSetButton: Button;
    dataSetElementEditor: DataSetElementEditor;
    /** Resets selected DataSet, if not existing in new doc
    update(props: Map<string | number | symbol, unknown>): void {
      if (props.has('doc') && this.selectedDataSet) {
        const newDataSet = updateElementReference(this.doc, this.selectedDataSet);
  
        this.selectedDataSet = newDataSet ?? undefined;
  
        /* TODO(Jakob Vogelsang): fix when action-list is activable
        if (!newDataSet && this.selectionList && this.selectionList.selected)
          (this.selectionList.selected as ListItem).selected = false;
      }
  
      super.update(props);
    } */
    private renderElementEditorContainer;
    private renderSelectionList;
    private renderToggleButton;
    render(): TemplateResult;
    static styles: import("lit").CSSResult;
}
