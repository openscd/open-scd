import { TemplateResult } from 'lit';
import '@material/mwc-button';
import type { Button } from '@material/mwc-button';
import { ActionList } from '@openenergytools/filterable-lists/dist/action-list.js';
import './gse-control-element-editor.js';
import type { GseControlElementEditor } from './gse-control-element-editor.js';
import '../dataset/data-set-element-editor.js';
import type { DataSetElementEditor } from '../dataset/data-set-element-editor.js';
import BaseElementEditor from '../base-element-editor.js';
export declare class GseControlEditor extends BaseElementEditor {
    selectionList: ActionList;
    selectGSEControlButton: Button;
    gseControlElementEditor: GseControlElementEditor;
    dataSetElementEditor: DataSetElementEditor;
    /** Resets selected GOOSE and its DataSet, if not existing in new doc
    update(props: Map<string | number | symbol, unknown>): void {
      super.update(props);
  
      if (props.has('doc') && this.selectCtrlBlock) {
        const newGseControl = updateElementReference(
          this.doc,
          this.selectCtrlBlock
        );
  
        this.selectCtrlBlock = newGseControl ?? undefined;
        this.selectedDataSet = this.selectCtrlBlock
          ? updateElementReference(this.doc, this.selectedDataSet!)
          : undefined;
  
        /* TODO(Jakob Vogelsang): comment when action-list is activeable
        if (!newGseControl && this.selectionList && this.selectionList.selected)
          (this.selectionList.selected as ListItem).selected = false;
      }
    } */
    protected renderElementEditorContainer(): TemplateResult;
    private renderSelectionList;
    private renderToggleButton;
    render(): TemplateResult;
    static styles: import("lit").CSSResult;
}
