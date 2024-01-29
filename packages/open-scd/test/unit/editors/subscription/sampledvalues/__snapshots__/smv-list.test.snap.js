/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["smv-list looks like the latest snapshot with a document loaded"] = 
`<section tabindex="0">
  <h1>
    [subscription.smv.publisher.title]
  </h1>
  <filtered-list activatable="">
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      noninteractive=""
      tabindex="-1"
      value=""
    >
      <span>
        IED1
      </span>
      <mwc-icon slot="graphic">
        developer_board
      </mwc-icon>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      noninteractive=""
      tabindex="-1"
      value=""
    >
      <span>
        IED2
      </span>
      <mwc-icon slot="graphic">
        developer_board
      </mwc-icon>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      noninteractive=""
      tabindex="-1"
      value="IED3>>MU01>MSVCB01"
    >
      <span>
        IED3
      </span>
      <mwc-icon slot="graphic">
        developer_board
      </mwc-icon>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      hasmeta=""
      mwc-list-item=""
      tabindex="0"
      value="IED3>>MU01>MSVCB01"
    >
      <mwc-icon slot="graphic">
      </mwc-icon>
      <span>
        MSVCB01
      </span>
      <mwc-icon-button
        class="hidden"
        icon="edit"
        slot="meta"
      >
      </mwc-icon-button>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot smv-list looks like the latest snapshot with a document loaded */

snapshots["smv-list looks like the latest snapshot without a doc loaded"] = 
`<section tabindex="0">
  <h1>
    [subscription.smv.publisher.title]
  </h1>
  <filtered-list activatable="">
  </filtered-list>
</section>
`;
/* end snapshot smv-list looks like the latest snapshot without a doc loaded */

