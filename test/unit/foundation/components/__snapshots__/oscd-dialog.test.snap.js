/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["user defined dialog web component without primary action defined looks like the latest snapshot"] = 
`<mwc-dialog heading="">
  <slot>
  </slot>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot user defined dialog web component without primary action defined looks like the latest snapshot */

snapshots["user defined dialog web component with primary action defined looks like the latest snapshot"] = 
`<mwc-dialog heading="">
  <slot>
  </slot>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="save"
    id="primaryActionButton"
    label="label"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot user defined dialog web component with primary action defined looks like the latest snapshot */

snapshots["user defined dialog web component with element property set looks like the latest snapshot"] = 
`<mwc-dialog heading="">
  <mwc-icon-button-toggle
    class="code"
    officon="code_off"
    onicon="code"
  >
  </mwc-icon-button-toggle>
  <ace-editor
    base-path="/public/ace"
    class="code"
    mode="ace/mode/xml"
    soft-tabs=""
    style="width: 80vw; height: calc(100vh - 240px);"
    theme="ace/theme/solarized_null"
    value="<testelement><parsererror xmlns=&quot;http://www.w3.org/1999/xhtml&quot; style=&quot;display: block; white-space: pre; border: 2px solid #c77; padding: 0 1em 0 1em; margin: 1em; background-color: #fdd; color: black&quot;><h3>This page contains the following errors:</h3><div style=&quot;font-family:monospace;font-size:12px&quot;>error on line 1 at column 50: Extra content at the end of the document
</div><h3>Below is a rendering of the page up to the first error.</h3></parsererror><testchild/><testelement/></testelement>"
    wrap=""
  >
  </ace-editor>
  <slot>
  </slot>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot user defined dialog web component with element property set looks like the latest snapshot */

snapshots["user defined dialog web component with code action set and element property set looks like the latest snapshot"] = 
`<mwc-dialog heading="">
  <mwc-icon-button-toggle
    class="code"
    officon="code_off"
    onicon="code"
  >
  </mwc-icon-button-toggle>
  <ace-editor
    base-path="/public/ace"
    class="code"
    mode="ace/mode/xml"
    soft-tabs=""
    style="width: 80vw; height: calc(100vh - 240px);"
    theme="ace/theme/solarized_null"
    value="<testelement><parsererror xmlns=&quot;http://www.w3.org/1999/xhtml&quot; style=&quot;display: block; white-space: pre; border: 2px solid #c77; padding: 0 1em 0 1em; margin: 1em; background-color: #fdd; color: black&quot;><h3>This page contains the following errors:</h3><div style=&quot;font-family:monospace;font-size:12px&quot;>error on line 1 at column 50: Extra content at the end of the document
</div><h3>Below is a rendering of the page up to the first error.</h3></parsererror><testchild/><testelement/></testelement>"
    wrap=""
  >
  </ace-editor>
  <slot>
  </slot>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="code"
    id="codeActionButton"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot user defined dialog web component with code action set and element property set looks like the latest snapshot */

snapshots["user definable dialog web component without primary action defined looks like the latest snapshot"] = 
`<mwc-dialog heading="">
  <slot>
  </slot>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot user definable dialog web component without primary action defined looks like the latest snapshot */

snapshots["user definable dialog web component with primary action defined looks like the latest snapshot"] = 
`<mwc-dialog heading="">
  <slot>
  </slot>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="save"
    id="primaryActionButton"
    label="label"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot user definable dialog web component with primary action defined looks like the latest snapshot */

snapshots["user definable dialog web component with element property set looks like the latest snapshot"] = 
`<mwc-dialog heading="">
  <mwc-icon-button-toggle
    class="code"
    officon="code_off"
    onicon="code"
  >
  </mwc-icon-button-toggle>
  <ace-editor
    base-path="/public/ace"
    class="code"
    mode="ace/mode/xml"
    soft-tabs=""
    style="width: 80vw; height: calc(100vh - 240px);"
    theme="ace/theme/solarized_null"
    value="<testelement><parsererror xmlns=&quot;http://www.w3.org/1999/xhtml&quot; style=&quot;display: block; white-space: pre; border: 2px solid #c77; padding: 0 1em 0 1em; margin: 1em; background-color: #fdd; color: black&quot;><h3>This page contains the following errors:</h3><div style=&quot;font-family:monospace;font-size:12px&quot;>error on line 1 at column 50: Extra content at the end of the document
</div><h3>Below is a rendering of the page up to the first error.</h3></parsererror><testchild/><testelement/></testelement>"
    wrap=""
  >
  </ace-editor>
  <slot>
  </slot>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot user definable dialog web component with element property set looks like the latest snapshot */

snapshots["user definable dialog web component with code action set and element property set looks like the latest snapshot"] = 
`<mwc-dialog heading="">
  <mwc-icon-button-toggle
    class="code"
    officon="code_off"
    onicon="code"
  >
  </mwc-icon-button-toggle>
  <ace-editor
    base-path="/public/ace"
    class="code"
    mode="ace/mode/xml"
    soft-tabs=""
    style="width: 80vw; height: calc(100vh - 240px);"
    theme="ace/theme/solarized_null"
    value="<testelement><parsererror xmlns=&quot;http://www.w3.org/1999/xhtml&quot; style=&quot;display: block; white-space: pre; border: 2px solid #c77; padding: 0 1em 0 1em; margin: 1em; background-color: #fdd; color: black&quot;><h3>This page contains the following errors:</h3><div style=&quot;font-family:monospace;font-size:12px&quot;>error on line 1 at column 50: Extra content at the end of the document
</div><h3>Below is a rendering of the page up to the first error.</h3></parsererror><testchild/><testelement/></testelement>"
    wrap=""
  >
  </ace-editor>
  <slot>
  </slot>
  <mwc-button
    dialogaction="close"
    label="[close]"
    slot="secondaryAction"
    style="--mdc-theme-primary: var(--mdc-theme-error)"
  >
  </mwc-button>
  <mwc-button
    icon="code"
    id="codeActionButton"
    label="[save]"
    slot="primaryAction"
    trailingicon=""
  >
  </mwc-button>
</mwc-dialog>
`;
/* end snapshot user definable dialog web component with code action set and element property set looks like the latest snapshot */

