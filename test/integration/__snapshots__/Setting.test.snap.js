/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Setting upload .nsdoc file using event and looks like latest snapshot"] = 
`<mwc-dialog
  heading="Log"
  id="log"
>
  <mwc-icon-button-toggle
    id="infofilter"
    on=""
  >
  </mwc-icon-button-toggle>
  <mwc-icon-button-toggle
    id="warningfilter"
    on=""
  >
  </mwc-icon-button-toggle>
  <mwc-icon-button-toggle
    id="errorfilter"
    on=""
  >
  </mwc-icon-button-toggle>
  <mwc-icon-button-toggle
    id="actionfilter"
    on=""
  >
  </mwc-icon-button-toggle>
  <mwc-icon-button-toggle id="sclhistoryfilter">
  </mwc-icon-button-toggle>
  <mwc-list
    id="content"
    wrapfocus=""
  >
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="icon"
      mwc-list-item=""
      tabindex="0"
    >
      <span>
        Edits, errors, and other notifications will show up here.
      </span>
      <mwc-icon slot="graphic">
        info
      </mwc-icon>
    </mwc-list-item>
  </mwc-list>
  <mwc-button
    disabled=""
    icon="undo"
    label="Undo"
    slot="secondaryAction"
  >
  </mwc-button>
  <mwc-button
    disabled=""
    icon="redo"
    label="Redo"
    slot="secondaryAction"
  >
  </mwc-button>
  <mwc-button
    dialogaction="close"
    slot="primaryAction"
  >
    Close
  </mwc-button>
</mwc-dialog>
<mwc-dialog
  heading="Diagnostics"
  id="diagnostic"
>
  <filtered-list
    id="content"
    wrapfocus=""
  >
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="icon"
      mwc-list-item=""
      tabindex="0"
    >
      <span>
        Issues found during validation will show up here
      </span>
      <mwc-icon slot="graphic">
        info
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
  <mwc-button
    dialogaction="close"
    slot="primaryAction"
  >
    Close
  </mwc-button>
</mwc-dialog>
<mwc-snackbar
  id="info"
  labeltext="No errors"
  timeoutms="4000"
>
  <mwc-icon-button
    icon="close"
    slot="dismiss"
  >
  </mwc-icon-button>
</mwc-snackbar>
<mwc-snackbar
  id="warning"
  labeltext="No errors"
  timeoutms="6000"
>
  <mwc-button
    icon="history"
    slot="action"
  >
    Show
  </mwc-button>
  <mwc-icon-button
    icon="close"
    slot="dismiss"
  >
  </mwc-icon-button>
</mwc-snackbar>
<mwc-snackbar
  id="error"
  labeltext="No errors"
  timeoutms="10000"
>
  <mwc-button
    icon="history"
    slot="action"
  >
    Show
  </mwc-button>
  <mwc-icon-button
    icon="close"
    slot="dismiss"
  >
  </mwc-icon-button>
</mwc-snackbar>
<mwc-snackbar
  id="issue"
  labeltext="No errors"
  timeoutms="10000"
>
  <mwc-button
    icon="rule"
    slot="action"
  >
    Show
  </mwc-button>
  <mwc-icon-button
    icon="close"
    slot="dismiss"
  >
  </mwc-icon-button>
</mwc-snackbar>
<mwc-dialog
  heading="Settings"
  id="settings"
  open=""
>
  <form>
    <mwc-select
      fixedmenuposition=""
      icon="language"
      id="language"
      label="Language"
    >
      <mwc-list-item
        aria-disabled="false"
        aria-selected="true"
        graphic="icon"
        mwc-list-item=""
        role="option"
        selected=""
        tabindex="0"
        value="en"
      >
        English
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        graphic="icon"
        mwc-list-item=""
        role="option"
        tabindex="-1"
        value="de"
      >
        German (Deutsch)
      </mwc-list-item>
    </mwc-select>
    <mwc-formfield label="Dark theme">
      <mwc-switch id="dark">
      </mwc-switch>
    </mwc-formfield>
    <mwc-formfield label="Pro mode">
      <mwc-switch id="mode">
      </mwc-switch>
    </mwc-formfield>
    <mwc-formfield label="Show IEDs in substation editor">
      <mwc-switch id="showieds">
      </mwc-switch>
    </mwc-formfield>
  </form>
  <wizard-divider>
  </wizard-divider>
  <section>
    <h3>
      Uploaded NSDoc files
    </h3>
  </section>
  <mwc-list id="nsdocList">
    <mwc-list-item
      aria-disabled="false"
      graphic="avatar"
      hasmeta=""
      id="IEC 61850-7-2"
      mwc-list-item=""
      tabindex="0"
      twoline=""
    >
      <span>
        IEC 61850-7-2
      </span>
      <span slot="secondary">
        2007B3
      </span>
      <mwc-icon
        slot="graphic"
        style="color:green;"
      >
        done
      </mwc-icon>
      <mwc-icon
        id="deleteNsdocItem"
        slot="meta"
      >
        delete
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="avatar"
      hasmeta=""
      id="IEC 61850-7-3"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
    >
      <span>
        IEC 61850-7-3
      </span>
      <mwc-icon
        slot="graphic"
        style="color:red;"
      >
        close
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="avatar"
      hasmeta=""
      id="IEC 61850-7-4"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
    >
      <span>
        IEC 61850-7-4
      </span>
      <mwc-icon
        slot="graphic"
        style="color:red;"
      >
        close
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="avatar"
      hasmeta=""
      id="IEC 61850-8-1"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
    >
      <span>
        IEC 61850-8-1
      </span>
      <mwc-icon
        slot="graphic"
        style="color:red;"
      >
        close
      </mwc-icon>
    </mwc-list-item>
  </mwc-list>
  <mwc-button
    dialogaction="close"
    slot="secondaryAction"
  >
    Cancel
  </mwc-button>
  <mwc-button
    dialogaction="reset"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
    Reset
  </mwc-button>
  <mwc-button
    dialogaction="save"
    icon="save"
    slot="primaryAction"
    trailingicon=""
  >
    Save
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot Setting upload .nsdoc file using event and looks like latest snapshot */

