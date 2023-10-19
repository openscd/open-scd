/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["clientln wizards createClientLnWizard looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="[commmap.connectToIED]"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <div
      class="wrapper"
      style="display: grid; grid-template-columns: 1fr 1fr;"
    >
      <filtered-list
        id="sourcelist"
        multi=""
        searchfieldlabel="[scl.Report]"
      >
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          hasmeta=""
          left=""
          mwc-list-item=""
          tabindex="0"
          twoline=""
          value="IED2>>CBSW> XSWI 2>ReportCb"
        >
          <span>
            ReportCb
          </span>
          <span slot="secondary">
            IED2>>CBSW> XSWI 2
          </span>
          <span slot="meta">
            4/5
          </span>
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="true"
          disabled=""
          graphic="control"
          hasmeta=""
          left=""
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED1>>Disconnectors> XSWI 2>ReportCb"
        >
          <span>
            ReportCb
          </span>
          <span slot="secondary">
            IED1>>Disconnectors> XSWI 2
          </span>
          <span slot="meta">
            2/2
          </span>
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          hasmeta=""
          left=""
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED2>>CBSW> XSWI 1>ReportEmpty"
        >
          <span>
            ReportEmpty
          </span>
          <span slot="secondary">
            IED2>>CBSW> XSWI 1
          </span>
          <span slot="meta">
            0
          </span>
        </mwc-check-list-item>
      </filtered-list>
      <filtered-list
        activatable=""
        id="sinklist"
        multi=""
        searchfieldlabel="[scl.LN]"
      >
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          mwc-list-item=""
          tabindex="0"
          twoline=""
          value="IED1>P1>DC CILO 1"
        >
          <span>
            DC CILO 1
          </span>
          <span slot="secondary">
            IED1>P1
          </span>
        </mwc-check-list-item>
        <li
          divider=""
          role="separator"
        >
        </li>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED1>>CircuitBreaker_CB1> XCBR 1"
        >
          <span>
            XCBR 1
          </span>
          <span slot="secondary">
            IED1>>CircuitBreaker_CB1
          </span>
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED1>>CircuitBreaker_CB1> CSWI 1"
        >
          <span>
            CSWI 1
          </span>
          <span slot="secondary">
            IED1>>CircuitBreaker_CB1
          </span>
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED1>>CircuitBreaker_CB1>CB XCBR 2"
        >
          <span>
            CB XCBR 2
          </span>
          <span slot="secondary">
            IED1>>CircuitBreaker_CB1
          </span>
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED1>>CircuitBreaker_CB1>CB CSWI 2"
        >
          <span>
            CB CSWI 2
          </span>
          <span slot="secondary">
            IED1>>CircuitBreaker_CB1
          </span>
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED1>>Disconnectors>DC XSWI 1"
        >
          <span>
            DC XSWI 1
          </span>
          <span slot="secondary">
            IED1>>Disconnectors
          </span>
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED1>>Disconnectors>DC CSWI 1"
        >
          <span>
            DC CSWI 1
          </span>
          <span slot="secondary">
            IED1>>Disconnectors
          </span>
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED1>>Disconnectors>DC CILO 1"
        >
          <span>
            DC CILO 1
          </span>
          <span slot="secondary">
            IED1>>Disconnectors
          </span>
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED1>>Disconnectors> XSWI 3"
        >
          <span>
            XSWI 3
          </span>
          <span slot="secondary">
            IED1>>Disconnectors
          </span>
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED1>>Disconnectors> CSWI 3"
        >
          <span>
            CSWI 3
          </span>
          <span slot="secondary">
            IED1>>Disconnectors
          </span>
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED1>>Disconnectors> CILO 3"
        >
          <span>
            CILO 3
          </span>
          <span slot="secondary">
            IED1>>Disconnectors
          </span>
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED1>>Disconnectors> XSWI 2"
        >
          <span>
            XSWI 2
          </span>
          <span slot="secondary">
            IED1>>Disconnectors
          </span>
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED1>>Disconnectors> CSWI 2"
        >
          <span>
            CSWI 2
          </span>
          <span slot="secondary">
            IED1>>Disconnectors
          </span>
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED1>>CircuitBreaker_CB1"
        >
          <span>
            LLN0
          </span>
          <span slot="secondary">
            IED1>>CircuitBreaker_CB1
          </span>
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          mwc-list-item=""
          tabindex="-1"
          twoline=""
          value="IED1>>Disconnectors"
        >
          <span>
            LLN0
          </span>
          <span slot="secondary">
            IED1>>Disconnectors
          </span>
        </mwc-check-list-item>
      </filtered-list>
    </div>
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
    label="[connect]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot clientln wizards createClientLnWizard looks like the latest snapshot */

snapshots["clientln wizards selectClientLnWizard looks like the latest snapshot"] = 
`<mwc-dialog
  defaultaction="next"
  heading="IED2>>CBSW> XSWI 2>ReportCb - IED1"
  open=""
  style="--mdc-dialog-min-width:calc(100% + 0px)"
>
  <div id="wizard-content">
    <filtered-list multi="">
      <mwc-check-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        tabindex="0"
      >
        <span>
          DCCILO1
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          XCBR1
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          LLN0
        </span>
        <mwc-icon slot="graphic">
        </mwc-icon>
      </mwc-check-list-item>
    </filtered-list>
  </div>
  <mwc-button
    icon=""
    label="[back]"
    slot="secondaryAction"
    style=""
  >
  </mwc-button>
  <mwc-button
    icon="delete"
    label="[disconnect]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot clientln wizards selectClientLnWizard looks like the latest snapshot */

