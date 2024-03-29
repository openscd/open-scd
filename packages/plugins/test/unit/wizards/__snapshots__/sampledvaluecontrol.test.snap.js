/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Wizards for SCL element SampledValueControl define an edit wizard that with muticast attribute set to false - deprecated looks like the latest snapshot"] = 
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
          [scl.SmvOpts]
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
      pattern="([ -~]|[]|[ -퟿]|[-�])*"
    >
    </wizard-textfield>
    <wizard-checkbox
      disabled=""
      helper="[scl.multicast]"
      label="multicast"
    >
    </wizard-checkbox>
    <wizard-textfield
      helper="[scl.id]"
      label="smvID"
      required=""
      validationmessage="[textfield.nonempty]"
    >
    </wizard-textfield>
    <wizard-select
      disabled=""
      helper="[scl.smpMod]"
      label="smpMod"
      nullable=""
      required=""
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="SmpPerPeriod"
      >
        SmpPerPeriod
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="SmpPerSec"
      >
        SmpPerSec
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="SecPerSmp"
      >
        SecPerSmp
      </mwc-list-item>
    </wizard-select>
    <wizard-textfield
      helper="[scl.smpRate]"
      label="smpRate"
      min="0"
      required=""
      type="number"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[scl.nofASDU]"
      label="nofASDU"
      min="0"
      required=""
      type="number"
    >
    </wizard-textfield>
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
    icon="save"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL element SampledValueControl define an edit wizard that with muticast attribute set to false - deprecated looks like the latest snapshot */

snapshots["Wizards for SCL element SampledValueControl define an edit wizard that  with multicast set to treu looks like the latest snapshot"] = 
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
          [scl.SmvOpts]
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
      pattern="([ -~]|[]|[ -퟿]|[-�])*"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[scl.id]"
      label="smvID"
      required=""
      validationmessage="[textfield.nonempty]"
    >
    </wizard-textfield>
    <wizard-select
      disabled=""
      helper="[scl.smpMod]"
      label="smpMod"
      nullable=""
      required=""
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="SmpPerPeriod"
      >
        SmpPerPeriod
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="SmpPerSec"
      >
        SmpPerSec
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="SecPerSmp"
      >
        SecPerSmp
      </mwc-list-item>
    </wizard-select>
    <wizard-textfield
      helper="[scl.smpRate]"
      label="smpRate"
      min="0"
      required=""
      type="number"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[scl.nofASDU]"
      label="nofASDU"
      min="0"
      required=""
      type="number"
    >
    </wizard-textfield>
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
    icon="save"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL element SampledValueControl define an edit wizard that  with multicast set to treu looks like the latest snapshot */

snapshots["Wizards for SCL element SampledValueControl define an create wizard that with existing ConnectedAP element in the Communication section the first page looks like the latest snapshot"] = 
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
      pattern="([ -~]|[]|[ -퟿]|[-�])*"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[scl.id]"
      label="smvID"
      required=""
      validationmessage="[textfield.nonempty]"
    >
    </wizard-textfield>
    <wizard-select
      helper="[scl.smpMod]"
      label="smpMod"
      nullable=""
      required=""
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="SmpPerPeriod"
      >
        SmpPerPeriod
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="SmpPerSec"
      >
        SmpPerSec
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="SecPerSmp"
      >
        SecPerSmp
      </mwc-list-item>
    </wizard-select>
    <wizard-textfield
      helper="[scl.smpRate]"
      label="smpRate"
      min="0"
      required=""
      type="number"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[scl.nofASDU]"
      label="nofASDU"
      min="0"
      required=""
      type="number"
    >
    </wizard-textfield>
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
/* end snapshot Wizards for SCL element SampledValueControl define an create wizard that with existing ConnectedAP element in the Communication section the first page looks like the latest snapshot */

snapshots["Wizards for SCL element SampledValueControl define an create wizard that with existing ConnectedAP element in the Communication section the second page looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.add]"
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <wizard-checkbox
      helper="[scl.refreshTime]"
      label="refreshTime"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      helper="[scl.sampleRate]"
      label="sampleRate"
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
      helper="[scl.security]"
      label="security"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      helper="[scl.synchSourceId]"
      label="synchSourceId"
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
    label="[wizard.title.add]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL element SampledValueControl define an create wizard that with existing ConnectedAP element in the Communication section the second page looks like the latest snapshot */

snapshots["Wizards for SCL element SampledValueControl define an create wizard that with existing ConnectedAP element in the Communication section the third page looks like the latest snapshot"] = 
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
/* end snapshot Wizards for SCL element SampledValueControl define an create wizard that with existing ConnectedAP element in the Communication section the third page looks like the latest snapshot */

snapshots["Wizards for SCL element SampledValueControl define an create wizard that with existing ConnectedAP element in the Communication section the fourth page looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[dataset.fcda.add]"
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <finder-list
      multi=""
      paths="[[&quot;Server: IED3>P1&quot;]]"
    >
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
/* end snapshot Wizards for SCL element SampledValueControl define an create wizard that with existing ConnectedAP element in the Communication section the fourth page looks like the latest snapshot */

snapshots["Wizards for SCL element SampledValueControl define an create wizard that with missing ConnectedAP element in the Communication section the third page having a warning message "] = 
`<mwc-dialog
  defaultaction="next"
  heading="[wizard.title.add]"
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <h3 style="color: var(--mdc-theme-on-surface);
                      font-family: 'Roboto', sans-serif;
                      font-weight: 300;">
      [smv.missingaccp]
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
/* end snapshot Wizards for SCL element SampledValueControl define an create wizard that with missing ConnectedAP element in the Communication section the third page having a warning message  */

snapshots["Wizards for SCL element SampledValueControl define a select wizard that looks like the latest snapshot"] = 
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
        value="IED2>>CBSW>MSVCB01"
      >
        <span>
          MSVCB01
        </span>
        <span slot="secondary">
          IED2>>CBSW>MSVCB01
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="IED3>>MU01>MSVCB01"
      >
        <span>
          MSVCB01
        </span>
        <span slot="secondary">
          IED3>>MU01>MSVCB01
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
    label="[scl.SampledValueControl]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL element SampledValueControl define a select wizard that looks like the latest snapshot */

