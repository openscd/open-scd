# `compas-open`

## `when-type-needs-to-be-selected`

####   `looks like the latest snapshot`

```html
<compas-divider>
</compas-divider>
<section>
  <h3>
    [compas.open.localTitle]
  </h3>
  <input
    accept=".sed,.scd,.ssd,.isd,.iid,.cid,.icd"
    hidden=""
    id="scl-file"
    required=""
    type="file"
  >
  <mwc-button label="[compas.open.selectFileButton]">
  </mwc-button>
</section>
<compas-divider>
</compas-divider>
<section>
  <h3>
    [compas.open.compasTitle]
  </h3>
  <p>
    [compas.open.listSclTypes]
  </p>
  <compas-scltype-list>
  </compas-scltype-list>
</section>

```

## `when-project-needs-to-be-selected`

####   `looks like the latest snapshot`

```html
<compas-divider>
</compas-divider>
<section>
  <h3>
    [compas.open.localTitle]
  </h3>
  <input
    accept=".sed,.scd,.ssd,.isd,.iid,.cid,.icd"
    hidden=""
    id="scl-file"
    required=""
    type="file"
  >
  <mwc-button label="[compas.open.selectFileButton]">
  </mwc-button>
</section>
<compas-divider>
</compas-divider>
<section>
  <h3>
    [compas.open.compasTitle]
  </h3>
  <p>
    [compas.open.listScls]
  </p>
  <compas-scl-list>
  </compas-scl-list>
  <mwc-button
    icon="arrow_back"
    id="reselect-type"
    label="[compas.open.otherTypeButton]"
  >
  </mwc-button>
</section>

```

