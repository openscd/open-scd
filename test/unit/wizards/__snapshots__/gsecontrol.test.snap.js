/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["gsecontrol wizards selectGseControlWizard looks like the latest snapshot"] = 
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
        value="IED1>>CircuitBreaker_CB1>GCB"
      >
        <span>
          GCB
        </span>
        <span slot="secondary">
          IED1>>CircuitBreaker_CB1>GCB
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED1>>CircuitBreaker_CB1>GCB2"
      >
        <span>
          GCB2
        </span>
        <span slot="secondary">
          IED1>>CircuitBreaker_CB1>GCB2
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED2>>CBSW>GCB"
      >
        <span>
          GCB
        </span>
        <span slot="secondary">
          IED2>>CBSW>GCB
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
    label="[GOOSE]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot gsecontrol wizards selectGseControlWizard looks like the latest snapshot */

snapshots["gsecontrol wizards renderGseAttribute looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="title"
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
    <wizard-select
      helper="[scl.type]"
      label="type"
      nullable=""
      required=""
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="GOOSE"
      >
        GOOSE
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="GSSE"
      >
        GSSE
      </mwc-list-item>
    </wizard-select>
    <wizard-textfield
      helper="[scl.id]"
      label="appID"
      required=""
      validationmessage="[textfield.nonempty]"
    >
    </wizard-textfield>
    <wizard-checkbox
      helper="[scl.fixedOffs]"
      label="fixedOffs"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-select
      disabled=""
      helper="[scl.securityEnable]"
      label="securityEnabled"
      nullable=""
      required=""
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="None"
      >
        None
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="Signature"
      >
        Signature
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="SignatureAndEncryption"
      >
        SignatureAndEncryption
      </mwc-list-item>
    </wizard-select>
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
/* end snapshot gsecontrol wizards renderGseAttribute looks like the latest snapshot */

snapshots["gsecontrol wizards editGseControlWizard looks like the latest snapshot"] = 
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
        tabindex="-1"
      >
        <span>
          [scl.Communication]
        </span>
        <mwc-icon slot="graphic">
          edit
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
    <wizard-select
      helper="[scl.type]"
      label="type"
      nullable=""
      required=""
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="GOOSE"
      >
        GOOSE
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="GSSE"
      >
        GSSE
      </mwc-list-item>
    </wizard-select>
    <wizard-textfield
      helper="[scl.id]"
      label="appID"
      required=""
      validationmessage="[textfield.nonempty]"
    >
    </wizard-textfield>
    <wizard-checkbox
      helper="[scl.fixedOffs]"
      label="fixedOffs"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-select
      disabled=""
      helper="[scl.securityEnable]"
      label="securityEnabled"
      nullable=""
      required=""
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="None"
      >
        None
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="Signature"
      >
        Signature
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="SignatureAndEncryption"
      >
        SignatureAndEncryption
      </mwc-list-item>
    </wizard-select>
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
/* end snapshot gsecontrol wizards editGseControlWizard looks like the latest snapshot */

snapshots["gsecontrol wizards define an create wizard that with existing ConnectedAP element in the Communication section the first page looks like the latest snapshot"] = 
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
    <wizard-select
      helper="[scl.type]"
      label="type"
      nullable=""
      required=""
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="GOOSE"
      >
        GOOSE
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="GSSE"
      >
        GSSE
      </mwc-list-item>
    </wizard-select>
    <wizard-textfield
      helper="[scl.id]"
      label="appID"
      required=""
      validationmessage="[textfield.nonempty]"
    >
    </wizard-textfield>
    <wizard-checkbox
      helper="[scl.fixedOffs]"
      label="fixedOffs"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-select
      disabled=""
      helper="[scl.securityEnable]"
      label="securityEnabled"
      nullable=""
      required=""
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="None"
      >
        None
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="Signature"
      >
        Signature
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="SignatureAndEncryption"
      >
        SignatureAndEncryption
      </mwc-list-item>
    </wizard-select>
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
    label="[wizard.title.add]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot gsecontrol wizards define an create wizard that with existing ConnectedAP element in the Communication section the first page looks like the latest snapshot */

snapshots["gsecontrol wizards define an create wizard that with existing ConnectedAP element in the Communication section the second page looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.add]"
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <mwc-formfield label="[connectedap.wizard.addschemainsttype]">
      <mwc-checkbox
        checked=""
        id="instType"
      >
      </mwc-checkbox>
    </mwc-formfield>
    <wizard-textfield
      label="MAC-Address"
      pattern="([0-9A-F]{2}-){5}[0-9A-F]{2}"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      label="APPID"
      pattern="[0-9A-F]{4}"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      label="VLAN-ID"
      nullable=""
      pattern="[0-9A-F]{3}"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      label="VLAN-PRIORITY"
      nullable=""
      pattern="[0-7]"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      label="MinTime"
      nullable=""
      suffix="ms"
      type="number"
    >
    </wizard-textfield>
    <wizard-textfield
      label="MaxTime"
      nullable=""
      suffix="ms"
      type="number"
    >
    </wizard-textfield>
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
    label="[dataset.fcda.add]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot gsecontrol wizards define an create wizard that with existing ConnectedAP element in the Communication section the second page looks like the latest snapshot */

snapshots["gsecontrol wizards define an create wizard that with existing ConnectedAP element in the Communication section the third page looks like the latest snapshot"] = 
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
    icon="save"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot gsecontrol wizards define an create wizard that with existing ConnectedAP element in the Communication section the third page looks like the latest snapshot */

snapshots["gsecontrol wizards define an create wizard that with missing ConnectedAP element in the Communication section the second page having a warning message "] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.add]"
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <h3 style="color: var(--mdc-theme-on-surface);
                      font-family: 'Roboto', sans-serif;
                      font-weight: 300;">
      [gse.missingaccp]
    </h3>
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
    label="[dataset.fcda.add]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot gsecontrol wizards define an create wizard that with missing ConnectedAP element in the Communication section the second page having a warning message  */

snapshots["gsecontrol wizards define a wizard to select the control block reference looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[gsecontrol.wizard.location]"
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
/* end snapshot gsecontrol wizards define a wizard to select the control block reference looks like the latest snapshot */

