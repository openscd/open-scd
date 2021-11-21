# `dataset wizards`

## `include a dataset edit wizard`

####   `looks like the latest snapshot`

```html
<c-dialog
  defaultaction="close"
  heading="[wizard.title.edit]"
  open=""
>
  <div id="wizard-content">
    <wizard-text-field
      helper="[scl.name]"
      label="name"
      required=""
    >
    </wizard-text-field>
    <wizard-text-field
      disabled=""
      helper="[scl.desc]"
      label="desc"
      nullable=""
      required=""
    >
    </wizard-text-field>
    <c-button
      icon="add"
      label="[wizard.title.add]"
    >
    </c-button>
    <filtered-list multi="">
      <check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        selected=""
        tabindex="0"
        value="IED2>>CBSW>GooseDataSet1>CBSW/ XSWI 2.Pos stVal (ST)"
      >
        CBSW/ XSWI 2.Pos stVal (ST)
      </check-list-item>
      <check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        selected=""
        tabindex="-1"
        value="IED2>>CBSW>GooseDataSet1>CBSW/ XSWI 2.Pos q (ST)"
      >
        CBSW/ XSWI 2.Pos q (ST)
      </check-list-item>
      <check-list-item
        aria-disabled="false"
        graphic="control"
        mwc-list-item=""
        selected=""
        tabindex="-1"
        value="IED2>>CBSW>GooseDataSet1>CBSW/ XSWI 2.OpSlc.dsd sasd.ads.asd (ST)"
      >
        CBSW/ XSWI 2.OpSlc.dsd sasd.ads.asd (ST)
      </check-list-item>
    </filtered-list>
  </div>
  <c-button
    dialogaction="close"
    label="[cancel]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </c-button>
  <c-button
    dialoginitialfocus=""
    icon="save"
    label="[edit]"
    slot="primaryAction"
    trailingicon=""
  >
  </c-button>
</c-dialog>

```

