# `voltage-level-editor`

#### `looks like the latest snapshot`

```html
<editor-container header="E1 - Voltage Level
    (110.0 kV)">
  <abbr
    slot="header"
    title="[lnode.tooltip]"
  >
    <mwc-icon-button icon="account_tree">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[duplicate]"
  >
    <mwc-icon-button icon="content_copy">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[edit]"
  >
    <mwc-icon-button icon="edit">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[move]"
  >
    <mwc-icon-button icon="forward">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[remove]"
  >
    <mwc-icon-button icon="delete">
    </mwc-icon-button>
  </abbr>
  <div
    id="bayContainer"
    slot="container"
  >
    <bay-editor>
    </bay-editor>
    <bay-editor>
    </bay-editor>
  </div>
</editor-container>

```

## `with ied connected to the voltage level`

####   `looks like the latest snapshot`

```html
<editor-container header="E1 - Voltage Level
    (110.0 kV)">
  <abbr
    slot="header"
    title="[lnode.tooltip]"
  >
    <mwc-icon-button icon="account_tree">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[duplicate]"
  >
    <mwc-icon-button icon="content_copy">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[edit]"
  >
    <mwc-icon-button icon="edit">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[move]"
  >
    <mwc-icon-button icon="forward">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[remove]"
  >
    <mwc-icon-button icon="delete">
    </mwc-icon-button>
  </abbr>
  <div
    id="iedcontainer"
    slot="container"
  >
    <ied-editor>
    </ied-editor>
  </div>
  <div
    id="bayContainer"
    slot="container"
  >
    <bay-editor>
    </bay-editor>
    <bay-editor>
    </bay-editor>
  </div>
</editor-container>

```

## ``with function filter deactivated shows connected Function`s in the VoltageLevel``

####   `looks like the latest snapshot`

```html
<editor-container header="AA1 - Substation
    (110.0 kV)">
  <abbr
    slot="header"
    title="[lnode.tooltip]"
  >
    <mwc-icon-button icon="account_tree">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[duplicate]"
  >
    <mwc-icon-button icon="content_copy">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[edit]"
  >
    <mwc-icon-button icon="edit">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[move]"
  >
    <mwc-icon-button icon="forward">
    </mwc-icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[remove]"
  >
    <mwc-icon-button icon="delete">
    </mwc-icon-button>
  </abbr>
  <div
    id="funcContainer"
    slot="container"
  >
    <function-editor>
    </function-editor>
  </div>
  <div
    id="bayContainer"
    slot="container"
  >
  </div>
</editor-container>

```

