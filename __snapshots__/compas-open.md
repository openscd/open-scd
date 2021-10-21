# `compas-open`

## `when-type-needs-to-be-selected`

####   `looks like the latest snapshot`

```html
<section>
  <h3>
    Local
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
<section>
  <h3>
    CoMPAS
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
<section>
  <h3>
    Local
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
<section>
  <h3>
    CoMPAS
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

