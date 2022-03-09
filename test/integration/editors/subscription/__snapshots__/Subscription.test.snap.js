/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Subscription Plugin initially the GOOSE list looks like the latest snapshot"] = 
`<section>
  <h1>
    [subscription.publisherGoose.title]
  </h1>
  <mwc-list>
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
    <goose-message>
    </goose-message>
    <goose-message>
    </goose-message>
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
    <goose-message>
    </goose-message>
  </mwc-list>
</section>
`;
/* end snapshot Subscription Plugin initially the GOOSE list looks like the latest snapshot */

snapshots["Subscription Plugin initially the IED list looks like the latest snapshot"] = 
`<section>
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
`<section>
  <h1>
    [subscription.subscriberIed.title]
  </h1>
  <div class="subscriberWrapper">
    <mwc-list id="subscribedIeds">
      <mwc-list-item noninteractive="">
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
        graphic="avatar"
        noninteractive=""
      >
        <span>
          [subscription.none]
        </span>
      </mwc-list-item>
    </mwc-list>
    <mwc-list id="partialSubscribedIeds">
      <mwc-list-item noninteractive="">
        <span class="iedListTitle">
          [subscription.subscriberIed.partiallySubscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <ied-element>
      </ied-element>
    </mwc-list>
    <mwc-list id="notSubscribedIeds">
      <mwc-list-item noninteractive="">
        <span class="iedListTitle">
          [subscription.subscriberIed.availableToSubscribe]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <ied-element>
      </ied-element>
      <ied-element>
      </ied-element>
    </mwc-list>
  </div>
</section>
`;
/* end snapshot Subscription Plugin when selecting a GOOSE message the list on the right will initially show the subscribed / partially subscribed / not subscribed IEDs */

