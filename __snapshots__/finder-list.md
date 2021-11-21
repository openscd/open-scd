# `finder-list`

## `given a .path and a .read method`

##   `when provided with .getTitle and .getDisplayString methods`

####     `looks like its latest snapshot`

```html
<div class="pane">
  <div class="column">
    <h2>
      e2
    </h2>
    <filtered-list searchfieldlabel="Testing e2">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e3"
      >
        Testing 1 e3
      </list-item>
      <list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e1"
      >
        Testing 1 e1
      </list-item>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e1
    </h2>
    <filtered-list searchfieldlabel="Testing e1">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e2"
      >
        Testing 2 e2
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e3"
      >
        Testing 2 e3
      </list-item>
      <list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e4"
      >
        Testing 2 e4
      </list-item>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e4
    </h2>
    <filtered-list searchfieldlabel="Testing e4">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e2"
      >
        Testing 3 e2
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e1"
      >
        Testing 3 e1
      </list-item>
    </filtered-list>
  </div>
</div>

```

##   `when an item in the last column is selected`

####     `looks like its latest snapshot`

```html
<div class="pane">
  <div class="column">
    <h2>
      e2
    </h2>
    <filtered-list searchfieldlabel="e2">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e3"
      >
        e3
      </list-item>
      <list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e1"
      >
        e1
      </list-item>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e1
    </h2>
    <filtered-list searchfieldlabel="e2/e1">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e2"
      >
        e2
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e3"
      >
        e3
      </list-item>
      <list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e4"
      >
        e4
      </list-item>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e4
    </h2>
    <filtered-list searchfieldlabel="e2/e1/e4">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e2"
      >
        e2
      </list-item>
      <list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e1"
      >
        e1
      </list-item>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e1
    </h2>
    <filtered-list searchfieldlabel="e2/e1/e4/e1">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e2"
      >
        e2
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e3"
      >
        e3
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e4"
      >
        e4
      </list-item>
    </filtered-list>
  </div>
</div>

```

##   `when an item in the first column is selected`

####     `looks like its latest snapshot`

```html
<div class="pane">
  <div class="column">
    <h2>
      e2
    </h2>
    <filtered-list searchfieldlabel="e2">
      <list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e3"
      >
        e3
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e1"
      >
        e1
      </list-item>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e3
    </h2>
    <filtered-list searchfieldlabel="e2/e3">
    </filtered-list>
  </div>
</div>

```

##   `when the selected item in the first column is deselected`

####     `looks like its latest snapshot`

```html
<div class="pane">
  <div class="column">
    <h2>
      e2
    </h2>
    <filtered-list searchfieldlabel="e2">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e3"
      >
        e3
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e1"
      >
        e1
      </list-item>
    </filtered-list>
  </div>
</div>

```

## `given the "multi" attribute, some .paths, and a .read method`

####   `looks like its latest snapshot`

```html
<div class="pane">
  <div class="column">
    <h2>
      e2
    </h2>
    <filtered-list searchfieldlabel="e2">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e3"
      >
        e3
      </list-item>
      <list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e1"
      >
        e1
      </list-item>
    </filtered-list>
    <h2>
      e1
    </h2>
    <filtered-list searchfieldlabel="e1">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e2"
      >
        e2
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e3"
      >
        e3
      </list-item>
      <list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e4"
      >
        e4
      </list-item>
    </filtered-list>
    <h2>
      e3
    </h2>
    <filtered-list searchfieldlabel="e3">
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e1
    </h2>
    <filtered-list searchfieldlabel="e2/e1">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e2"
      >
        e2
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e3"
      >
        e3
      </list-item>
      <list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e4"
      >
        e4
      </list-item>
    </filtered-list>
    <h2>
      e4
    </h2>
    <filtered-list searchfieldlabel="e1/e4">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e2"
      >
        e2
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e1"
      >
        e1
      </list-item>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e4
    </h2>
    <filtered-list searchfieldlabel="e2/e1/e4">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e2"
      >
        e2
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e1"
      >
        e1
      </list-item>
    </filtered-list>
  </div>
</div>

```

##   `when an item in the first column is selected`

####     `looks like its latest snapshot`

```html
<div class="pane">
  <div class="column">
    <h2>
      e2
    </h2>
    <filtered-list searchfieldlabel="e2">
      <list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e3"
      >
        e3
      </list-item>
      <list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e1"
      >
        e1
      </list-item>
    </filtered-list>
    <h2>
      e1
    </h2>
    <filtered-list searchfieldlabel="e1">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e2"
      >
        e2
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e3"
      >
        e3
      </list-item>
      <list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e4"
      >
        e4
      </list-item>
    </filtered-list>
    <h2>
      e3
    </h2>
    <filtered-list searchfieldlabel="e3">
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e1
    </h2>
    <filtered-list searchfieldlabel="e2/e1">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e2"
      >
        e2
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e3"
      >
        e3
      </list-item>
      <list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e4"
      >
        e4
      </list-item>
    </filtered-list>
    <h2>
      e3
    </h2>
    <filtered-list searchfieldlabel="e2/e3">
    </filtered-list>
    <h2>
      e4
    </h2>
    <filtered-list searchfieldlabel="e1/e4">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e2"
      >
        e2
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e1"
      >
        e1
      </list-item>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e4
    </h2>
    <filtered-list searchfieldlabel="e2/e1/e4">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e2"
      >
        e2
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e1"
      >
        e1
      </list-item>
    </filtered-list>
  </div>
</div>

```

##   `when a selected item in the first column is deselected`

####     `looks like its latest snapshot`

```html
<div class="pane">
  <div class="column">
    <h2>
      e2
    </h2>
    <filtered-list searchfieldlabel="e2">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e3"
      >
        e3
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e1"
      >
        e1
      </list-item>
    </filtered-list>
    <h2>
      e1
    </h2>
    <filtered-list searchfieldlabel="e1">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e2"
      >
        e2
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e3"
      >
        e3
      </list-item>
      <list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e4"
      >
        e4
      </list-item>
    </filtered-list>
    <h2>
      e3
    </h2>
    <filtered-list searchfieldlabel="e3">
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e4
    </h2>
    <filtered-list searchfieldlabel="e1/e4">
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        value="e2"
      >
        e2
      </list-item>
      <list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        value="e1"
      >
        e1
      </list-item>
    </filtered-list>
  </div>
</div>

```

