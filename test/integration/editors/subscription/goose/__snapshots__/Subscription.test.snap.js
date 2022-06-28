/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Subscription Plugin in Publisher view initially the plugin looks like the latest snapshot"] = 
`<div>
  <mwc-formfield label="[subscription.goose.view.publisherView]">
    <mwc-radio
      checked=""
      id="goosePublisherView"
      name="view"
      value="goose"
    >
    </mwc-radio>
  </mwc-formfield>
  <mwc-formfield label="[subscription.goose.view.subscriberView]">
    <mwc-radio
      id="gooseSubscriberView"
      name="view"
      value="ied"
    >
    </mwc-radio>
  </mwc-formfield>
  <div class="container">
    <goose-list class="row">
    </goose-list>
    <subscriber-list-goose class="row">
    </subscriber-list-goose>
  </div>
</div>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot Subscription Plugin in Publisher view initially the plugin looks like the latest snapshot */

snapshots["Subscription Plugin in Publisher view initially the GOOSE list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.goose.publisherGoose.title]
  </h1>
  <filtered-list>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      noninteractive=""
      tabindex="-1"
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
      graphic="large"
      hasmeta=""
      mwc-list-item=""
      tabindex="0"
    >
      <mwc-icon slot="graphic">
      </mwc-icon>
      <span>
        GCB
      </span>
      <mwc-icon-button
        class="hidden"
        icon="edit"
        slot="meta"
      >
      </mwc-icon-button>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      hasmeta=""
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
      </mwc-icon>
      <span>
        GCB2
      </span>
      <mwc-icon-button
        class="hidden"
        icon="edit"
        slot="meta"
      >
      </mwc-icon-button>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      noninteractive=""
      tabindex="-1"
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
      graphic="large"
      hasmeta=""
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
      </mwc-icon>
      <span>
        GCB
      </span>
      <mwc-icon-button
        class="hidden"
        icon="edit"
        slot="meta"
      >
      </mwc-icon-button>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      noninteractive=""
      tabindex="-1"
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
      graphic="icon"
      noninteractive=""
      tabindex="-1"
    >
      <span>
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
      hasmeta=""
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
      </mwc-icon>
      <span>
        GCB
      </span>
      <mwc-icon-button
        class="hidden"
        icon="edit"
        slot="meta"
      >
      </mwc-icon-button>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      hasmeta=""
      mwc-list-item=""
      tabindex="-1"
    >
      <mwc-icon slot="graphic">
      </mwc-icon>
      <span>
        GCB2
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
/* end snapshot Subscription Plugin in Publisher view initially the GOOSE list looks like the latest snapshot */

snapshots["Subscription Plugin in Publisher view initially the subscriber list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.goose.publisherGoose.subscriberTitle]
  </h1>
  <mwc-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
    >
      <span>
        [subscription.subscriber.noControlBlockSelected]
      </span>
    </mwc-list-item>
  </mwc-list>
</section>
`;
/* end snapshot Subscription Plugin in Publisher view initially the subscriber list looks like the latest snapshot */

snapshots["Subscription Plugin in Publisher view when selecting a GOOSE message the list on the right will initially show the subscribed / partially subscribed / not subscribed IEDs"] = 
`<section tabindex="0">
  <h1>
    [subscription.goose.publisherGoose.subscriberTitle]
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span>
          [subscription.subscriber.subscribed]
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
        <span>
          [subscription.subscriber.partiallySubscribed]
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
        <span>
          [subscription.subscriber.availableToSubscribe]
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
/* end snapshot Subscription Plugin in Publisher view when selecting a GOOSE message the list on the right will initially show the subscribed / partially subscribed / not subscribed IEDs */

snapshots["Subscription Plugin in Publisher view when selecting a GOOSE message and subscribing an unsubscribed IED it looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.goose.publisherGoose.subscriberTitle]
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span>
          [subscription.subscriber.subscribed]
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
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
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
        <span>
          [subscription.subscriber.partiallySubscribed]
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
        <span>
          [subscription.subscriber.availableToSubscribe]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        graphic="avatar"
        noninteractive=""
      >
        <span>
          [subscription.none]
        </span>
      </mwc-list-item>
    </filtered-list>
  </div>
</section>
`;
/* end snapshot Subscription Plugin in Publisher view when selecting a GOOSE message and subscribing an unsubscribed IED it looks like the latest snapshot */

