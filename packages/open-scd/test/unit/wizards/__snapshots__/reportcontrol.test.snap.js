/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Wizards for SCL ReportControl element define an edit wizard that for complete ReportControl element looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.edit]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 48px)"
>
  <nav>
    <mwc-icon-button icon="more_vert">
    </mwc-icon-button>
    <mwc-menu
      class="actions-menu"
      corner="BOTTOM_RIGHT"
      menucorner="END"
    >
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        role="menuitem"
        tabindex="0"
      >
        <span>
          [remove]
        </span>
        <mwc-icon slot="graphic">
          delete
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        role="menuitem"
        tabindex="-1"
      >
        <span>
          [scl.DataSet]
        </span>
        <mwc-icon slot="graphic">
          edit
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        role="menuitem"
        tabindex="-1"
      >
        <span>
          [scl.TrgOps]
        </span>
        <mwc-icon slot="graphic">
          edit
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        role="menuitem"
        tabindex="-1"
      >
        <span>
          [scl.OptFields]
        </span>
        <mwc-icon slot="graphic">
          edit
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        role="menuitem"
        tabindex="-1"
      >
        <span>
          [controlblock.label.copy]
        </span>
        <mwc-icon slot="graphic">
          copy
        </mwc-icon>
      </mwc-list-item>
    </mwc-menu>
  </nav>
  <div id="wizard-content">
    <wizard-textfield
      dialoginitialfocus=""
      helper="[scl.name]"
      label="name"
      maxlength="32"
      pattern="[A-Za-z][0-9,A-Z,a-z_]*"
      required=""
      validationmessage="[textfield.required]"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[scl.desc]"
      label="desc"
      nullable=""
    >
    </wizard-textfield>
    <wizard-checkbox
      helper="[scl.buffered]"
      label="buffered"
    >
    </wizard-checkbox>
    <wizard-textfield
      helper="[report.rptID]"
      label="rptID"
      nullable=""
      required=""
    >
    </wizard-textfield>
    <wizard-checkbox
      helper="[scl.indexed]"
      label="indexed"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-textfield
      helper="[scl.maxReport]"
      label="max Clients"
      nullable=""
      suffix="#"
      type="number"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[scl.bufTime]"
      label="bufTime"
      min="0"
      nullable=""
      required=""
      suffix="ms"
      type="number"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[scl.intgPd]"
      label="intgPd"
      min="0"
      nullable=""
      required=""
      suffix="ms"
      type="number"
    >
    </wizard-textfield>
  </div>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="save"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL ReportControl element define an edit wizard that for complete ReportControl element looks like the latest snapshot */

