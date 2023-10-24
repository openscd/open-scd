/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Wizards for SCL element IED edit IED looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[ied.wizard.title.edit]"
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
    </mwc-menu>
  </nav>
  <div id="wizard-content">
    <wizard-textfield
      dialoginitialfocus=""
      helper="[ied.wizard.nameHelper]"
      label="name"
      pattern="[A-Za-z][0-9A-Za-z_]{0,2}|[A-Za-z][0-9A-Za-z_]{4,63}|[A-MO-Za-z][0-9A-Za-z_]{3}|N[0-9A-Za-np-z_][0-9A-Za-z_]{2}|No[0-9A-Za-mo-z_][0-9A-Za-z_]|Non[0-9A-Za-df-z_]"
      required=""
      validationmessage="[textfield.required]"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[ied.wizard.descHelper]"
      label="desc"
      nullable=""
      pattern="([ -~]|[]|[ -퟿]|[-�])*"
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      label="type"
      readonly=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      label="manufacturer"
      readonly=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      label="configVersion"
      readonly=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      label="originalSclVersion"
      readonly=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      label="engRight"
      readonly=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      label="owner"
      readonly=""
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
    icon="edit"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL element IED edit IED looks like the latest snapshot */

snapshots["Wizards for SCL element IED remove IED looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[ied.wizard.title.delete]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <section>
      <h1>
        [ied.wizard.title.references]
      </h1>
      <mwc-list>
        <mwc-list-item
          aria-disabled="false"
          noninteractive=""
          tabindex="-1"
          twoline=""
        >
          <span>
            Association
          </span>
          <span slot="secondary">
            IED2>P1>
          </span>
        </mwc-list-item>
        <mwc-list-item
          aria-disabled="false"
          noninteractive=""
          tabindex="-1"
          twoline=""
        >
          <span>
            ClientLN
          </span>
          <span slot="secondary">
            IED2>>CBSW> XSWI 1>ReportCb>IED1 P1 CircuitBreaker_CB1/ XCBR 1
          </span>
        </mwc-list-item>
        <mwc-list-item
          aria-disabled="false"
          noninteractive=""
          tabindex="-1"
          twoline=""
        >
          <span>
            ClientLN
          </span>
          <span slot="secondary">
            IED2>>CBSW> XSWI 2>ReportCb>IED1 P1 CircuitBreaker_CB1/ XCBR 1
          </span>
        </mwc-list-item>
        <mwc-list-item
          aria-disabled="false"
          noninteractive=""
          tabindex="-1"
          twoline=""
        >
          <span>
            ConnectedAP
          </span>
          <span slot="secondary">
            IED1 P1
          </span>
        </mwc-list-item>
        <mwc-list-item
          aria-disabled="false"
          noninteractive=""
          tabindex="-1"
          twoline=""
        >
          <span>
            ExtRef
          </span>
          <span slot="secondary">
            IED2>>CBSW> XSWI 1>IED1 Disconnectors/DC XSWI 1 Pos stVal
          </span>
        </mwc-list-item>
        <mwc-list-item
          aria-disabled="false"
          noninteractive=""
          tabindex="-1"
          twoline=""
        >
          <span>
            ExtRef
          </span>
          <span slot="secondary">
            IED2>>CBSW> XSWI 1>IED1 Disconnectors/DC XSWI 1 Pos q
          </span>
        </mwc-list-item>
        <mwc-list-item
          aria-disabled="false"
          noninteractive=""
          tabindex="-1"
          twoline=""
        >
          <span>
            ExtRef
          </span>
          <span slot="secondary">
            IED2>>CircuitBreaker_CB1> CSWI 1>IED1 CircuitBreaker_CB1/ XCBR 1 Pos stVal
          </span>
        </mwc-list-item>
        <mwc-list-item
          aria-disabled="false"
          noninteractive=""
          tabindex="-1"
          twoline=""
        >
          <span>
            ExtRef
          </span>
          <span slot="secondary">
            IED2>>CircuitBreaker_CB1> CSWI 1>IED1 CircuitBreaker_CB1/ XCBR 1 Pos q
          </span>
        </mwc-list-item>
        <mwc-list-item
          aria-disabled="false"
          noninteractive=""
          tabindex="-1"
          twoline=""
        >
          <span>
            KDC
          </span>
          <span slot="secondary">
            IED1>IED1 P1
          </span>
        </mwc-list-item>
      </mwc-list>
    </section>
  </div>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="delete"
    label="[remove]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Wizards for SCL element IED remove IED looks like the latest snapshot */

