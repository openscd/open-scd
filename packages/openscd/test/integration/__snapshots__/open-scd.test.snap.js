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
`<div>
  <slot>
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
        data-name="Open project"
        data-src="http://localhost:8000/plugins/src/menu/OpenProject.js"
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
        class="top"
        data-name="New project"
        data-src="http://localhost:8000/plugins/src/menu/NewProject.js"
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
        class="top"
        data-name="Save project"
        data-src="http://localhost:8000/plugins/src/menu/SaveProject.js"
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
      <li
        divider=""
        padded=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="true"
        class="validator"
        data-name="Validate Schema"
        data-src="http://localhost:8000/plugins/src/validators/ValidateSchema.js"
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
      <mwc-list-item
        aria-disabled="true"
        class="validator"
        data-name="Validate Templates"
        data-src="http://localhost:8000/plugins/src/validators/ValidateTemplates.js"
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
      <li
        divider=""
        padded=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="true"
        class="middle"
        data-name="Import IEDs"
        data-src="http://localhost:8000/plugins/src/menu/ImportIEDs.js"
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
      <mwc-list-item
        aria-disabled="true"
        class="middle"
        data-name="Subscriber Update"
        data-src="http://localhost:8000/plugins/src/menu/SubscriberInfo.js"
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
      <mwc-list-item
        aria-disabled="true"
        class="middle"
        data-name="Merge Project"
        data-src="http://localhost:8000/plugins/src/menu/Merge.js"
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
      <mwc-list-item
        aria-disabled="true"
        class="middle"
        data-name="Update Substation"
        data-src="http://localhost:8000/plugins/src/menu/UpdateSubstation.js"
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
      <mwc-list-item
        aria-disabled="true"
        class="middle"
        data-name="Compare IED"
        data-src="http://localhost:8000/plugins/src/menu/CompareIED.js"
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
      <li
        divider=""
        padded=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        class="static"
        data-name="settings.title"
        data-src=""
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
        aria-disabled="true"
        class="bottom"
        data-name="Show SCL History"
        data-src="http://localhost:8000/plugins/src/menu/SclHistory.js"
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
      <mwc-list-item
        aria-disabled="false"
        class="bottom"
        data-name="Help"
        data-src="http://localhost:8000/plugins/src/menu/Help.js"
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
      <li
        divider=""
        padded=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        class="static"
        data-name="plugins.heading"
        data-src=""
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
  <div id="menuContent">
    <oscd-plugind0b9863131b4146e class="menu plugin">
    </oscd-plugind0b9863131b4146e>
    <oscd-plugin9b4f3043bce10a59 class="menu plugin">
    </oscd-plugin9b4f3043bce10a59>
    <oscd-pluginf3b6b19f30371924 class="menu plugin">
    </oscd-pluginf3b6b19f30371924>
    <oscd-plugin8126aea23c207f03 class="plugin validator">
    </oscd-plugin8126aea23c207f03>
    <oscd-pluginb7f7ea2822da160b class="plugin validator">
    </oscd-pluginb7f7ea2822da160b>
    <oscd-plugin164035de870e3ce2 class="menu plugin">
    </oscd-plugin164035de870e3ce2>
    <oscd-plugin73c7200b70bd16a6 class="menu plugin">
    </oscd-plugin73c7200b70bd16a6>
    <oscd-plugin96a38f00c3583f5a class="menu plugin">
    </oscd-plugin96a38f00c3583f5a>
    <oscd-plugind42cb104caa5b137 class="menu plugin">
    </oscd-plugind42cb104caa5b137>
    <oscd-plugin531256cb341ab97e class="menu plugin">
    </oscd-plugin531256cb341ab97e>
    <oscd-plugin70e8eaeb84bf47f6 class="menu plugin">
    </oscd-plugin70e8eaeb84bf47f6>
    <oscd-plugin6589bc97026c833d class="menu plugin">
    </oscd-plugin6589bc97026c833d>
  </div>
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
  <oscd-plugin-manager id="pluginManager">
  </oscd-plugin-manager>
  <oscd-custom-plugin-dialog id="pluginAdd">
  </oscd-custom-plugin-dialog>
</div>
`;
/* end snapshot open-scd renders menu plugins passed down as props and it looks like its snapshot */