snapshots["Subscription Plugin in Publisher view when selecting a GOOSE message and unsubscribing a subscribed IED it looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.goose.publisherGoose.subscriberTitle]
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span>
          [subscription.subscriber.subscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        graphic="avatar"
        noninteractive=""
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
        <span>
          [subscription.subscriber.partiallySubscribed]
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
        <span>
          [subscription.subscriber.availableToSubscribe]
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
          add
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
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
/* end snapshot Subscription Plugin in Publisher view when selecting a GOOSE message and unsubscribing a subscribed IED it looks like the latest snapshot */

snapshots["Subscription Plugin in Publisher view when selecting a GOOSE message and subscribing a partially subscribed IED it looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.goose.publisherGoose.subscriberTitle]
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span>
          [subscription.subscriber.subscribed]
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
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
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
        <span>
          [subscription.subscriber.partiallySubscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        graphic="avatar"
        noninteractive=""
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
        <span>
          [subscription.subscriber.availableToSubscribe]
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
/* end snapshot Subscription Plugin in Publisher view when selecting a GOOSE message and subscribing a partially subscribed IED it looks like the latest snapshot */

snapshots["Subscription Plugin in Subscriber view initially the plugin looks like the latest snapshot"] = 
`<div>
  <mwc-formfield label="[subscription.goose.view.publisherView]">
    <mwc-radio
      id="goosePublisherView"
      name="view"
      value="goose"
    >
    </mwc-radio>
  </mwc-formfield>
  <mwc-formfield label="[subscription.goose.view.subscriberView]">
    <mwc-radio
      checked=""
      id="gooseSubscriberView"
      name="view"
      value="ied"
    >
    </mwc-radio>
  </mwc-formfield>
  <div class="container">
    <ied-list-goose class="row">
    </ied-list-goose>
    <subscriber-list-goose class="row">
    </subscriber-list-goose>
  </div>
</div>
<wizard-dialog>
</wizard-dialog>
`;
/* end snapshot Subscription Plugin in Subscriber view initially the plugin looks like the latest snapshot */

snapshots["Subscription Plugin in Subscriber view initially the IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.goose.subscriberGoose.title]
  </h1>
  <filtered-list>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      mwc-list-item=""
      tabindex="0"
    >
      <span>
        IED1
      </span>
      <mwc-icon slot="graphic">
        developer_board
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      mwc-list-item=""
      tabindex="-1"
    >
      <span>
        IED2
      </span>
      <mwc-icon slot="graphic">
        developer_board
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      mwc-list-item=""
      tabindex="-1"
    >
      <span>
        IED3
      </span>
      <mwc-icon slot="graphic">
        developer_board
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      mwc-list-item=""
      tabindex="-1"
    >
      <span>
        IED4
      </span>
      <mwc-icon slot="graphic">
        developer_board
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot Subscription Plugin in Subscriber view initially the IED list looks like the latest snapshot */

snapshots["Subscription Plugin in Subscriber view initially the subscriber list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.goose.subscriberGoose.publisherTitle]
  </h1>
  <mwc-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
    >
      <span>
        [subscription.subscriber.noIedSelected]
      </span>
    </mwc-list-item>
  </mwc-list>
</section>
`;
/* end snapshot Subscription Plugin in Subscriber view initially the subscriber list looks like the latest snapshot */

snapshots["Subscription Plugin in Subscriber view when selecting an IED the subscriber list will initially show the subscribed / partially subscribed / not subscribed IEDs"] = 
`<section tabindex="0">
  <h1>
    [subscription.goose.subscriberGoose.publisherTitle]
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span>
          [subscription.subscriber.subscribed]
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
        <span>
          [subscription.subscriber.partiallySubscribed]
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
          GCB (IED1)
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
        <span>
          [subscription.subscriber.availableToSubscribe]
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
          GCB (IED4)
        </span>
        <mwc-icon slot="graphic">
          add
        </mwc-icon>
      </mwc-list-item>
    </filtered-list>
  </div>
</section>
`;
/* end snapshot Subscription Plugin in Subscriber view when selecting an IED the subscriber list will initially show the subscribed / partially subscribed / not subscribed IEDs */

snapshots["Subscription Plugin in Subscriber view when selecting an IED and subscribing a unsubscribed GOOSE message it looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.goose.subscriberGoose.publisherTitle]
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span>
          [subscription.subscriber.subscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
      >
        <span>
          GCB (IED4)
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
        <span>
          [subscription.subscriber.partiallySubscribed]
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
          GCB (IED1)
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
        <span>
          [subscription.subscriber.availableToSubscribe]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        graphic="avatar"
        noninteractive=""
      >
        <span>
          [subscription.none]
        </span>
      </mwc-list-item>
    </filtered-list>
  </div>
</section>
`;
/* end snapshot Subscription Plugin in Subscriber view when selecting an IED and subscribing a unsubscribed GOOSE message it looks like the latest snapshot */

snapshots["Subscription Plugin in Subscriber view when selecting an IED and unsubscribing a subscribed GOOSE message it looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.goose.subscriberGoose.publisherTitle]
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span>
          [subscription.subscriber.subscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        graphic="avatar"
        noninteractive=""
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
        <span>
          [subscription.subscriber.partiallySubscribed]
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
          GCB (IED1)
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
        <span>
          [subscription.subscriber.availableToSubscribe]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
      >
        <span>
          GCB (IED4)
        </span>
        <mwc-icon slot="graphic">
          add
        </mwc-icon>
      </mwc-list-item>
    </filtered-list>
  </div>
</section>
`;
/* end snapshot Subscription Plugin in Subscriber view when selecting an IED and unsubscribing a subscribed GOOSE message it looks like the latest snapshot */

snapshots["Subscription Plugin in Subscriber view when selecting an IED and subscribing a partially subscribed GOOSE message it looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.goose.subscriberGoose.publisherTitle]
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span>
          [subscription.subscriber.subscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
      >
        <span>
          GCB (IED1)
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
        <span>
          [subscription.subscriber.partiallySubscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        graphic="avatar"
        noninteractive=""
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
        <span>
          [subscription.subscriber.availableToSubscribe]
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
          GCB (IED4)
        </span>
        <mwc-icon slot="graphic">
          add
        </mwc-icon>
      </mwc-list-item>
    </filtered-list>
  </div>
</section>
`;
/* end snapshot Subscription Plugin in Subscriber view when selecting an IED and subscribing a partially subscribed GOOSE message it looks like the latest snapshot */
