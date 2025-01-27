import { TemplateResult } from 'lit';
import '@material/mwc-button';
import type { Button } from '@material/mwc-button';
import { ActionList } from '@openenergytools/filterable-lists/dist/action-list.js';
import './sampled-value-control-element-editor.js';
import '../dataset/data-set-element-editor.js';
import type { DataSetElementEditor } from '../dataset/data-set-element-editor.js';
import type { SampledValueControlElementEditor } from './sampled-value-control-element-editor.js';
import BaseElementEditor from '../base-element-editor.js';
export declare class SampledValueControlEditor extends BaseElementEditor {
    selectionList: ActionList;
    selectSampledValueControlButton: Button;
    elementContainer?: SampledValueControlElementEditor;
    dataSetElementEditor: DataSetElementEditor;
    /** Resets selected SMV and its DataSet, if not existing in new doc
    update(props: Map<string | number | symbol, unknown>): void {
      super.update(props);
  
      if (props.has('doc') && this.selectCtrlBlock) {
        const newSampledValueControl = updateElementReference(
          this.doc,
          this.selectCtrlBlock
        );
  
        this.selectCtrlBlock = newSampledValueControl ?? undefined;
        this.selectedDataSet = this.selectCtrlBlock
          ? updateElementReference(this.doc, this.selectedDataSet!)
          : undefined;
  
        // TODO(JakobVogelsang): add activeable to ActionList
        /* if (
          !newSampledValueControl &&
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
