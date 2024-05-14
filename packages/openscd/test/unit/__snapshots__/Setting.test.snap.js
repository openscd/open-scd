/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["OSCD-Settings enables/shows the upload .nsdoc file button by default"] = 
`<mwc-dialog
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
  <section id="shownsdbutton">
    <h3>
      Uploaded NSDoc files
    </h3>
    <input
      accept=".nsdoc"
      hidden=""
      id="nsdoc-file"
      multiple=""
      required=""
      type="file"
    >
    <mwc-button
      id="selectFileButton"
      label="Select file"
    >
    </mwc-button>
  </section>
  <mwc-list id="nsdocList">
    <mwc-list-item
      aria-disabled="true"
      disabled=""
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
<slot>
</slot>
`;
/* end snapshot OSCD-Settings enables/shows the upload .nsdoc file button by default */

snapshots["OSCD-Settings disables/hides the upload .nsdoc file button"] = 
`<mwc-dialog
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
  <mwc-list id="nsdocList">
    <mwc-list-item
      aria-disabled="true"
      disabled=""
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
<slot>
</slot>
`;
/* end snapshot OSCD-Settings disables/hides the upload .nsdoc file button */

snapshots["OSCD-Settings saves chosen .nsdoc file and looks like latest snapshot"] = 
`<mwc-dialog
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
  <section id="shownsdbutton">
    <h3>
      Uploaded NSDoc files
    </h3>
    <input
      accept=".nsdoc"
      hidden=""
      id="nsdoc-file"
      multiple=""
      required=""
      type="file"
    >
    <mwc-button
      id="selectFileButton"
      label="Select file"
    >
    </mwc-button>
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
<slot>
</slot>
`;
/* end snapshot OSCD-Settings saves chosen .nsdoc file and looks like latest snapshot */

snapshots["OSCD-Settings deletes a chosen .nsdoc file and looks like latest snapshot"] = 
`<mwc-dialog
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
  <section id="shownsdbutton">
    <h3>
      Uploaded NSDoc files
    </h3>
    <input
      accept=".nsdoc"
      hidden=""
      id="nsdoc-file"
      multiple=""
      required=""
      type="file"
    >
    <mwc-button
      id="selectFileButton"
      label="Select file"
    >
    </mwc-button>
  </section>
  <mwc-list id="nsdocList">
    <mwc-list-item
      aria-disabled="true"
      aria-selected="true"
      disabled=""
      graphic="avatar"
      hasmeta=""
      id="IEC 61850-7-2"
      mwc-list-item=""
      selected=""
      tabindex="0"
      twoline=""
    >
      <span>
        IEC 61850-7-2
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
<slot>
</slot>
`;
/* end snapshot OSCD-Settings deletes a chosen .nsdoc file and looks like latest snapshot */

