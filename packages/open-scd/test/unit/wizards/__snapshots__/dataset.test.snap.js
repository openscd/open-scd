/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["dataset wizards include a dataset edit wizard looks like the latest snapshot"] = 
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
          [dataset.fcda.add]
        </span>
        <mwc-icon slot="graphic">
          add
        </mwc-icon>
      </mwc-list-item>
    </mwc-menu>
  </nav>
  <div id="wizard-content">
    <wizard-textfield
      disabled=""
      helper="[scl.name]"
      label="name"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[scl.desc]"
      label="desc"
      nullable=""
      required=""
    >
    </wizard-textfield>
    <filtered-list multi="">
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        selected=""
        tabindex="0"
        value="IED2>>CBSW>GooseDataSet1>CBSW/ XSWI 2.Pos stVal (ST)"
      >
        CBSW/ XSWI 2.Pos stVal (ST)
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        selected=""
        tabindex="-1"
        value="IED2>>CBSW>GooseDataSet1>CBSW/ XSWI 2.Pos q (ST)"
      >
        CBSW/ XSWI 2.Pos q (ST)
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        selected=""
        tabindex="-1"
        value="IED2>>CBSW>GooseDataSet1>CBSW/ XSWI 2.OpSlc.dsd sasd.ads.asd (ST)"
      >
        CBSW/ XSWI 2.OpSlc.dsd sasd.ads.asd (ST)
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
/* end snapshot dataset wizards include a dataset edit wizard looks like the latest snapshot */

