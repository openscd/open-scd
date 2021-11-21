# `voltage-level-editor`

#### `looks like the latest snapshot`

```html
<editor-container
  header="E1 - Voltage Level
    (110.0 kV)"
  tabindex="0"
>
  <abbr
    slot="header"
    title="[lnode.tooltip]"
  >
    <icon-button icon="account_tree">
    </icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[duplicate]"
  >
    <icon-button icon="content_copy">
    </icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[edit]"
  >
    <icon-button icon="edit">
    </icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[move]"
  >
    <icon-button icon="forward">
    </icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[remove]"
  >
    <icon-button icon="delete">
    </icon-button>
  </abbr>
  <div id="bayContainer">
    <bay-editor>
    </bay-editor>
    <bay-editor>
    </bay-editor>
  </div>
</editor-container>

```

## `with readonly property`

####   `looks like the latest snapshot`

```html
<editor-container
  header="E1 - Voltage Level
    (110.0 kV)"
  tabindex="0"
>
  <abbr
    slot="header"
    title="[lnode.tooltip]"
  >
    <icon-button icon="account_tree">
    </icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[duplicate]"
  >
    <icon-button icon="content_copy">
    </icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[edit]"
  >
    <icon-button icon="edit">
    </icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[move]"
  >
    <icon-button icon="forward">
    </icon-button>
  </abbr>
  <abbr
    slot="header"
    title="[remove]"
  >
    <icon-button icon="delete">
    </icon-button>
  </abbr>
  <div id="bayContainer">
    <bay-editor readonly="">
    </bay-editor>
    <bay-editor readonly="">
    </bay-editor>
  </div>
</editor-container>

```

