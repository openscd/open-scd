/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Subscription Plugin initially the GOOSE list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.publisherGoose.title]
  </h1>
  <filtered-list>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      noninteractive=""
      tabindex="-1"
    >
      <span class="iedListTitle">
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
      graphic="large"
      mwc-list-item=""
      tabindex="0"
    >
      <span>
        GCB
      </span>
      <mwc-icon slot="graphic">
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
    >
      <span>
        GCB2
      </span>
      <mwc-icon slot="graphic">
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      noninteractive=""
      tabindex="-1"
    >
      <span class="iedListTitle">
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
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
    >
      <span>
        GCB
      </span>
      <mwc-icon slot="graphic">
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      noninteractive=""
      tabindex="-1"
    >
      <span class="iedListTitle">
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
      graphic="icon"
      noninteractive=""
      tabindex="-1"
    >
      <span class="iedListTitle">
        IED4
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
      mwc-list-item=""
      tabindex="-1"
    >
      <span>
        GCB
      </span>
      <mwc-icon slot="graphic">
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
    >
      <span>
        GCB2
      </span>
      <mwc-icon slot="graphic">
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot Subscription Plugin initially the GOOSE list looks like the latest snapshot */

snapshots["Subscription Plugin initially the IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.subscriberIed.title]
  </h1>
  <mwc-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
    >
      <span class="iedListTitle">
        [subscription.subscriberIed.noGooseMessageSelected]
      </span>
    </mwc-list-item>
  </mwc-list>
</section>
`;
/* end snapshot Subscription Plugin initially the IED list looks like the latest snapshot */

snapshots["Subscription Plugin when selecting a GOOSE message the list on the right will initially show the subscribed / partially subscribed / not subscribed IEDs"] = 
`<section tabindex="0">
  <h1>
    [subscription.subscriberIed.title]
  </h1>
  <div class="subscriberWrapper">
    <filtered-list id="subscribedIeds">
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [subscription.subscriberIed.subscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
        tabindex="0"
      >
        <span>
          IED1
        </span>
        <mwc-icon slot="graphic">
          clear
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [subscription.subscriberIed.partiallySubscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          IED4
        </span>
        <mwc-icon slot="graphic">
          add
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [subscription.subscriberIed.availableToSubscribe]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          IED3
        </span>
        <mwc-icon slot="graphic">
          add
        </mwc-icon>
      </mwc-list-item>
    </filtered-list>
  </div>
</section>
`;
/* end snapshot Subscription Plugin when selecting a GOOSE message the list on the right will initially show the subscribed / partially subscribed / not subscribed IEDs */

snapshots["Subscription Plugin when selecting a GOOSE message and you subscribe a non-subscribed IED it looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.subscriberIed.title]
  </h1>
  <div class="subscriberWrapper">
    <filtered-list id="subscribedIeds">
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [subscription.subscriberIed.subscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          IED1
        </span>
        <mwc-icon slot="graphic">
          clear
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          IED3
        </span>
        <mwc-icon slot="graphic">
          clear
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [subscription.subscriberIed.partiallySubscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        aria-selected="false"
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          IED4
        </span>
        <mwc-icon slot="graphic">
          add
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [subscription.subscriberIed.availableToSubscribe]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
        noninteractive=""
        tabindex="-1"
      >
        <span>
          [subscription.none]
        </span>
      </mwc-list-item>
    </filtered-list>
  </div>
</section>
`;
/* end snapshot Subscription Plugin when selecting a GOOSE message and you subscribe a non-subscribed IED it looks like the latest snapshot */

snapshots["Subscription Plugin when selecting a GOOSE message and you unsubscribe a subscribed IED it looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.subscriberIed.title]
  </h1>
  <div class="subscriberWrapper">
    <filtered-list id="subscribedIeds">
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [subscription.subscriberIed.subscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          IED1
        </span>
        <mwc-icon slot="graphic">
          clear
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        aria-selected="false"
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          IED4
        </span>
        <mwc-icon slot="graphic">
          clear
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [subscription.subscriberIed.partiallySubscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
        noninteractive=""
        tabindex="-1"
      >
        <span>
          [subscription.none]
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [subscription.subscriberIed.availableToSubscribe]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          IED3
        </span>
        <mwc-icon slot="graphic">
          add
        </mwc-icon>
      </mwc-list-item>
    </filtered-list>
  </div>
</section>
`;
/* end snapshot Subscription Plugin when selecting a GOOSE message and you unsubscribe a subscribed IED it looks like the latest snapshot */

snapshots["Subscription Plugin when selecting a GOOSE message and you subscribe a partially subscribed IED it looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.subscriberIed.title]
  </h1>
  <div class="subscriberWrapper">
    <filtered-list id="subscribedIeds">
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [subscription.subscriberIed.subscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          IED1
        </span>
        <mwc-icon slot="graphic">
          clear
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        aria-selected="false"
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          IED4
        </span>
        <mwc-icon slot="graphic">
          clear
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [subscription.subscriberIed.partiallySubscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
        noninteractive=""
        tabindex="-1"
      >
        <span>
          [subscription.none]
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [subscription.subscriberIed.availableToSubscribe]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
        tabindex="-1"
      >
        <span>
          IED3
        </span>
        <mwc-icon slot="graphic">
          add
        </mwc-icon>
      </mwc-list-item>
    </filtered-list>
  </div>
</section>
`;
/* end snapshot Subscription Plugin when selecting a GOOSE message and you subscribe a partially subscribed IED it looks like the latest snapshot */

