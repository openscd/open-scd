/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Wizards for SCL ReportControl element define an edit wizard that looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="close"
  heading="[wizard.title.edit]"
  open=""
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
    <wizard-select
      disabled=""
      helper="[scl.buffered]"
      label="buffered"
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="true"
      >
        true
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="false"
      >
        false
      </mwc-list-item>
    </wizard-select>
    <wizard-textfield
      helper="[scl.id]"
      label="rptID"
      required=""
      validationmessage="[textfield.nonempty]"
    >
    </wizard-textfield>
    <wizard-select
      helper="[scl.indexed]"
      label="indexed"
      nullable=""
      required=""
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="true"
      >
        true
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="false"
      >
        false
      </mwc-list-item>
    </wizard-select>
    <wizard-textfield
      helper="[scl.maxReport]"
      label="max Clients"
      nullable=""
      suffix="ms"
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
    <mwc-button
      icon="edit"
      id="editdataset"
      label="[scl.DataSet]"
    >
    </mwc-button>
    <mwc-button
      icon="edit"
      id="edittrgops"
      label="[scl.TrgOps]"
    >
    </mwc-button>
    <mwc-button
      icon="edit"
      id="editoptfields"
      label="[scl.OptFields]"
    >
    </mwc-button>
    <mwc-button
      icon="delete"
      label="[remove]"
    >
    </mwc-button>
  </div>
  <mwc-button
    dialogaction="close"
    label="[cancel]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    dialoginitialfocus=""
    icon="save"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL ReportControl element define an edit wizard that looks like the latest snapshot */

snapshots["Wizards for SCL ReportControl element define a select wizard that looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="close"
  heading="[wizard.title.select]"
  open=""
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
    </filtered-list>
  </div>
  <mwc-button
    dialogaction="close"
    label="[cancel]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL ReportControl element define a select wizard that looks like the latest snapshot */

