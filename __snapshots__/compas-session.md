# `compas-session`

## `Dialog when almost expired`

####   `looks like the latest snapshot`

```html
<mwc-dialog
  heading="[compas.session.headingExpiring]"
  id="compasSessionExpiringDialog"
  scrimclickaction=""
>
  <div>
    [compas.session.explainExpiring]
  </div>
  <mwc-button
    dialogaction="close"
    slot="primaryAction"
  >
    [compas.session.continue]
  </mwc-button>
</mwc-dialog>

```

## `Dialog when expired without document`

####   `looks like the latest snapshot`

```html
<mwc-dialog
  "=""
  escapekeyaction=""
  heading="[compas.session.headingExpired]"
  id="compasSessionExpiredDialog"
  scrimclickaction=""
>
  <div>
    [compas.session.explainExpiredWithoutProject]
  </div>
</mwc-dialog>

```

## `Dialog when expired with document`

####   `looks like the latest snapshot`

```html
<mwc-dialog
  "=""
  escapekeyaction=""
  heading="[compas.session.headingExpired]"
  id="compasSessionExpiredDialog"
  scrimclickaction=""
>
  <div>
    [compas.session.explainExpiredWithProject]
  </div>
  <mwc-button slot="primaryAction">
    [compas.session.saveProject]
  </mwc-button>
</mwc-dialog>

```