snapshots["open-scd renders editor plugins passed down as props and it looks like its snapshot"] = 
`<div>
  <slot>
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
        data-name="Open project"
        data-src="http://localhost:8000/plugins/src/menu/OpenProject.js"
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
        class="top"
        data-name="New project"
        data-src="http://localhost:8000/plugins/src/menu/NewProject.js"
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
        class="top"
        data-name="Save project"
        data-src="http://localhost:8000/plugins/src/menu/SaveProject.js"
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
      <li
        divider=""
        padded=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="true"
        class="validator"
        data-name="Validate Schema"
        data-src="http://localhost:8000/plugins/src/validators/ValidateSchema.js"
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
      <mwc-list-item
        aria-disabled="true"
        class="validator"
        data-name="Validate Templates"
        data-src="http://localhost:8000/plugins/src/validators/ValidateTemplates.js"
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
      <li
        divider=""
        padded=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="true"
        class="middle"
        data-name="Import IEDs"
        data-src="http://localhost:8000/plugins/src/menu/ImportIEDs.js"
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
      <mwc-list-item
        aria-disabled="true"
        class="middle"
        data-name="Subscriber Update"
        data-src="http://localhost:8000/plugins/src/menu/SubscriberInfo.js"
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
      <mwc-list-item
        aria-disabled="true"
        class="middle"
        data-name="Merge Project"
        data-src="http://localhost:8000/plugins/src/menu/Merge.js"
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
      <mwc-list-item
        aria-disabled="true"
        class="middle"
        data-name="Update Substation"
        data-src="http://localhost:8000/plugins/src/menu/UpdateSubstation.js"
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
      <mwc-list-item
        aria-disabled="true"
        class="middle"
        data-name="Compare IED"
        data-src="http://localhost:8000/plugins/src/menu/CompareIED.js"
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
      <li
        divider=""
        padded=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        class="static"
        data-name="settings.title"
        data-src=""
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
        aria-disabled="true"
        class="bottom"
        data-name="Show SCL History"
        data-src="http://localhost:8000/plugins/src/menu/SclHistory.js"
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
      <mwc-list-item
        aria-disabled="false"
        class="bottom"
        data-name="Help"
        data-src="http://localhost:8000/plugins/src/menu/Help.js"
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
      <li
        divider=""
        padded=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        class="static"
        data-name="plugins.heading"
        data-src=""
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
  <div id="menuContent">
    <oscd-plugind0b9863131b4146e class="menu plugin">
    </oscd-plugind0b9863131b4146e>
    <oscd-plugin9b4f3043bce10a59 class="menu plugin">
    </oscd-plugin9b4f3043bce10a59>
    <oscd-pluginf3b6b19f30371924 class="menu plugin">
    </oscd-pluginf3b6b19f30371924>
    <oscd-plugin8126aea23c207f03 class="plugin validator">
    </oscd-plugin8126aea23c207f03>
    <oscd-pluginb7f7ea2822da160b class="plugin validator">
    </oscd-pluginb7f7ea2822da160b>
    <oscd-plugin164035de870e3ce2 class="menu plugin">
    </oscd-plugin164035de870e3ce2>
    <oscd-plugin73c7200b70bd16a6 class="menu plugin">
    </oscd-plugin73c7200b70bd16a6>
    <oscd-plugin96a38f00c3583f5a class="menu plugin">
    </oscd-plugin96a38f00c3583f5a>
    <oscd-plugind42cb104caa5b137 class="menu plugin">
    </oscd-plugind42cb104caa5b137>
    <oscd-plugin531256cb341ab97e class="menu plugin">
    </oscd-plugin531256cb341ab97e>
    <oscd-plugin70e8eaeb84bf47f6 class="menu plugin">
    </oscd-plugin70e8eaeb84bf47f6>
    <oscd-plugin6589bc97026c833d class="menu plugin">
    </oscd-plugin6589bc97026c833d>
  </div>
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
  <oscd-plugin-manager id="pluginManager">
  </oscd-plugin-manager>
  <oscd-custom-plugin-dialog id="pluginAdd">
  </oscd-custom-plugin-dialog>
</div>
`;
/* end snapshot open-scd renders editor plugins passed down as props and it looks like its snapshot */

