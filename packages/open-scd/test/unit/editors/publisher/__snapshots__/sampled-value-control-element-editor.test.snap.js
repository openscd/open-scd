/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots[
  'Editor for SampledValueControl element its referenced elements with deprecated multicast attribute set to false looks like the latest snapshot'
] = `<h2 style="display: flex;">
  <div style="flex:auto">
    <div>
      SampledValueControl
    </div>
    <div class="headersubtitle">
      IED3>>MU01>MSVCB01
    </div>
  </div>
</h2>
<div class="parentcontent">
  <div class="content">
    <wizard-textfield
      dialoginitialfocus=""
      disabled=""
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
      disabled=""
      helper="[scl.multicast]"
      label="multicast"
    >
    </wizard-checkbox>
    <wizard-textfield
      disabled=""
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
        tabindex="0"
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
      disabled=""
      helper="[scl.smpRate]"
      label="smpRate"
      min="0"
      required=""
      type="number"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
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
        tabindex="0"
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
  <div class="content">
    <h3>
      [publisher.smv.smvopts]
    </h3>
    <wizard-checkbox
      disabled=""
      helper="[scl.refreshTime]"
      label="refreshTime"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      disabled=""
      helper="[scl.sampleRate]"
      label="sampleRate"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      disabled=""
      helper="[scl.dataSet]"
      label="dataSet"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      disabled=""
      helper="[scl.security]"
      label="security"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      disabled=""
      helper="[scl.synchSourceId]"
      label="synchSourceId"
      nullable=""
    >
    </wizard-checkbox>
    <h3>
      [publisher.smv.commsetting]
    </h3>
    <mwc-formfield label="[connectedap.wizard.addschemainsttype]">
      <mwc-checkbox
        disabled=""
        id="instType"
      >
      </mwc-checkbox>
    </mwc-formfield>
    <wizard-textfield
      disabled=""
      label="MAC-Address"
      pattern="([0-9A-F]{2}-){5}[0-9A-F]{2}"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
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
</div>
`;
/* end snapshot Editor for SampledValueControl element its referenced elements with deprecated multicast attribute set to false looks like the latest snapshot */

snapshots[
  'Editor for SampledValueControl element its referenced elements with multicast SampledValueControl looks like the latest snapshot'
] = `<h2 style="display: flex;">
  <div style="flex:auto">
    <div>
      SampledValueControl
    </div>
    <div class="headersubtitle">
      IED2>>CBSW>MSVCB01
    </div>
  </div>
</h2>
<div class="parentcontent">
  <div class="content">
    <wizard-textfield
      dialoginitialfocus=""
      disabled=""
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
    <wizard-textfield
      disabled=""
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
        tabindex="0"
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
      disabled=""
      helper="[scl.smpRate]"
      label="smpRate"
      min="0"
      required=""
      type="number"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
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
        tabindex="0"
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
  <div class="content">
    <h3>
      [publisher.smv.smvopts]
    </h3>
    <wizard-checkbox
      disabled=""
      helper="[scl.refreshTime]"
      label="refreshTime"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      disabled=""
      helper="[scl.sampleRate]"
      label="sampleRate"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      disabled=""
      helper="[scl.dataSet]"
      label="dataSet"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      disabled=""
      helper="[scl.security]"
      label="security"
      nullable=""
    >
    </wizard-checkbox>
    <wizard-checkbox
      disabled=""
      helper="[scl.synchSourceId]"
      label="synchSourceId"
      nullable=""
    >
    </wizard-checkbox>
    <h3>
      <div>
        [publisher.smv.commsetting]
      </div>
      <div class="headersubtitle">
        [publisher.smv.noconnectionap]
      </div>
    </h3>
  </div>
</div>
`;
/* end snapshot Editor for SampledValueControl element its referenced elements with multicast SampledValueControl looks like the latest snapshot */
