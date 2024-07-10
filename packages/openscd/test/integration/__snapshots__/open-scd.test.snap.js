/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["open-scd looks like its snapshot"] = 
`<oscd-waiter>
  <oscd-settings>
    <oscd-wizards>
      <oscd-history>
        <oscd-editor>
          <oscd-layout>
          </oscd-layout>
        </oscd-editor>
      </oscd-history>
    </oscd-wizards>
  </oscd-settings>
</oscd-waiter>
`;
/* end snapshot open-scd looks like its snapshot */

snapshots["open-scd renders menu plugins passed down as props and it looks like its snapshot"] = 
`<slot>
</slot>
<mwc-top-app-bar-fixed>
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
    icon="list"
    label="menu.viewLog"
    slot="actionItems"
  >
  </mwc-icon-button>
  <mwc-icon-button
    icon="history"
    label="menu.viewHistory"
    slot="actionItems"
  >
  </mwc-icon-button>
  <mwc-icon-button
    icon="rule"
    label="menu.viewDiag"
    slot="actionItems"
  >
  </mwc-icon-button>
</mwc-top-app-bar-fixed>
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
      class="top"
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
    <oscd-plugind0b9863131b4146e class="menu plugin">
    </oscd-plugind0b9863131b4146e>
    <mwc-list-item
      aria-disabled="false"
      class="top"
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
    <oscd-plugin9b4f3043bce10a59 class="menu plugin">
    </oscd-plugin9b4f3043bce10a59>
    <mwc-list-item
      aria-disabled="true"
      class="top"
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
        Save project
      </span>
    </mwc-list-item>
    <oscd-pluginf3b6b19f30371924 class="menu plugin">
    </oscd-pluginf3b6b19f30371924>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="true"
      class="validator"
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
        Validate Schema
      </span>
    </mwc-list-item>
    <oscd-plugin8126aea23c207f03 class="plugin validator">
    </oscd-plugin8126aea23c207f03>
    <mwc-list-item
      aria-disabled="true"
      class="validator"
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
        Validate Templates
      </span>
    </mwc-list-item>
    <oscd-pluginb7f7ea2822da160b class="plugin validator">
    </oscd-pluginb7f7ea2822da160b>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
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
        Import IEDs
      </span>
    </mwc-list-item>
    <oscd-plugin164035de870e3ce2 class="menu plugin">
    </oscd-plugin164035de870e3ce2>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
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
    </mwc-list-item>
    <oscd-plugin73c7200b70bd16a6 class="menu plugin">
    </oscd-plugin73c7200b70bd16a6>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
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
    </mwc-list-item>
    <oscd-plugin96a38f00c3583f5a class="menu plugin">
    </oscd-plugin96a38f00c3583f5a>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
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
    </mwc-list-item>
    <oscd-plugind42cb104caa5b137 class="menu plugin">
    </oscd-plugind42cb104caa5b137>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
      disabled=""
      graphic="icon"
      iconid="compare_arrows"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        compare_arrows
      </mwc-icon>
      <span>
        Compare IED
      </span>
    </mwc-list-item>
    <oscd-plugin531256cb341ab97e class="menu plugin">
    </oscd-plugin531256cb341ab97e>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      class="static"
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
      class="middle"
      graphic="icon"
      iconid="help"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        help
      </mwc-icon>
      <span>
        Help
      </span>
    </mwc-list-item>
    <oscd-plugin6589bc97026c833d class="menu plugin">
    </oscd-plugin6589bc97026c833d>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
      disabled=""
      graphic="icon"
      iconid="history_toggle_off"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        history_toggle_off
      </mwc-icon>
      <span>
        Show SCL History
      </span>
    </mwc-list-item>
    <oscd-plugin70e8eaeb84bf47f6 class="menu plugin">
    </oscd-plugin70e8eaeb84bf47f6>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      class="static"
      graphic="icon"
      iconid="extension"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        extension
      </mwc-icon>
      <span>
        Plug-ins
      </span>
    </mwc-list-item>
  </mwc-list>
</mwc-drawer>
<div class="landing">
  <mwc-icon-button
    class="landing_icon"
    icon="folder_open"
  >
    <div class="landing_label">
      Open project
    </div>
  </mwc-icon-button>
  <mwc-icon-button
    class="landing_icon"
    icon="create_new_folder"
  >
    <div class="landing_label">
      New project
    </div>
  </mwc-icon-button>
</div>
<mwc-dialog
  heading="Plug-ins"
  id="pluginManager"
  stacked=""
>
  <mwc-list
    id="pluginList"
    multi=""
  >
    <mwc-list-item
      aria-disabled="false"
      graphic="avatar"
      noninteractive=""
      tabindex="-1"
    >
      <strong>
        Editor tab
      </strong>
      <mwc-icon
        class="inverted"
        slot="graphic"
      >
        tab
      </mwc-icon>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="0"
      value="http://localhost:8000/plugins/src/editors/IED.js"
    >
      <mwc-icon slot="meta">
        developer_board
      </mwc-icon>
      IED
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Substation.js"
    >
      <mwc-icon slot="meta">
        margin
      </mwc-icon>
      Substation
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/SingleLineDiagram.js"
    >
      <mwc-icon slot="meta">
        edit
      </mwc-icon>
      Single Line Diagram
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/GooseSubscriberMessageBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Message Binding (GOOSE)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/GooseSubscriberDataBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Data Binding (GOOSE)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/GooseSubscriberLaterBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Later Binding (GOOSE)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/SMVSubscriberMessageBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Message Binding (SMV)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/SMVSubscriberDataBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Data Binding (SMV)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/SMVSubscriberLaterBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Later Binding (SMV)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Communication.js"
    >
      <mwc-icon slot="meta">
        settings_ethernet
      </mwc-icon>
      Communication
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Protocol104.js"
    >
      <mwc-icon slot="meta">
        settings_ethernet
      </mwc-icon>
      104
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Templates.js"
    >
      <mwc-icon slot="meta">
        copy_all
      </mwc-icon>
      Templates
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Publisher.js"
    >
      <mwc-icon slot="meta">
        publish
      </mwc-icon>
      Publisher
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Cleanup.js"
    >
      <mwc-icon slot="meta">
        cleaning_services
      </mwc-icon>
      Cleanup
    </mwc-check-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="avatar"
      noninteractive=""
      tabindex="-1"
    >
      <strong>
        Menu entry
      </strong>
      <mwc-icon
        class="inverted"
        slot="graphic"
      >
        <strong>
          play_circle
        </strong>
      </mwc-icon>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/OpenProject.js"
    >
      <mwc-icon slot="meta">
        folder_open
      </mwc-icon>
      Open project
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/NewProject.js"
    >
      <mwc-icon slot="meta">
        create_new_folder
      </mwc-icon>
      New project
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="https://mockup-plugin.url/plugin-top.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Top Mock Plugin
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/SaveProject.js"
    >
      <mwc-icon slot="meta">
        save
      </mwc-icon>
      Save project
    </mwc-check-list-item>
    <li
      divider=""
      inset=""
      role="separator"
    >
    </li>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/validators/ValidateSchema.js"
    >
      <mwc-icon slot="meta">
        rule_folder
      </mwc-icon>
      Validate Schema
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/validators/ValidateTemplates.js"
    >
      <mwc-icon slot="meta">
        rule_folder
      </mwc-icon>
      Validate Templates
    </mwc-check-list-item>
    <li
      divider=""
      inset=""
      role="separator"
    >
    </li>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="https://mockup-plugin.url/plugin-middle.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Middle Mock Plugin
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/ImportIEDs.js"
    >
      <mwc-icon slot="meta">
        snippet_folder
      </mwc-icon>
      Import IEDs
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/VirtualTemplateIED.js"
    >
      <mwc-icon slot="meta">
        developer_board
      </mwc-icon>
      Create Virtual IED
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/SubscriberInfo.js"
    >
      <mwc-icon slot="meta">
        play_circle
      </mwc-icon>
      Subscriber Update
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/UpdateDescriptionABB.js"
    >
      <mwc-icon slot="meta">
        play_circle
      </mwc-icon>
      Update desc (ABB)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/UpdateDescriptionSEL.js"
    >
      <mwc-icon slot="meta">
        play_circle
      </mwc-icon>
      Update desc (SEL)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/Merge.js"
    >
      <mwc-icon slot="meta">
        merge_type
      </mwc-icon>
      Merge Project
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/UpdateSubstation.js"
    >
      <mwc-icon slot="meta">
        merge_type
      </mwc-icon>
      Update Substation
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/CompareIED.js"
    >
      <mwc-icon slot="meta">
        compare_arrows
      </mwc-icon>
      Compare IED
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/ExportCommunication.js"
    >
      <mwc-icon slot="meta">
        sim_card_download
      </mwc-icon>
      Export Communication Section
    </mwc-check-list-item>
    <li
      divider=""
      inset=""
      role="separator"
    >
    </li>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/Help.js"
    >
      <mwc-icon slot="meta">
        help
      </mwc-icon>
      Help
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="https://mockup-plugin.url/plugin-bottom.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Bottom Mock Plugin
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/SclHistory.js"
    >
      <mwc-icon slot="meta">
        history_toggle_off
      </mwc-icon>
      Show SCL History
    </mwc-check-list-item>
  </mwc-list>
  <mwc-button
    icon="refresh"
    label="Reset"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    dialogaction="close"
    icon=""
    label="Close"
    slot="secondaryAction"
  >
  </mwc-button>
  <mwc-button
    icon="library_add"
    label="Add custom plug-in…"
    outlined=""
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
<mwc-dialog
  heading="Add custom plug-in"
  id="pluginAdd"
>
  <div style="display: flex; flex-direction: column; row-gap: 8px;">
    <p style="color:var(--mdc-theme-error);">
      Here you may add remote plug-ins directly from a custom URL.
                You do this at your own risk.
    </p>
    <mwc-textfield
      helper="Your preferred plug-in name"
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
        id="editor"
        left=""
        mwc-list-item=""
        selected=""
        tabindex="0"
        value="editor"
      >
        Editor tab
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
        value="menu"
      >
        Menu entry
        <mwc-icon slot="meta">
          play_circle
        </mwc-icon>
      </mwc-radio-list-item>
      <div id="menudetails">
        <mwc-formfield
          id="enabledefault"
          label="Requires loaded document"
        >
          <mwc-switch
            checked=""
            id="requireDoc"
          >
          </mwc-switch>
        </mwc-formfield>
        <mwc-select
          fixedmenuposition=""
          id="menuPosition"
          value="middle"
        >
          <mwc-list-item
            aria-disabled="false"
            mwc-list-item=""
            role="option"
            tabindex="-1"
            value="top"
          >
            top
          </mwc-list-item>
          <mwc-list-item
            aria-disabled="false"
            mwc-list-item=""
            role="option"
            tabindex="-1"
            value="middle"
          >
            middle
          </mwc-list-item>
          <mwc-list-item
            aria-disabled="false"
            mwc-list-item=""
            role="option"
            tabindex="-1"
            value="bottom"
          >
            bottom
          </mwc-list-item>
        </mwc-select>
      </div>
      <mwc-radio-list-item
        aria-disabled="false"
        graphic="control"
        hasmeta=""
        id="validator"
        left=""
        mwc-list-item=""
        tabindex="-1"
        value="validator"
      >
        Validator
        <mwc-icon slot="meta">
          rule_folder
        </mwc-icon>
      </mwc-radio-list-item>
    </mwc-list>
    <mwc-textfield
      helper="The vendor supplied plug-in URL"
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
`;
/* end snapshot open-scd renders menu plugins passed down as props and it looks like its snapshot */