snapshots["open-scd layout looks like its snapshot"] = 
`<div>
  <slot>
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
        data-name="Open project"
        data-src="http://localhost:8000/plugins/src/menu/OpenProject.js"
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
        class="top"
        data-name="New project"
        data-src="http://localhost:8000/plugins/src/menu/NewProject.js"
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
        class="top"
        data-name="Save project"
        data-src="http://localhost:8000/plugins/src/menu/SaveProject.js"
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
      <li
        divider=""
        padded=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="true"
        class="validator"
        data-name="Validate Schema"
        data-src="http://localhost:8000/plugins/src/validators/ValidateSchema.js"
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
      <mwc-list-item
        aria-disabled="true"
        class="validator"
        data-name="Validate Templates"
        data-src="http://localhost:8000/plugins/src/validators/ValidateTemplates.js"
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
      <li
        divider=""
        padded=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="true"
        class="middle"
        data-name="Import IEDs"
        data-src="http://localhost:8000/plugins/src/menu/ImportIEDs.js"
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
      <mwc-list-item
        aria-disabled="true"
        class="middle"
        data-name="Subscriber Update"
        data-src="http://localhost:8000/plugins/src/menu/SubscriberInfo.js"
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
      <mwc-list-item
        aria-disabled="true"
        class="middle"
        data-name="Merge Project"
        data-src="http://localhost:8000/plugins/src/menu/Merge.js"
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
      <mwc-list-item
        aria-disabled="true"
        class="middle"
        data-name="Update Substation"
        data-src="http://localhost:8000/plugins/src/menu/UpdateSubstation.js"
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
      <mwc-list-item
        aria-disabled="true"
        class="middle"
        data-name="Compare IED"
        data-src="http://localhost:8000/plugins/src/menu/CompareIED.js"
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
      <li
        divider=""
        padded=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        class="static"
        data-name="settings.title"
        data-src=""
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
        aria-disabled="true"
        class="bottom"
        data-name="Show SCL History"
        data-src="http://localhost:8000/plugins/src/menu/SclHistory.js"
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
      <mwc-list-item
        aria-disabled="false"
        class="bottom"
        data-name="Help"
        data-src="http://localhost:8000/plugins/src/menu/Help.js"
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
      <li
        divider=""
        padded=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        class="static"
        data-name="plugins.heading"
        data-src=""
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
  <div id="menuContent">
    <oscd-plugind0b9863131b4146e class="menu plugin">
    </oscd-plugind0b9863131b4146e>
    <oscd-plugin9b4f3043bce10a59 class="menu plugin">
    </oscd-plugin9b4f3043bce10a59>
    <oscd-pluginf3b6b19f30371924 class="menu plugin">
    </oscd-pluginf3b6b19f30371924>
    <oscd-plugin8126aea23c207f03 class="plugin validator">
    </oscd-plugin8126aea23c207f03>
    <oscd-pluginb7f7ea2822da160b class="plugin validator">
    </oscd-pluginb7f7ea2822da160b>
    <oscd-plugin164035de870e3ce2 class="menu plugin">
    </oscd-plugin164035de870e3ce2>
    <oscd-plugin73c7200b70bd16a6 class="menu plugin">
    </oscd-plugin73c7200b70bd16a6>
    <oscd-plugin96a38f00c3583f5a class="menu plugin">
    </oscd-plugin96a38f00c3583f5a>
    <oscd-plugind42cb104caa5b137 class="menu plugin">
    </oscd-plugind42cb104caa5b137>
    <oscd-plugin531256cb341ab97e class="menu plugin">
    </oscd-plugin531256cb341ab97e>
    <oscd-plugin70e8eaeb84bf47f6 class="menu plugin">
    </oscd-plugin70e8eaeb84bf47f6>
    <oscd-plugin6589bc97026c833d class="menu plugin">
    </oscd-plugin6589bc97026c833d>
  </div>
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
  <oscd-plugin-manager id="pluginManager">
  </oscd-plugin-manager>
  <oscd-custom-plugin-dialog id="pluginAdd">
  </oscd-custom-plugin-dialog>
</div>
`;
/* end snapshot open-scd layout looks like its snapshot */

