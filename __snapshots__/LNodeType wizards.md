# `LNodeType wizards`

## `defines a lNodeTypeWizard`

####   `looks like the latest snapshot`

```html
<mwc-dialog
  defaultaction="close"
  heading="[dotype.wizard.title.edit]"
  open=""
>
  <div id="wizard-content">
    <mwc-button
      fullwidth=""
      icon="delete"
      label="[delete]"
      trailingicon=""
    >
    </mwc-button>
    <wizard-textfield
      dialoginitialfocus=""
      helper="[scl.id]"
      label="id"
      maxlength="127"
      minlength="1"
      pattern="([:_A-Za-z]|[À-Ö]|[Ø-ö]|[ø-˿]|[Ͱ-ͽ]|[Ϳ-῿]|[‌-‍]|[⁰-↏]|[Ⰰ-⿯]|[、-퟿]|[豈-﷏]|[ﷰ-�]|[𐀀\-󯿿]|[.0-9-]|·|[̀-ͯ]|[‿-⁀])+"
      required=""
    >
    </wizard-textfield>
    <wizard-textfield
      disabled=""
      helper="[scl.desc]"
      label="desc"
      nullable=""
      pattern="([ -~]|[]|[ -퟿]|[-�]|[𐀀\-􏿿])*"
    >
    </wizard-textfield>
    <wizard-textfield
      helper="[scl.lnClass]"
      label="lnClass"
      pattern="[A-Z]{4,4}"
      required=""
    >
    </wizard-textfield>
    <mwc-button
      icon="playlist_add"
      label="[scl.DO]"
      slot="graphic"
      trailingicon=""
    >
    </mwc-button>
    <mwc-list style="margin-top: 0px;">
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="0"
        twoline=""
        value="#Dummy.CSWI>Beh"
      >
        <span>
          Beh
        </span>
        <span slot="secondary">
          #Dummy.LLN0.Beh
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#Dummy.CSWI>NamPlt"
      >
        <span>
          NamPlt
        </span>
        <span slot="secondary">
          #Dummy.XCBR1.NamPlt
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#Dummy.CSWI>Loc"
      >
        <span>
          Loc
        </span>
        <span slot="secondary">
          #Dummy.SPS
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#Dummy.CSWI>OpCnt"
      >
        <span>
          OpCnt
        </span>
        <span slot="secondary">
          #Dummy.XCBR1.OpCnt
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        mwc-list-item=""
        tabindex="-1"
        twoline=""
        value="#Dummy.CSWI>Pos"
      >
        <span>
          Pos
        </span>
        <span slot="secondary">
          #Dummy.CSWI.Pos1
        </span>
      </mwc-list-item>
    </mwc-list>
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
    icon=""
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>

```

