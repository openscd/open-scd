import { TemplateResult } from 'lit';
import '@material/mwc-button';
import type { Button } from '@material/mwc-button';
import '@openenergytools/filterable-lists/dist/action-list.js';
import type { ActionList } from '@openenergytools/filterable-lists/dist/action-list.js';
import './report-control-element-editor.js';
import '../dataset/data-set-element-editor.js';
import type { DataSetElementEditor } from '../dataset/data-set-element-editor.js';
import type { ReportControlElementEditor } from './report-control-element-editor.js';
import BaseElementEditor from '../base-element-editor.js';
export declare class ReportControlEditor extends BaseElementEditor {
    selectionList: ActionList;
    selectReportControlButton: Button;
    rpControlElementEditor: ReportControlElementEditor;
    dataSetElementEditor: DataSetElementEditor;
    /** Resets selected Report and its DataSet, if not existing in new doc
    update(props: Map<string | number | symbol, unknown>): void {
      super.update(props);
  
      if (props.has('doc') && this.selectCtrlBlock) {
        const newReportControl = updateElementReference(
          this.doc,
          this.selectCtrlBlock
        );
  
        this.selectCtrlBlock = newReportControl ?? undefined;
        this.selectedDataSet = this.selectCtrlBlock
          ? updateElementReference(this.doc, this.selectedDataSet!)
          : undefined;
  
        /* TODO(Jakob Vogelsang): fix when action-list is activable
        if (
          !newReportControl &&
          this.selectionList &&
          this.selectionList.selected
        )
          (this.selectionList.selected as ListItem).selected = false;
      }
    } */
    private renderElementEditorContainer;
    private renderSelectionList;
    private renderToggleButton;
    render(): TemplateResult;
    static styles: import("lit").CSSResult;
}