snapshots["Wizards for SCL ReportControl element define an edit wizard that for ReportControl with missing child elements and referenced DataSet looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.edit]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 48px)"
>
  <nav>
    <mwc-icon-button icon="more_vert">
    </mwc-icon-button>
    <mwc-menu
      class="actions-menu"
      corner="BOTTOM_RIGHT"
      menucorner="END"
    >
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          [remove]
        </span>
        <mwc-icon slot="graphic">
          delete
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          [controlblock.label.copy]
        </span>
        <mwc-icon slot="graphic">
          copy
        </mwc-icon>
      </mwc-list-item>
    </mwc-menu>
  </nav>
  <div id="wizard-content">
    <wizard-textfield
      dialoginitialfocus=""
      helper="[scl.name]"
      label="name"
      maxlength="32"
      pattern="[A-Za-z][0-9,A-Z,a-z_]*"
      required=""
      validationmessage="[textfield.required]"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[scl.desc]"
      label="desc"
      nullable=""
    >
    </wizard-textfield>
    <wizard-checkbox
      helper="[scl.buffered]"
      label="buffered"
    >
    </wizard-checkbox>
    <wizard-textfield
      disabled=""
      helper="[report.rptID]"
      label="rptID"
      nullable=""
      required=""
    >
    </wizard-textfield>
    <wizard-checkbox
      helper="[scl.indexed]"
      label="indexed"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-textfield
      disabled=""
      helper="[scl.maxReport]"
      label="max Clients"
      nullable=""
      suffix="#"
      type="number"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[scl.bufTime]"
      label="bufTime"
      min="0"
      nullable=""
      required=""
      suffix="ms"
      type="number"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[scl.intgPd]"
      label="intgPd"
      min="0"
      nullable=""
      required=""
      suffix="ms"
      type="number"
    >
    </wizard-textfield>
  </div>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="save"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL ReportControl element define an edit wizard that for ReportControl with missing child elements and referenced DataSet looks like the latest snapshot */

snapshots["Wizards for SCL ReportControl element define a select wizard that with existing ReportControl element looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.select]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        twoline=""
        value="IED2>>CBSW>ReportCb"
      >
        <span>
          ReportCb
        </span>
        <span slot="secondary">
          IED2>>CBSW>ReportCb
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED2>>CBSW> XSWI 1>ReportCb2"
      >
        <span>
          ReportCb2
        </span>
        <span slot="secondary">
          IED2>>CBSW> XSWI 1>ReportCb2
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED2>>CBSW> XSWI 2>ReportCb3"
      >
        <span>
          ReportCb3
        </span>
        <span slot="secondary">
          IED2>>CBSW> XSWI 2>ReportCb3
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED3>>CBSW>ReportCb"
      >
        <span>
          ReportCb
        </span>
        <span slot="secondary">
          IED3>>CBSW>ReportCb
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED3>>CBSW> XSWI 1>ReportCb2"
      >
        <span>
          ReportCb2
        </span>
        <span slot="secondary">
          IED3>>CBSW> XSWI 1>ReportCb2
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED6>>CBSW>ReportCb"
      >
        <span>
          ReportCb
        </span>
        <span slot="secondary">
          IED6>>CBSW>ReportCb
        </span>
      </mwc-list-item>
    </filtered-list>
  </div>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="add"
    label="[Report]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL ReportControl element define a select wizard that with existing ReportControl element looks like the latest snapshot */

snapshots["Wizards for SCL ReportControl element define a select wizard that with invalid parent looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.select]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <filtered-list>
    </filtered-list>
  </div>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL ReportControl element define a select wizard that with invalid parent looks like the latest snapshot */

snapshots["Wizards for SCL ReportControl element define an create wizard that the first page looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.add]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-textfield
      dialoginitialfocus=""
      helper="[scl.name]"
      label="name"
      maxlength="32"
      pattern="[A-Za-z][0-9,A-Z,a-z_]*"
      required=""
      validationmessage="[textfield.required]"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[scl.desc]"
      label="desc"
      nullable=""
    >
    </wizard-textfield>
    <wizard-checkbox
      helper="[scl.buffered]"
      label="buffered"
    >
    </wizard-checkbox>
    <wizard-textfield
      disabled=""
      helper="[report.rptID]"
      label="rptID"
      nullable=""
      required=""
    >
    </wizard-textfield>
    <wizard-checkbox
      helper="[scl.indexed]"
      label="indexed"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-textfield
      helper="[scl.maxReport]"
      label="max Clients"
      nullable=""
      suffix="#"
      type="number"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[scl.bufTime]"
      label="bufTime"
      min="0"
      nullable=""
      required=""
      suffix="ms"
      type="number"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[scl.intgPd]"
      label="intgPd"
      min="0"
      nullable=""
      required=""
      suffix="ms"
      type="number"
    >
    </wizard-textfield>
  </div>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    dialogaction="next"
    icon="navigate_next"
    label="[scl.TrgOps]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL ReportControl element define an create wizard that the first page looks like the latest snapshot */

snapshots["Wizards for SCL ReportControl element define an create wizard that the second page looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[scl.TrgOps]"
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-checkbox
      helper="[scl.dchg]"
      label="dchg"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      helper="[scl.qchg]"
      label="qchg"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      helper="[scl.dupd]"
      label="dupd"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      helper="[scl.period]"
      label="period"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      helper="[scl.gi]"
      label="gi"
      nullable=""
    >
    </wizard-checkbox>
  </div>
  <mwc-button
    dialogaction="prev"
    icon="navigate_before"
    label="[wizard.title.add]"
    slot="secondaryAction"
  >
  </mwc-button>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    dialogaction="next"
    icon="navigate_next"
    label="[scl.OptFields]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL ReportControl element define an create wizard that the second page looks like the latest snapshot */

snapshots["Wizards for SCL ReportControl element define an create wizard that the third page looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[scl.OptFields]"
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-checkbox
      helper="[scl.seqNum]"
      label="seqNum"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      helper="[scl.timeStamp]"
      label="timeStamp"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      helper="[scl.dataSet]"
      label="dataSet"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      helper="[scl.reasonCode]"
      label="reasonCode"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      helper="[scl.dataRef]"
      label="dataRef"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      helper="[scl.entryID]"
      label="entryID"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      helper="[scl.configRef]"
      label="configRef"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      helper="[scl.bufOvfl]"
      label="bufOvfl"
      nullable=""
    >
    </wizard-checkbox>
  </div>
  <mwc-button
    dialogaction="prev"
    icon="navigate_before"
    label="[scl.TrgOps]"
    slot="secondaryAction"
  >
  </mwc-button>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    dialogaction="next"
    icon="navigate_next"
    label="[dataset.fcda.add]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL ReportControl element define an create wizard that the third page looks like the latest snapshot */

snapshots["Wizards for SCL ReportControl element define an create wizard that the forth page looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[dataset.fcda.add]"
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <finder-list multi="">
    </finder-list>
  </div>
  <mwc-button
    dialogaction="prev"
    icon="navigate_before"
    label="[scl.OptFields]"
    slot="secondaryAction"
  >
  </mwc-button>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="save"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL ReportControl element define an create wizard that the forth page looks like the latest snapshot */

snapshots["Wizards for SCL ReportControl element define a wizard to select the control block reference looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[report.wizard.location]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <finder-list path="[&quot;SCL: &quot;]">
    </finder-list>
  </div>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon=""
    label="[next]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL ReportControl element define a wizard to select the control block reference looks like the latest snapshot */

snapshots["Wizards for SCL ReportControl element define copy to other IED selector looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[report.wizard.location]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <filtered-list multi="">
      <mwc-check-list-item
        aria-disabled="true"
        disabled=""
        graphic="control"
        mwc-list-item=""
        tabindex="0"
        twoline=""
        value="IED2"
      >
        <span>
          IED2
        </span>
        <span slot="secondary">
          [controlblock.hints.source]
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="true"
        disabled=""
        graphic="control"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED3"
      >
        <span>
          IED3
        </span>
        <span slot="secondary">
          [controlblock.hints.exist]
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="true"
        disabled=""
        graphic="control"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED4"
      >
        <span>
          IED4
        </span>
        <span slot="secondary">
          [controlblock.hints.noMatchingData]
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED5"
      >
        <span>
          IED5
        </span>
        <span slot="secondary">
          [controlBlock.hints.valid]
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="true"
        disabled=""
        graphic="control"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED6"
      >
        <span>
          IED6
        </span>
        <span slot="secondary">
          [controlblock.hints.exist]
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="true"
        disabled=""
        graphic="control"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED7"
      >
        <span>
          IED7
        </span>
        <span slot="secondary">
          [controlblock.hints.exist]
        </span>
      </mwc-check-list-item>
    </filtered-list>
  </div>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="save"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL ReportControl element define copy to other IED selector looks like the latest snapshot */

