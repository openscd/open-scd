# `clientln connection wizards`

## `connection wizard`

####   `looks like the latest snapshot`

```html
<mwc-dialog
  defaultaction="close"
  heading="[commMap.connectCB]"
  open=""
>
  <div id="wizard-content">
    <div
      class="wrapper"
      style="display: grid; grid-template-columns: 1fr 1fr;"
    >
      <filtered-list
        id="sourcelist"
        multi=""
        searchfieldlabel="[commMap.sourceIED]"
      >
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          left=""
          mwc-list-item=""
          tabindex="0"
          value="IED1"
        >
          IED1
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          left=""
          mwc-list-item=""
          tabindex="-1"
          value="IED2"
        >
          IED2
        </mwc-check-list-item>
        <mwc-check-list-item
          aria-disabled="false"
          graphic="control"
          left=""
          mwc-list-item=""
          tabindex="-1"
          value="IED3"
        >
          IED3
        </mwc-check-list-item>
      </filtered-list>
      <filtered-list
        id="sinklist"
        searchfieldlabel="[commMap.sinkIED]"
      >
        <mwc-list-item
          aria-disabled="false"
          mwc-list-item=""
          style="height:56px"
          tabindex="0"
          value="IED1"
        >
          IED1
        </mwc-list-item>
        <mwc-list-item
          aria-disabled="false"
          mwc-list-item=""
          style="height:56px"
          tabindex="-1"
          value="IED2"
        >
          IED2
        </mwc-list-item>
        <mwc-list-item
          aria-disabled="false"
          mwc-list-item=""
          style="height:56px"
          tabindex="-1"
          value="IED3"
        >
          IED3
        </mwc-list-item>
      </filtered-list>
    </div>
  </div>
  <mwc-button
    dialogaction="close"
    label="[cancel]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>

```

