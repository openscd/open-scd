/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["ValidateSchema plugin for valid SCL files zeroissues indication looks like the latest snapshot"] = 
`<mwc-dialog
  heading="Diagnostics"
  id="diagnostic"
>
  <filtered-list
    id="content"
    wrapfocus=""
  >
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
    >
      Validate Schema
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <abbr title="valid2007B XML schema validation successful
undefined">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          valid2007B XML schema validation successful
        </span>
        <span slot="secondary">
        </span>
      </mwc-list-item>
    </abbr>
  </filtered-list>
  <mwc-button
    dialogaction="close"
    slot="primaryAction"
  >
    Close
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot ValidateSchema plugin for valid SCL files zeroissues indication looks like the latest snapshot */

snapshots["ValidateSchema plugin for invalid SCL files pushes issues to the diagnostics pane that look like the latest snapshot"] = 
`<mwc-dialog
  heading="Diagnostics"
  id="diagnostic"
>
  <filtered-list
    id="content"
    wrapfocus=""
  >
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
    >
      Validate Schema
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <abbr title="The attribute 'name' is required but missing.
invalid2007B:7 Substation name (Element '{http://www.iec.ch/61850/2003/SCL}Substation')">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
      >
        <span>
          The attribute 'name' is required but missing.
        </span>
        <span slot="secondary">
          invalid2007B:7 Substation name (Element '{http://www.iec.ch/61850/2003/SCL}Substation')
        </span>
      </mwc-list-item>
    </abbr>
    <abbr title="Not all fields of key identity-constraint '{http://www.iec.ch/61850/2003/SCL}SubstationKey' evaluate to a node.
invalid2007B:7 Substation key identity-constraint '{http://www.iec.ch/61850/2003/SCL}SubstationKey' (Element '{http://www.iec.ch/61850/2003/SCL}Substation')">
      <mwc-list-item twoline="">
        <span>
          Not all fields of key identity-constraint '{http://www.iec.ch/61850/2003/SCL}SubstationKey' evaluate to a node.
        </span>
        <span slot="secondary">
          invalid2007B:7 Substation key identity-constraint '{http://www.iec.ch/61850/2003/SCL}SubstationKey' (Element '{http://www.iec.ch/61850/2003/SCL}Substation')
        </span>
      </mwc-list-item>
    </abbr>
  </filtered-list>
  <mwc-button
    dialogaction="close"
    slot="primaryAction"
  >
    Close
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot ValidateSchema plugin for invalid SCL files pushes issues to the diagnostics pane that look like the latest snapshot */

