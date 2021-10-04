# `compas-upload-version`

## `still determining if document exists in CoMPAS`

####   `looks like the latest snapshot`

```html
<compas-loading>
</compas-loading>

```

## `no document in compas (anymore)`

####   `looks like the latest snapshot`

```html
<mwc-list>
  <mwc-list-item
    aria-disabled="false"
    mwc-list-item=""
    tabindex="0"
  >
    [compas.notExists]
  </mwc-list-item>
</mwc-list>

```

## `existing document in compas`

####   `looks like the latest snapshot`

```html
<input
  accept=".scd"
  hidden=""
  id="scl-file"
  required=""
  type="file"
>
<wizard-textfield
  id="filename"
  label="[compas.uploadVersion.filename]"
  required=""
>
</wizard-textfield>
<mwc-button label="[compas.uploadVersion.selectButton]">
</mwc-button>
<compas-changeset-radiogroup>
</compas-changeset-radiogroup>
<compas-comment>
</compas-comment>

```

## `existing document in compas through wizard`

####   `looks like the latest snapshot`

```html
<mwc-dialog
  defaultaction="close"
  heading="[compas.uploadVersion.title]"
  open=""
>
  <div id="wizard-content">
    <compas-upload-version>
    </compas-upload-version>
  </div>
  <mwc-button
    dialogaction="close"
    label="[cancel]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    dialoginitialfocus=""
    icon="save"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>

```