snapshots["open-scd renders editor plugins passed down as props and it looks like its snapshot"] = 
`<slot>
</slot>
<mwc-top-app-bar-fixed>
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
    icon="list"
    label="menu.viewLog"
    slot="actionItems"
  >
  </mwc-icon-button>
  <mwc-icon-button
    icon="history"
    label="menu.viewHistory"
    slot="actionItems"
  >
  </mwc-icon-button>
  <mwc-icon-button
    icon="rule"
    label="menu.viewDiag"
    slot="actionItems"
  >
  </mwc-icon-button>
</mwc-top-app-bar-fixed>
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
      class="top"
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
    <oscd-plugind0b9863131b4146e class="menu plugin">
    </oscd-plugind0b9863131b4146e>
    <mwc-list-item
      aria-disabled="false"
      class="top"
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
    <oscd-plugin9b4f3043bce10a59 class="menu plugin">
    </oscd-plugin9b4f3043bce10a59>
    <mwc-list-item
      aria-disabled="true"
      class="top"
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
        Save project
      </span>
    </mwc-list-item>
    <oscd-pluginf3b6b19f30371924 class="menu plugin">
    </oscd-pluginf3b6b19f30371924>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="true"
      class="validator"
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
        Validate Schema
      </span>
    </mwc-list-item>
    <oscd-plugin8126aea23c207f03 class="plugin validator">
    </oscd-plugin8126aea23c207f03>
    <mwc-list-item
      aria-disabled="true"
      class="validator"
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
        Validate Templates
      </span>
    </mwc-list-item>
    <oscd-pluginb7f7ea2822da160b class="plugin validator">
    </oscd-pluginb7f7ea2822da160b>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
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
        Import IEDs
      </span>
    </mwc-list-item>
    <oscd-plugin164035de870e3ce2 class="menu plugin">
    </oscd-plugin164035de870e3ce2>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
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
    </mwc-list-item>
    <oscd-plugin73c7200b70bd16a6 class="menu plugin">
    </oscd-plugin73c7200b70bd16a6>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
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
    </mwc-list-item>
    <oscd-plugin96a38f00c3583f5a class="menu plugin">
    </oscd-plugin96a38f00c3583f5a>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
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
    </mwc-list-item>
    <oscd-plugind42cb104caa5b137 class="menu plugin">
    </oscd-plugind42cb104caa5b137>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
      disabled=""
      graphic="icon"
      iconid="compare_arrows"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        compare_arrows
      </mwc-icon>
      <span>
        Compare IED
      </span>
    </mwc-list-item>
    <oscd-plugin531256cb341ab97e class="menu plugin">
    </oscd-plugin531256cb341ab97e>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      class="static"
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
      class="middle"
      graphic="icon"
      iconid="help"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        help
      </mwc-icon>
      <span>
        Help
      </span>
    </mwc-list-item>
    <oscd-plugin6589bc97026c833d class="menu plugin">
    </oscd-plugin6589bc97026c833d>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
      disabled=""
      graphic="icon"
      iconid="history_toggle_off"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        history_toggle_off
      </mwc-icon>
      <span>
        Show SCL History
      </span>
    </mwc-list-item>
    <oscd-plugin70e8eaeb84bf47f6 class="menu plugin">
    </oscd-plugin70e8eaeb84bf47f6>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      class="static"
      graphic="icon"
      iconid="extension"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        extension
      </mwc-icon>
      <span>
        Plug-ins
      </span>
    </mwc-list-item>
  </mwc-list>
</mwc-drawer>
<div class="landing">
  <mwc-icon-button
    class="landing_icon"
    icon="folder_open"
  >
    <div class="landing_label">
      Open project
    </div>
  </mwc-icon-button>
  <mwc-icon-button
    class="landing_icon"
    icon="create_new_folder"
  >
    <div class="landing_label">
      New project
    </div>
  </mwc-icon-button>
</div>
<mwc-dialog
  heading="Plug-ins"
  id="pluginManager"
  stacked=""
>
  <mwc-list
    id="pluginList"
    multi=""
  >
    <mwc-list-item
      aria-disabled="false"
      graphic="avatar"
      noninteractive=""
      tabindex="-1"
    >
      <strong>
        Editor tab
      </strong>
      <mwc-icon
        class="inverted"
        slot="graphic"
      >
        tab
      </mwc-icon>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="0"
      value="http://localhost:8000/plugins/src/editors/IED.js"
    >
      <mwc-icon slot="meta">
        developer_board
      </mwc-icon>
      IED
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Substation.js"
    >
      <mwc-icon slot="meta">
        margin
      </mwc-icon>
      Substation
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/SingleLineDiagram.js"
    >
      <mwc-icon slot="meta">
        edit
      </mwc-icon>
      Single Line Diagram
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/GooseSubscriberMessageBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Message Binding (GOOSE)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/GooseSubscriberDataBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Data Binding (GOOSE)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/GooseSubscriberLaterBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Later Binding (GOOSE)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/SMVSubscriberMessageBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Message Binding (SMV)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/SMVSubscriberDataBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Data Binding (SMV)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/SMVSubscriberLaterBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Later Binding (SMV)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Communication.js"
    >
      <mwc-icon slot="meta">
        settings_ethernet
      </mwc-icon>
      Communication
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Protocol104.js"
    >
      <mwc-icon slot="meta">
        settings_ethernet
      </mwc-icon>
      104
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Templates.js"
    >
      <mwc-icon slot="meta">
        copy_all
      </mwc-icon>
      Templates
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Publisher.js"
    >
      <mwc-icon slot="meta">
        publish
      </mwc-icon>
      Publisher
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Cleanup.js"
    >
      <mwc-icon slot="meta">
        cleaning_services
      </mwc-icon>
      Cleanup
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="https://mockup-plugin.url/editor-plugin.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Mock Editor Plugin
    </mwc-check-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="avatar"
      noninteractive=""
      tabindex="-1"
    >
      <strong>
        Menu entry
      </strong>
      <mwc-icon
        class="inverted"
        slot="graphic"
      >
        <strong>
          play_circle
        </strong>
      </mwc-icon>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/OpenProject.js"
    >
      <mwc-icon slot="meta">
        folder_open
      </mwc-icon>
      Open project
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/NewProject.js"
    >
      <mwc-icon slot="meta">
        create_new_folder
      </mwc-icon>
      New project
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/SaveProject.js"
    >
      <mwc-icon slot="meta">
        save
      </mwc-icon>
      Save project
    </mwc-check-list-item>
    <li
      divider=""
      inset=""
      role="separator"
    >
    </li>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/validators/ValidateSchema.js"
    >
      <mwc-icon slot="meta">
        rule_folder
      </mwc-icon>
      Validate Schema
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/validators/ValidateTemplates.js"
    >
      <mwc-icon slot="meta">
        rule_folder
      </mwc-icon>
      Validate Templates
    </mwc-check-list-item>
    <li
      divider=""
      inset=""
      role="separator"
    >
    </li>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/ImportIEDs.js"
    >
      <mwc-icon slot="meta">
        snippet_folder
      </mwc-icon>
      Import IEDs
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/VirtualTemplateIED.js"
    >
      <mwc-icon slot="meta">
        developer_board
      </mwc-icon>
      Create Virtual IED
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/SubscriberInfo.js"
    >
      <mwc-icon slot="meta">
        play_circle
      </mwc-icon>
      Subscriber Update
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/UpdateDescriptionABB.js"
    >
      <mwc-icon slot="meta">
        play_circle
      </mwc-icon>
      Update desc (ABB)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/UpdateDescriptionSEL.js"
    >
      <mwc-icon slot="meta">
        play_circle
      </mwc-icon>
      Update desc (SEL)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/Merge.js"
    >
      <mwc-icon slot="meta">
        merge_type
      </mwc-icon>
      Merge Project
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/UpdateSubstation.js"
    >
      <mwc-icon slot="meta">
        merge_type
      </mwc-icon>
      Update Substation
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/CompareIED.js"
    >
      <mwc-icon slot="meta">
        compare_arrows
      </mwc-icon>
      Compare IED
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/ExportCommunication.js"
    >
      <mwc-icon slot="meta">
        sim_card_download
      </mwc-icon>
      Export Communication Section
    </mwc-check-list-item>
    <li
      divider=""
      inset=""
      role="separator"
    >
    </li>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/Help.js"
    >
      <mwc-icon slot="meta">
        help
      </mwc-icon>
      Help
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/SclHistory.js"
    >
      <mwc-icon slot="meta">
        history_toggle_off
      </mwc-icon>
      Show SCL History
    </mwc-check-list-item>
  </mwc-list>
  <mwc-button
    icon="refresh"
    label="Reset"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    dialogaction="close"
    icon=""
    label="Close"
    slot="secondaryAction"
  >
  </mwc-button>
  <mwc-button
    icon="library_add"
    label="Add custom plug-in…"
    outlined=""
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
<mwc-dialog
  heading="Add custom plug-in"
  id="pluginAdd"
>
  <div style="display: flex; flex-direction: column; row-gap: 8px;">
    <p style="color:var(--mdc-theme-error);">
      Here you may add remote plug-ins directly from a custom URL.
                You do this at your own risk.
    </p>
    <mwc-textfield
      helper="Your preferred plug-in name"
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
        id="editor"
        left=""
        mwc-list-item=""
        selected=""
        tabindex="0"
        value="editor"
      >
        Editor tab
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
        value="menu"
      >
        Menu entry
        <mwc-icon slot="meta">
          play_circle
        </mwc-icon>
      </mwc-radio-list-item>
      <div id="menudetails">
        <mwc-formfield
          id="enabledefault"
          label="Requires loaded document"
        >
          <mwc-switch
            checked=""
            id="requireDoc"
          >
          </mwc-switch>
        </mwc-formfield>
        <mwc-select
          fixedmenuposition=""
          id="menuPosition"
          value="middle"
        >
          <mwc-list-item
            aria-disabled="false"
            mwc-list-item=""
            role="option"
            tabindex="-1"
            value="top"
          >
            top
          </mwc-list-item>
          <mwc-list-item
            aria-disabled="false"
            mwc-list-item=""
            role="option"
            tabindex="-1"
            value="middle"
          >
            middle
          </mwc-list-item>
          <mwc-list-item
            aria-disabled="false"
            mwc-list-item=""
            role="option"
            tabindex="-1"
            value="bottom"
          >
            bottom
          </mwc-list-item>
        </mwc-select>
      </div>
      <mwc-radio-list-item
        aria-disabled="false"
        graphic="control"
        hasmeta=""
        id="validator"
        left=""
        mwc-list-item=""
        tabindex="-1"
        value="validator"
      >
        Validator
        <mwc-icon slot="meta">
          rule_folder
        </mwc-icon>
      </mwc-radio-list-item>
    </mwc-list>
    <mwc-textfield
      helper="The vendor supplied plug-in URL"
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
`;
/* end snapshot open-scd renders editor plugins passed down as props and it looks like its snapshot */

