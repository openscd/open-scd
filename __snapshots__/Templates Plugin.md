# `Templates Plugin`

## `without a doc loaded`

####   `looks like the latest snapshot`

```html
<h1>
  <span style="color: var(--base1)">
    [templates.missing]
  </span>
  <mwc-fab
    extended=""
    icon="add"
    label="[templates.add]"
  >
  </mwc-fab>
</h1>
<wizard-dialog>
</wizard-dialog>

```

## `with a doc loaded`

####   `looks like the latest snapshot`

```html
<div id="containerTemplates">
  <section tabindex="0">
    <h1>
      [scl.DAType]
      <nav>
        <abbr title="[add]">
          <mwc-icon-button icon="playlist_add">
          </mwc-icon-button>
        </abbr>
      </nav>
    </h1>
    <filtered-list id="datypelist">
      <mwc-list-item
        aria-disabled="false"
        hasmeta=""
        mwc-list-item=""
        tabindex="0"
        value="#AnalogueValue_i"
      >
        <span>
          AnalogueValue_i
        </span>
        <span slot="meta">
          1
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
        value="#ScaledValueConfig"
      >
        <span>
          ScaledValueConfig
        </span>
        <span slot="meta">
          2
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
        value="#Dummy_origin"
      >
        <span>
          Dummy_origin
        </span>
        <span slot="meta">
          2
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
        value="#Dummy.LLN0.Mod.SBOw"
      >
        <span>
          Dummy.LLN0.Mod.SBOw
        </span>
        <span slot="meta">
          6
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
        value="#Dummy.LLN0.Mod.Cancel"
      >
        <span>
          Dummy.LLN0.Mod.Cancel
        </span>
        <span slot="meta">
          5
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
        value="#Dummy.LPHD1.Sim.SBOw"
      >
        <span>
          Dummy.LPHD1.Sim.SBOw
        </span>
        <span slot="meta">
          6
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
        value="#Dummy.LPHD1.Sim.Cancel"
      >
        <span>
          Dummy.LPHD1.Sim.Cancel
        </span>
        <span slot="meta">
          5
        </span>
      </mwc-list-item>
    </filtered-list>
  </section>
  <section tabindex="0">
    <h1>
      [scl.EnumType]
      <nav>
        <abbr title="[add]">
          <mwc-icon-button icon="playlist_add">
          </mwc-icon-button>
        </abbr>
      </nav>
    </h1>
    <mwc-list>
      <enum-type-editor>
      </enum-type-editor>
      <enum-type-editor>
      </enum-type-editor>
      <enum-type-editor>
      </enum-type-editor>
      <enum-type-editor>
      </enum-type-editor>
    </mwc-list>
  </section>
</div>
<wizard-dialog>
</wizard-dialog>

```

