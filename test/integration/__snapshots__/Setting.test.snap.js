/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Setting upload .nsdoc file using event and looks like latest snapshot"] = 
`<div
  aria-describedby="content"
  aria-labelledby="title"
  aria-modal="true"
  class="mdc-dialog mdc-dialog--open mdc-dialog--opening mdc-dialog--scrollable"
  role="alertdialog"
>
  <div class="mdc-dialog__container">
    <div class="mdc-dialog__surface">
      <h2
        class="mdc-dialog__title"
        id="title"
      >
        Settings
      </h2>
      <div
        class="mdc-dialog__content"
        id="content"
      >
        <slot id="contentSlot">
        </slot>
      </div>
      <footer
        class="mdc-dialog__actions"
        id="actions"
      >
        <span>
          <slot name="secondaryAction">
          </slot>
        </span>
        <span>
          <slot name="primaryAction">
          </slot>
        </span>
      </footer>
    </div>
  </div>
  <div class="mdc-dialog__scrim">
  </div>
</div>
`;
/* end snapshot Setting upload .nsdoc file using event and looks like latest snapshot */

