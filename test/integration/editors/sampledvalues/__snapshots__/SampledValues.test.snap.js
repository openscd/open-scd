/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["Sampled Values Plugin initially the Sampled Values list looks like the latest snapshot"] = 
`<section>
  <h1>
    [sampledvalues.sampledValuesList.title]
  </h1>
  <mwc-list>
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
      graphic="large"
      mwc-list-item=""
      tabindex="0"
    >
      <span>
        MSVCB01
      </span>
      <mwc-icon slot="graphic">
      </mwc-icon>
    </mwc-list-item>
  </mwc-list>
</section>
`;
/* end snapshot Sampled Values Plugin initially the Sampled Values list looks like the latest snapshot */

snapshots["Sampled Values Plugin initially the IED list looks like the latest snapshot"] = 
`<section>
  <h1>
    [sampledvalues.subscriberIed.title]
  </h1>
  <mwc-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
    >
      <span class="iedListTitle">
        [sampledvalues.subscriberIed.noSampledValuesSelected]
      </span>
    </mwc-list-item>
  </mwc-list>
</section>
`;
/* end snapshot Sampled Values Plugin initially the IED list looks like the latest snapshot */

snapshots["Sampled Values Plugin when selecting a Sampled Values message the list on the right will initially show the subscribed / partially subscribed / not subscribed IEDs"] = 
`<section>
  <h1>
    [sampledvalues.subscriberIed.title]
  </h1>
  <div class="subscriberWrapper">
    <mwc-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [sampledvalues.subscriberIed.subscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <ied-element-smv>
      </ied-element-smv>
    </mwc-list>
    <mwc-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [sampledvalues.subscriberIed.partiallySubscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <ied-element-smv>
      </ied-element-smv>
    </mwc-list>
    <mwc-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [sampledvalues.subscriberIed.availableToSubscribe]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <ied-element-smv>
      </ied-element-smv>
    </mwc-list>
  </div>
</section>
`;
/* end snapshot Sampled Values Plugin when selecting a Sampled Values message the list on the right will initially show the subscribed / partially subscribed / not subscribed IEDs */

snapshots["Sampled Values Plugin when selecting a Sampled Values message and you subscribe a non-subscribed IED it looks like the latest snapshot"] = 
`<section>
  <h1>
    [sampledvalues.subscriberIed.title]
  </h1>
  <div class="subscriberWrapper">
    <mwc-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [sampledvalues.subscriberIed.subscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <ied-element-smv>
      </ied-element-smv>
    </mwc-list>
    <mwc-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [sampledvalues.subscriberIed.partiallySubscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <ied-element-smv>
      </ied-element-smv>
    </mwc-list>
    <mwc-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [sampledvalues.subscriberIed.availableToSubscribe]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <ied-element-smv>
      </ied-element-smv>
    </mwc-list>
  </div>
</section>
`;
/* end snapshot Sampled Values Plugin when selecting a Sampled Values message and you subscribe a non-subscribed IED it looks like the latest snapshot */

snapshots["Sampled Values Plugin when selecting a Sampled Values message and you unsubscribe a subscribed IED it looks like the latest snapshot"] = 
`<section>
  <h1>
    [sampledvalues.subscriberIed.title]
  </h1>
  <div class="subscriberWrapper">
    <mwc-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [sampledvalues.subscriberIed.subscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <ied-element-smv>
      </ied-element-smv>
    </mwc-list>
    <mwc-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [sampledvalues.subscriberIed.partiallySubscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <ied-element-smv>
      </ied-element-smv>
    </mwc-list>
    <mwc-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [sampledvalues.subscriberIed.availableToSubscribe]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <ied-element-smv>
      </ied-element-smv>
    </mwc-list>
  </div>
</section>
`;
/* end snapshot Sampled Values Plugin when selecting a Sampled Values message and you unsubscribe a subscribed IED it looks like the latest snapshot */

snapshots["Sampled Values Plugin when selecting a Sampled Values message and you subscribe a partially subscribed IED it looks like the latest snapshot"] = 
`<section>
  <h1>
    [sampledvalues.subscriberIed.title]
  </h1>
  <div class="subscriberWrapper">
    <mwc-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [sampledvalues.subscriberIed.subscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <ied-element-smv>
      </ied-element-smv>
    </mwc-list>
    <mwc-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [sampledvalues.subscriberIed.partiallySubscribed]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <ied-element-smv>
      </ied-element-smv>
    </mwc-list>
    <mwc-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
      >
        <span class="iedListTitle">
          [sampledvalues.subscriberIed.availableToSubscribe]
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <ied-element-smv>
      </ied-element-smv>
    </mwc-list>
  </div>
</section>
`;
/* end snapshot Sampled Values Plugin when selecting a Sampled Values message and you subscribe a partially subscribed IED it looks like the latest snapshot */

