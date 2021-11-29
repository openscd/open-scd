# `voltage-level-editor`

#### `looks like the latest snapshot`

```html
<action-pane
  label="E1 - Voltage Level
    (110.0 kV)"
  tabindex="0"
>
  <abbr
    slot="action"
    title="[lnode.tooltip]"
  >
    <mwc-icon-button icon="account_tree">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="action"
    title="[duplicate]"
  >
    <mwc-icon-button icon="content_copy">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="action"
    title="[edit]"
  >
    <mwc-icon-button icon="edit">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="action"
    title="[move]"
  >
    <mwc-icon-button icon="forward">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="action"
    title="[remove]"
  >
    <mwc-icon-button icon="delete">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="action"
    style="position:relative;"
    title="[add]"
  >
    <mwc-icon-button icon="playlist_add">
    </mwc-icon-button>
    <mwc-menu
      corner="BOTTOM_RIGHT"
      menucorner="END"
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="menuitem"
        tabindex="0"
        value="LNode"
      >
        <span>
          LNode
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="menuitem"
        tabindex="-1"
        value="Bay"
      >
        <span>
          Bay
        </span>
      </mwc-list-item>
    </mwc-menu>
  </abbr>
  <div id="bayContainer">
    <bay-editor>
    </bay-editor>
    <bay-editor>
    </bay-editor>
  </div>
</action-pane>

```

## `with readonly property`

####   `looks like the latest snapshot`

```html
<action-pane
  label="E1 - Voltage Level
    (110.0 kV)"
  tabindex="0"
>
  <abbr
    slot="action"
    title="[lnode.tooltip]"
  >
    <mwc-icon-button icon="account_tree">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="action"
    title="[duplicate]"
  >
    <mwc-icon-button icon="content_copy">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="action"
    title="[edit]"
  >
    <mwc-icon-button icon="edit">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="action"
    title="[move]"
  >
    <mwc-icon-button icon="forward">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="action"
    title="[remove]"
  >
    <mwc-icon-button icon="delete">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="action"
    style="position:relative;"
    title="[add]"
  >
    <mwc-icon-button icon="playlist_add">
    </mwc-icon-button>
    <mwc-menu
      corner="BOTTOM_RIGHT"
      menucorner="END"
    >
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="menuitem"
        tabindex="0"
        value="LNode"
      >
        <span>
          LNode
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        role="menuitem"
        tabindex="-1"
        value="Bay"
      >
        <span>
          Bay
        </span>
      </mwc-list-item>
    </mwc-menu>
  </abbr>
  <div id="bayContainer">
    <bay-editor readonly="">
    </bay-editor>
    <bay-editor readonly="">
    </bay-editor>
  </div>
</action-pane>

```

