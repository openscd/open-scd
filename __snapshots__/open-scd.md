# `open-scd`

#### `looks like its snapshot`

```html
<mwc-drawer
  class="mdc-theme--surface"
  hasheader=""
  id="menu"
  type="modal"
>
  <span slot="title">
    Menu
  </span>
  <mwc-list wrapfocus="">
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      iconid="folder_open"
      mwc-list-item=""
      tabindex="0"
    >
      <mwc-icon slot="graphic">
        folder_open
      </mwc-icon>
      <span>
        Open project
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      iconid="create_new_folder"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        create_new_folder
      </mwc-icon>
      <span>
        New project
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="icon"
      iconid="save_alt"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        save_alt
      </mwc-icon>
      <span>
        Save
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="icon"
      iconid="save"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        save
      </mwc-icon>
      <span>
        Save as
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="icon"
      iconid="snippet_folder"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        snippet_folder
      </mwc-icon>
      <span>
        Import IED
      </span>
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="icon"
      iconid="undo"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        undo
      </mwc-icon>
      <span>
        Undo
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="icon"
      iconid="redo"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        redo
      </mwc-icon>
      <span>
        Redo
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="icon"
      iconid="rule_folder"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        rule_folder
      </mwc-icon>
      <span>
        Validate project
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      iconid="rule"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        rule
      </mwc-icon>
      <span>
        View log
      </span>
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="icon"
      iconid="play_circle"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        play_circle
      </mwc-icon>
      <span>
        Subscriber Update
      </span>
      <mwc-linear-progress indeterminate="">
      </mwc-linear-progress>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="icon"
      iconid="merge_type"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        merge_type
      </mwc-icon>
      <span>
        Merge Project
      </span>
      <mwc-linear-progress indeterminate="">
      </mwc-linear-progress>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="icon"
      iconid="merge_type"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        merge_type
      </mwc-icon>
      <span>
        Update Substation
      </span>
      <mwc-linear-progress indeterminate="">
      </mwc-linear-progress>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="icon"
      iconid="sync_alt"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        sync_alt
      </mwc-icon>
      <span>
        Communication Mapping
      </span>
      <mwc-linear-progress indeterminate="">
      </mwc-linear-progress>
    </mwc-list-item>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      iconid="settings"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        settings
      </mwc-icon>
      <span>
        Settings
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      iconid="extension"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        extension
      </mwc-icon>
      <span>
        Extensions
      </span>
    </mwc-list-item>
  </mwc-list>
  <mwc-top-app-bar-fixed slot="appContent">
    <mwc-icon-button
      icon="menu"
      label="Menu"
      slot="navigationIcon"
    >
    </mwc-icon-button>
    <div
      id="title"
      slot="title"
    >
    </div>
    <mwc-icon-button
      disabled=""
      icon="undo"
      label="undo"
      slot="actionItems"
    >
    </mwc-icon-button>
    <mwc-icon-button
      disabled=""
      icon="redo"
      label="redo"
      slot="actionItems"
    >
    </mwc-icon-button>
    <mwc-icon-button
      icon="rule"
      label="menu.viewLog"
      slot="actionItems"
    >
    </mwc-icon-button>
  </mwc-top-app-bar-fixed>
</mwc-drawer>
<mwc-dialog
  heading="Save as"
  id="saveas"
>
  <mwc-textfield
    dialoginitialfocus=""
    label="filename"
    value=""
  >
  </mwc-textfield>
  <mwc-button
    icon="save"
    slot="primaryAction"
  >
    Save
  </mwc-button>
  <mwc-button
    dialogaction="cancel"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
    Cancel
  </mwc-button>
</mwc-dialog>
<div class="landing">
  <mwc-icon-button
    class="landing_icon"
    icon="create_new_folder"
  >
    <div class="landing_label">
      New project
    </div>
  </mwc-icon-button>
  <mwc-icon-button
    class="landing_icon"
    icon="folder_open"
  >
    <div class="landing_label">
      Open project
    </div>
  </mwc-icon-button>
</div>
<input
  accept=".scd,.ssd"
  id="file-input"
  type="file"
>
<input
  accept=".icd,.iid,.cid"
  id="ied-import"
  type="file"
>
<mwc-dialog
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
<mwc-snackbar
  id="error"
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
  heading="Extensions"
  id="pluginManager"
  stacked=""
>
  <mwc-list
    activatable=""
    id="pluginList"
    multi=""
  >
    <mwc-list-item
      activated=""
      aria-disabled="false"
      graphic="icon"
      hasmeta=""
      mwc-list-item=""
      selected=""
      tabindex="0"
      value="/src/editors/Substation.js"
    >
      <mwc-icon slot="graphic">
        margin
      </mwc-icon>
      Substation
      <mwc-icon slot="meta">
        tab
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      activated=""
      aria-disabled="false"
      graphic="icon"
      hasmeta=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="/src/editors/Communication.js"
    >
      <mwc-icon slot="graphic">
        settings_ethernet
      </mwc-icon>
      Communication
      <mwc-icon slot="meta">
        tab
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      activated=""
      aria-disabled="false"
      graphic="icon"
      hasmeta=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="/src/editors/Templates.js"
    >
      <mwc-icon slot="graphic">
        copy_all
      </mwc-icon>
      Templates
      <mwc-icon slot="meta">
        tab
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      activated=""
      aria-disabled="false"
      graphic="icon"
      hasmeta=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="/src/triggered/SubscriberInfo.js"
    >
      <mwc-icon slot="graphic">
        play_circle
      </mwc-icon>
      Subscriber Update
      <mwc-icon slot="meta">
        play_circle
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      activated=""
      aria-disabled="false"
      graphic="icon"
      hasmeta=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="/src/triggered/Merge.js"
    >
      <mwc-icon slot="graphic">
        merge_type
      </mwc-icon>
      Merge Project
      <mwc-icon slot="meta">
        play_circle
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      activated=""
      aria-disabled="false"
      graphic="icon"
      hasmeta=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="/src/triggered/UpdateSubstation.js"
    >
      <mwc-icon slot="graphic">
        merge_type
      </mwc-icon>
      Update Substation
      <mwc-icon slot="meta">
        play_circle
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      activated=""
      aria-disabled="false"
      graphic="icon"
      hasmeta=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="/src/triggered/CommunicationMapping.js"
    >
      <mwc-icon slot="graphic">
        sync_alt
      </mwc-icon>
      Communication Mapping
      <mwc-icon slot="meta">
        play_circle
      </mwc-icon>
    </mwc-list-item>
  </mwc-list>
  <mwc-button
    icon="refresh"
    label="Reset"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="library_add"
    label="Add…"
    raised=""
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
<mwc-dialog
  heading="Add custom extension"
  id="pluginAdd"
>
  <div style="display: flex; flex-direction: column; row-gap: 8px;">
    <p style="color:var(--mdc-theme-error);">
      Here you may add remote extensions directly from a custom URL.
                You do this at your own risk.
    </p>
    <mwc-textfield
      helper="Your preferred extension name"
      id="pluginNameInput"
      label="Name"
      required=""
    >
    </mwc-textfield>
    <mwc-list id="pluginKindList">
      <mwc-radio-list-item
        aria-disabled="false"
        aria-selected="true"
        graphic="control"
        hasmeta=""
        left=""
        mwc-list-item=""
        selected=""
        tabindex="0"
        value="editor"
      >
        Editor pane
        <mwc-icon slot="meta">
          tab
        </mwc-icon>
      </mwc-radio-list-item>
      <mwc-radio-list-item
        aria-disabled="false"
        graphic="control"
        hasmeta=""
        left=""
        mwc-list-item=""
        tabindex="-1"
        value="triggered"
      >
        Menu entry
        <mwc-icon slot="meta">
          play_circle
        </mwc-icon>
      </mwc-radio-list-item>
    </mwc-list>
    <mwc-textfield
      helper="The vendor supplied extension URL"
      id="pluginSrcInput"
      label="URL"
      placeholder="http://example.com/plugin.js"
      required=""
      type="url"
    >
    </mwc-textfield>
  </div>
  <mwc-button
    dialogaction="close"
    label="Cancel"
    slot="secondaryAction"
  >
  </mwc-button>
  <mwc-button
    icon="add"
    label="Add"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
<mwc-circular-progress-four-color
  closed=""
  density="0"
  indeterminate=""
  progress="0"
>
</mwc-circular-progress-four-color>
<wizard-dialog>
</wizard-dialog>
<mwc-dialog
  heading="Settings"
  id="settings"
>
  <form>
    <mwc-select
      icon="language"
      id="language"
      label="Language"
      naturalmenuwidth=""
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
  </form>
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

```