snapshots["open-scd layout looks like its snapshot"] = 
`<slot>
</slot>
<mwc-top-app-bar-fixed>
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
    icon="list"
    label="menu.viewLog"
    slot="actionItems"
  >
  </mwc-icon-button>
  <mwc-icon-button
    icon="history"
    label="menu.viewHistory"
    slot="actionItems"
  >
  </mwc-icon-button>
  <mwc-icon-button
    icon="rule"
    label="menu.viewDiag"
    slot="actionItems"
  >
  </mwc-icon-button>
</mwc-top-app-bar-fixed>
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
      class="top"
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
    <oscd-plugind0b9863131b4146e class="menu plugin">
    </oscd-plugind0b9863131b4146e>
    <mwc-list-item
      aria-disabled="false"
      class="top"
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
    <oscd-plugin9b4f3043bce10a59 class="menu plugin">
    </oscd-plugin9b4f3043bce10a59>
    <mwc-list-item
      aria-disabled="true"
      class="top"
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
        Save project
      </span>
    </mwc-list-item>
    <oscd-pluginf3b6b19f30371924 class="menu plugin">
    </oscd-pluginf3b6b19f30371924>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="true"
      class="validator"
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
        Validate Schema
      </span>
    </mwc-list-item>
    <oscd-plugin8126aea23c207f03 class="plugin validator">
    </oscd-plugin8126aea23c207f03>
    <mwc-list-item
      aria-disabled="true"
      class="validator"
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
        Validate Templates
      </span>
    </mwc-list-item>
    <oscd-pluginb7f7ea2822da160b class="plugin validator">
    </oscd-pluginb7f7ea2822da160b>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
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
        Import IEDs
      </span>
    </mwc-list-item>
    <oscd-plugin164035de870e3ce2 class="menu plugin">
    </oscd-plugin164035de870e3ce2>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
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
    </mwc-list-item>
    <oscd-plugin73c7200b70bd16a6 class="menu plugin">
    </oscd-plugin73c7200b70bd16a6>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
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
    </mwc-list-item>
    <oscd-plugin96a38f00c3583f5a class="menu plugin">
    </oscd-plugin96a38f00c3583f5a>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
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
    </mwc-list-item>
    <oscd-plugind42cb104caa5b137 class="menu plugin">
    </oscd-plugind42cb104caa5b137>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
      disabled=""
      graphic="icon"
      iconid="compare_arrows"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        compare_arrows
      </mwc-icon>
      <span>
        Compare IED
      </span>
    </mwc-list-item>
    <oscd-plugin531256cb341ab97e class="menu plugin">
    </oscd-plugin531256cb341ab97e>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      class="static"
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
      class="middle"
      graphic="icon"
      iconid="help"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        help
      </mwc-icon>
      <span>
        Help
      </span>
    </mwc-list-item>
    <oscd-plugin6589bc97026c833d class="menu plugin">
    </oscd-plugin6589bc97026c833d>
    <mwc-list-item
      aria-disabled="true"
      class="middle"
      disabled=""
      graphic="icon"
      iconid="history_toggle_off"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        history_toggle_off
      </mwc-icon>
      <span>
        Show SCL History
      </span>
    </mwc-list-item>
    <oscd-plugin70e8eaeb84bf47f6 class="menu plugin">
    </oscd-plugin70e8eaeb84bf47f6>
    <li
      divider=""
      padded=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      class="static"
      graphic="icon"
      iconid="extension"
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
        extension
      </mwc-icon>
      <span>
        Plug-ins
      </span>
    </mwc-list-item>
  </mwc-list>
</mwc-drawer>
<div class="landing">
  <mwc-icon-button
    class="landing_icon"
    icon="folder_open"
  >
    <div class="landing_label">
      Open project
    </div>
  </mwc-icon-button>
  <mwc-icon-button
    class="landing_icon"
    icon="create_new_folder"
  >
    <div class="landing_label">
      New project
    </div>
  </mwc-icon-button>
</div>
<mwc-dialog
  heading="Plug-ins"
  id="pluginManager"
  stacked=""
>
  <mwc-list
    id="pluginList"
    multi=""
  >
    <mwc-list-item
      aria-disabled="false"
      graphic="avatar"
      noninteractive=""
      tabindex="-1"
    >
      <strong>
        Editor tab
      </strong>
      <mwc-icon
        class="inverted"
        slot="graphic"
      >
        tab
      </mwc-icon>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="0"
      value="http://localhost:8000/plugins/src/editors/IED.js"
    >
      <mwc-icon slot="meta">
        developer_board
      </mwc-icon>
      IED
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Substation.js"
    >
      <mwc-icon slot="meta">
        margin
      </mwc-icon>
      Substation
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/SingleLineDiagram.js"
    >
      <mwc-icon slot="meta">
        edit
      </mwc-icon>
      Single Line Diagram
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/GooseSubscriberMessageBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Message Binding (GOOSE)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/GooseSubscriberDataBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Data Binding (GOOSE)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/GooseSubscriberLaterBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Later Binding (GOOSE)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/SMVSubscriberMessageBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Message Binding (SMV)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/SMVSubscriberDataBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Data Binding (SMV)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/SMVSubscriberLaterBinding.js"
    >
      <mwc-icon slot="meta">
        link
      </mwc-icon>
      Subscriber Later Binding (SMV)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Communication.js"
    >
      <mwc-icon slot="meta">
        settings_ethernet
      </mwc-icon>
      Communication
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Protocol104.js"
    >
      <mwc-icon slot="meta">
        settings_ethernet
      </mwc-icon>
      104
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Templates.js"
    >
      <mwc-icon slot="meta">
        copy_all
      </mwc-icon>
      Templates
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Publisher.js"
    >
      <mwc-icon slot="meta">
        publish
      </mwc-icon>
      Publisher
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/editors/Cleanup.js"
    >
      <mwc-icon slot="meta">
        cleaning_services
      </mwc-icon>
      Cleanup
    </mwc-check-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="avatar"
      noninteractive=""
      tabindex="-1"
    >
      <strong>
        Menu entry
      </strong>
      <mwc-icon
        class="inverted"
        slot="graphic"
      >
        <strong>
          play_circle
        </strong>
      </mwc-icon>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/OpenProject.js"
    >
      <mwc-icon slot="meta">
        folder_open
      </mwc-icon>
      Open project
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/NewProject.js"
    >
      <mwc-icon slot="meta">
        create_new_folder
      </mwc-icon>
      New project
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/SaveProject.js"
    >
      <mwc-icon slot="meta">
        save
      </mwc-icon>
      Save project
    </mwc-check-list-item>
    <li
      divider=""
      inset=""
      role="separator"
    >
    </li>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/validators/ValidateSchema.js"
    >
      <mwc-icon slot="meta">
        rule_folder
      </mwc-icon>
      Validate Schema
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/validators/ValidateTemplates.js"
    >
      <mwc-icon slot="meta">
        rule_folder
      </mwc-icon>
      Validate Templates
    </mwc-check-list-item>
    <li
      divider=""
      inset=""
      role="separator"
    >
    </li>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/ImportIEDs.js"
    >
      <mwc-icon slot="meta">
        snippet_folder
      </mwc-icon>
      Import IEDs
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/VirtualTemplateIED.js"
    >
      <mwc-icon slot="meta">
        developer_board
      </mwc-icon>
      Create Virtual IED
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/SubscriberInfo.js"
    >
      <mwc-icon slot="meta">
        play_circle
      </mwc-icon>
      Subscriber Update
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/UpdateDescriptionABB.js"
    >
      <mwc-icon slot="meta">
        play_circle
      </mwc-icon>
      Update desc (ABB)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/UpdateDescriptionSEL.js"
    >
      <mwc-icon slot="meta">
        play_circle
      </mwc-icon>
      Update desc (SEL)
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/Merge.js"
    >
      <mwc-icon slot="meta">
        merge_type
      </mwc-icon>
      Merge Project
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/UpdateSubstation.js"
    >
      <mwc-icon slot="meta">
        merge_type
      </mwc-icon>
      Update Substation
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/CompareIED.js"
    >
      <mwc-icon slot="meta">
        compare_arrows
      </mwc-icon>
      Compare IED
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/ExportCommunication.js"
    >
      <mwc-icon slot="meta">
        sim_card_download
      </mwc-icon>
      Export Communication Section
    </mwc-check-list-item>
    <li
      divider=""
      inset=""
      role="separator"
    >
    </li>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/Help.js"
    >
      <mwc-icon slot="meta">
        help
      </mwc-icon>
      Help
    </mwc-check-list-item>
    <mwc-check-list-item
      aria-disabled="false"
      class="official"
      graphic="control"
      hasmeta=""
      left=""
      mwc-list-item=""
      selected=""
      tabindex="-1"
      value="http://localhost:8000/plugins/src/menu/SclHistory.js"
    >
      <mwc-icon slot="meta">
        history_toggle_off
      </mwc-icon>
      Show SCL History
    </mwc-check-list-item>
  </mwc-list>
  <mwc-button
    icon="refresh"
    label="Reset"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    dialogaction="close"
    icon=""
    label="Close"
    slot="secondaryAction"
  >
  </mwc-button>
  <mwc-button
    icon="library_add"
    label="Add custom plug-in…"
    outlined=""
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
<mwc-dialog
  heading="Add custom plug-in"
  id="pluginAdd"
>
  <div style="display: flex; flex-direction: column; row-gap: 8px;">
    <p style="color:var(--mdc-theme-error);">
      Here you may add remote plug-ins directly from a custom URL.
                You do this at your own risk.
    </p>
    <mwc-textfield
      helper="Your preferred plug-in name"
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
        id="editor"
        left=""
        mwc-list-item=""
        selected=""
        tabindex="0"
        value="editor"
      >
        Editor tab
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
        value="menu"
      >
        Menu entry
        <mwc-icon slot="meta">
          play_circle
        </mwc-icon>
      </mwc-radio-list-item>
      <div id="menudetails">
        <mwc-formfield
          id="enabledefault"
          label="Requires loaded document"
        >
          <mwc-switch
            checked=""
            id="requireDoc"
          >
          </mwc-switch>
        </mwc-formfield>
        <mwc-select
          fixedmenuposition=""
          id="menuPosition"
          value="middle"
        >
          <mwc-list-item
            aria-disabled="false"
            mwc-list-item=""
            role="option"
            tabindex="-1"
            value="top"
          >
            top
          </mwc-list-item>
          <mwc-list-item
            activated=""
            aria-disabled="false"
            aria-selected="true"
            mwc-list-item=""
            role="option"
            selected=""
            tabindex="0"
            value="middle"
          >
            middle
          </mwc-list-item>
          <mwc-list-item
            aria-disabled="false"
            mwc-list-item=""
            role="option"
            tabindex="-1"
            value="bottom"
          >
            bottom
          </mwc-list-item>
        </mwc-select>
      </div>
      <mwc-radio-list-item
        aria-disabled="false"
        graphic="control"
        hasmeta=""
        id="validator"
        left=""
        mwc-list-item=""
        tabindex="-1"
        value="validator"
      >
        Validator
        <mwc-icon slot="meta">
          rule_folder
        </mwc-icon>
      </mwc-radio-list-item>
    </mwc-list>
    <mwc-textfield
      helper="The vendor supplied plug-in URL"
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
`;
/* end snapshot open-scd layout looks like its snapshot */

