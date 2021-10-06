# `finder-list`

## `given a .path and a .read method`

##   `when an item in the last column is selected`

####     `looks like its latest snapshot`

```html
<div class="pane">
  <div class="column">
    <h2>
      e2
    </h2>
    <filtered-list>
      <mwc-list-item mwc-list-item="">
        e3
      </mwc-list-item>
      <mwc-list-item
        activated=""
        mwc-list-item=""
      >
        e1
      </mwc-list-item>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e1
    </h2>
    <filtered-list>
      <mwc-list-item mwc-list-item="">
        e2
      </mwc-list-item>
      <mwc-list-item mwc-list-item="">
        e3
      </mwc-list-item>
      <mwc-list-item
        activated=""
        mwc-list-item=""
      >
        e4
      </mwc-list-item>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e4
    </h2>
    <filtered-list>
      <mwc-list-item mwc-list-item="">
        e2
      </mwc-list-item>
      <mwc-list-item
        activated=""
        mwc-list-item=""
      >
        e1
      </mwc-list-item>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e1
    </h2>
    <filtered-list>
      <mwc-list-item mwc-list-item="">
        e2
      </mwc-list-item>
      <mwc-list-item mwc-list-item="">
        e3
      </mwc-list-item>
      <mwc-list-item mwc-list-item="">
        e4
      </mwc-list-item>
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
    <filtered-list>
      <mwc-list-item
        activated=""
        mwc-list-item=""
      >
        e3
      </mwc-list-item>
      <mwc-list-item mwc-list-item="">
        e1
      </mwc-list-item>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e3
    </h2>
    <filtered-list>
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
    <filtered-list>
      <mwc-list-item mwc-list-item="">
        e3
      </mwc-list-item>
      <mwc-list-item mwc-list-item="">
        e1
      </mwc-list-item>
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
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
      >
        e3
      </mwc-list-item>
      <mwc-list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
      >
        e1
      </mwc-list-item>
    </filtered-list>
    <h2>
      e1
    </h2>
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
      >
        e2
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
      >
        e3
      </mwc-list-item>
      <mwc-list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
      >
        e4
      </mwc-list-item>
    </filtered-list>
    <h2>
      e3
    </h2>
    <filtered-list>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e1
    </h2>
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
      >
        e2
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
      >
        e3
      </mwc-list-item>
      <mwc-list-item
        activated=""
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
      >
        e4
      </mwc-list-item>
    </filtered-list>
    <h2>
      e4
    </h2>
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
      >
        e2
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
      >
        e1
      </mwc-list-item>
    </filtered-list>
    <h2>
      e3
    </h2>
    <filtered-list>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e4
    </h2>
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
      >
        e2
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
      >
        e1
      </mwc-list-item>
    </filtered-list>
    <h2>
      e4
    </h2>
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
      >
        e2
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
      >
        e1
      </mwc-list-item>
    </filtered-list>
    <h2>
      e3
    </h2>
    <filtered-list>
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
    <filtered-list>
      <mwc-list-item
        activated=""
        mwc-list-item=""
      >
        e3
      </mwc-list-item>
      <mwc-list-item
        activated=""
        mwc-list-item=""
      >
        e1
      </mwc-list-item>
    </filtered-list>
    <h2>
      e1
    </h2>
    <filtered-list>
      <mwc-list-item mwc-list-item="">
        e2
      </mwc-list-item>
      <mwc-list-item mwc-list-item="">
        e3
      </mwc-list-item>
      <mwc-list-item
        activated=""
        mwc-list-item=""
      >
        e4
      </mwc-list-item>
    </filtered-list>
    <h2>
      e3
    </h2>
    <filtered-list>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e1
    </h2>
    <filtered-list>
      <mwc-list-item mwc-list-item="">
        e2
      </mwc-list-item>
      <mwc-list-item mwc-list-item="">
        e3
      </mwc-list-item>
      <mwc-list-item
        activated=""
        mwc-list-item=""
      >
        e4
      </mwc-list-item>
    </filtered-list>
    <h2>
      e3
    </h2>
    <filtered-list>
    </filtered-list>
    <h2>
      e4
    </h2>
    <filtered-list>
      <mwc-list-item mwc-list-item="">
        e2
      </mwc-list-item>
      <mwc-list-item mwc-list-item="">
        e1
      </mwc-list-item>
    </filtered-list>
    <h2>
      e3
    </h2>
    <filtered-list>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e4
    </h2>
    <filtered-list>
      <mwc-list-item mwc-list-item="">
        e2
      </mwc-list-item>
      <mwc-list-item mwc-list-item="">
        e1
      </mwc-list-item>
    </filtered-list>
    <h2>
      e3
    </h2>
    <filtered-list>
    </filtered-list>
    <h2>
      e4
    </h2>
    <filtered-list>
      <mwc-list-item mwc-list-item="">
        e2
      </mwc-list-item>
      <mwc-list-item mwc-list-item="">
        e1
      </mwc-list-item>
    </filtered-list>
    <h2>
      e3
    </h2>
    <filtered-list>
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
    <filtered-list>
      <mwc-list-item mwc-list-item="">
        e3
      </mwc-list-item>
      <mwc-list-item mwc-list-item="">
        e1
      </mwc-list-item>
    </filtered-list>
    <h2>
      e1
    </h2>
    <filtered-list>
      <mwc-list-item mwc-list-item="">
        e2
      </mwc-list-item>
      <mwc-list-item mwc-list-item="">
        e3
      </mwc-list-item>
      <mwc-list-item
        activated=""
        mwc-list-item=""
      >
        e4
      </mwc-list-item>
    </filtered-list>
    <h2>
      e3
    </h2>
    <filtered-list>
    </filtered-list>
  </div>
  <div class="column">
    <h2>
      e2
    </h2>
    <filtered-list>
      <mwc-list-item mwc-list-item="">
        e3
      </mwc-list-item>
      <mwc-list-item mwc-list-item="">
        e1
      </mwc-list-item>
    </filtered-list>
    <h2>
      e4
    </h2>
    <filtered-list>
      <mwc-list-item mwc-list-item="">
        e2
      </mwc-list-item>
      <mwc-list-item mwc-list-item="">
        e1
      </mwc-list-item>
    </filtered-list>
    <h2>
      e3
    </h2>
    <filtered-list>
    </filtered-list>
  </div>
</div>

```

