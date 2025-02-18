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
        data-name="New project"
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
      <li
        divider=""
        padded=""
        role="separator"
      >
      </li>
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
        class="bottom"
        data-name="Plugin Store"
        graphic="icon"
        iconid="create_new_folder"
        mwc-list-item=""
        tabindex="-1"
      >
        <mwc-icon slot="graphic">
          create_new_folder
        </mwc-icon>
        <span>
          Plugin Store
        </span>
      </mwc-list-item>
      <oscd-plugin4df09ef1590edfb6 class="menu plugin">
      </oscd-plugin4df09ef1590edfb6>
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
        data-name="New project"
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
      <li
        divider=""
        padded=""
        role="separator"
      >
      </li>
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
        class="bottom"
        data-name="Plugin Store"
        graphic="icon"
        iconid="create_new_folder"
        mwc-list-item=""
        tabindex="-1"
      >
        <mwc-icon slot="graphic">
          create_new_folder
        </mwc-icon>
        <span>
          Plugin Store
        </span>
      </mwc-list-item>
      <oscd-plugin4df09ef1590edfb6 class="menu plugin">
      </oscd-plugin4df09ef1590edfb6>
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
        data-name="New project"
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
      <li
        divider=""
        padded=""
        role="separator"
      >
      </li>
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
        class="bottom"
        data-name="Plugin Store"
        graphic="icon"
        iconid="create_new_folder"
        mwc-list-item=""
        tabindex="-1"
      >
        <mwc-icon slot="graphic">
          create_new_folder
        </mwc-icon>
        <span>
          Plugin Store
        </span>
      </mwc-list-item>
      <oscd-plugin4df09ef1590edfb6 class="menu plugin">
      </oscd-plugin4df09ef1590edfb6>
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
  <oscd-plugin-manager id="pluginManager">
  </oscd-plugin-manager>
  <oscd-custom-plugin-dialog id="pluginAdd">
  </oscd-custom-plugin-dialog>
</div>
`;
/* end snapshot open-scd layout looks like its snapshot */

