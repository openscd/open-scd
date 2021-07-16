# `finder-pane`

#### `displays nothing with default properties`

```html
<div>
</div>

```

## `given a path and a getChildren method`

####   `displays one list of children per path entry`

```html
<div>
  <section>
    <p>
      e2
    </p>
    <mwc-list>
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
    </mwc-list>
  </section>
  <section>
    <p>
      e1
    </p>
    <mwc-list>
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
    </mwc-list>
  </section>
  <section>
    <p>
      e4
    </p>
    <filtered-list searchfieldlabel="e4">
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
    </filtered-list>
  </section>
</div>

```

##   `when an entry in the last column is selected`

####     `appends a new column with the chosen entry's children`

```html
<div>
  <section>
    <p>
      e2
    </p>
    <mwc-list>
      <mwc-list-item mwc-list-item="">
        e3
      </mwc-list-item>
      <mwc-list-item
        activated=""
        mwc-list-item=""
      >
        e1
      </mwc-list-item>
    </mwc-list>
  </section>
  <section>
    <p>
      e1
    </p>
    <mwc-list>
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
    </mwc-list>
  </section>
  <section>
    <p>
      e4
    </p>
    <mwc-list>
      <mwc-list-item mwc-list-item="">
        e2
      </mwc-list-item>
      <mwc-list-item
        activated=""
        mwc-list-item=""
      >
        e3
      </mwc-list-item>
    </mwc-list>
  </section>
  <section>
    <p>
      e3
    </p>
  </section>
</div>

```

##   `when an entry in the first column is selected`

####     `replaces all but the first column with a new column`

```html
<div>
  <section>
    <p>
      e2
    </p>
    <mwc-list>
      <mwc-list-item
        activated=""
        mwc-list-item=""
      >
        e3
      </mwc-list-item>
      <mwc-list-item mwc-list-item="">
        e1
      </mwc-list-item>
    </mwc-list>
  </section>
  <section>
    <p>
      e3
    </p>
  </section>
</div>

```

