/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["looks like the latest snapshot without a doc loaded"] = 
`<section tabindex="0">
  <h1>
    [subscription.binding.extRefList.noSelection]
  </h1>
</section>
`;
/* end snapshot looks like the latest snapshot without a doc loaded */

snapshots["for Sampled Value Control looks like the latest snapshot, but no event fired"] = 
`<section tabindex="0">
  <h1>
    [subscription.binding.extRefList.noSelection]
  </h1>
</section>
`;
/* end snapshot for Sampled Value Control looks like the latest snapshot, but no event fired */

snapshots["for Sampled Value Control when SVC has no subscriptions looks like the latest snapshot, when SVC has no subscriptions"] = 
`<section tabindex="0">
  <h1>
    [subscription.binding.extRefList.title]
  </h1>
  <filtered-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value=""
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
      graphic="large"
      noninteractive=""
      tabindex="-1"
    >
      [subscription.binding.extRefList.noSubscribedLNs]
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="LLN0  SMV_Subscriber1>>Overvoltage PTRC  - 1 SMV_Subscriber1>>Overvoltage LLN0  SMV_Subscriber1>>Overcurrent PTRC  - 1 SMV_Subscriber1>>Overcurrent LLN0  SMV_Subscriber2>>Overvoltage PTRC  - 1 SMV_Subscriber2>>Overvoltage LLN0  SMV_Subscriber2>>Overcurrent PTRC  - 1 SMV_Subscriber2>>Overcurrent"
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
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber1>>Overvoltage"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        SMV_Subscriber1>>Overvoltage
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber1>>Overvoltage> PTRC 1"
    >
      <span>
        PTRC  - 1
      </span>
      <span slot="secondary">
        SMV_Subscriber1>>Overvoltage
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber1>>Overcurrent"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        SMV_Subscriber1>>Overcurrent
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber1>>Overcurrent> PTRC 1"
    >
      <span>
        PTRC  - 1
      </span>
      <span slot="secondary">
        SMV_Subscriber1>>Overcurrent
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber2>>Overvoltage"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        SMV_Subscriber2>>Overvoltage
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber2>>Overvoltage> PTRC 1"
    >
      <span>
        PTRC  - 1
      </span>
      <span slot="secondary">
        SMV_Subscriber2>>Overvoltage
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber2>>Overcurrent"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        SMV_Subscriber2>>Overcurrent
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber2>>Overcurrent> PTRC 1"
    >
      <span>
        PTRC  - 1
      </span>
      <span slot="secondary">
        SMV_Subscriber2>>Overcurrent
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot for Sampled Value Control when SVC has no subscriptions looks like the latest snapshot, when SVC has no subscriptions */

snapshots["for Sampled Value Control when SVC has a single subscriptions looks like the latest snapshot, "] = 
`<section tabindex="0">
  <h1>
    [subscription.binding.extRefList.title]
  </h1>
  <filtered-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="LLN0  SMV_Subscriber1>>Overvoltage"
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
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber1>>Overvoltage"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        SMV_Subscriber1>>Overvoltage
      </span>
      <mwc-icon slot="graphic">
        close
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="PTRC  - 1 SMV_Subscriber1>>Overvoltage LLN0  SMV_Subscriber1>>Overcurrent PTRC  - 1 SMV_Subscriber1>>Overcurrent LLN0  SMV_Subscriber2>>Overvoltage PTRC  - 1 SMV_Subscriber2>>Overvoltage LLN0  SMV_Subscriber2>>Overcurrent PTRC  - 1 SMV_Subscriber2>>Overcurrent"
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
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber1>>Overvoltage> PTRC 1"
    >
      <span>
        PTRC  - 1
      </span>
      <span slot="secondary">
        SMV_Subscriber1>>Overvoltage
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber1>>Overcurrent"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        SMV_Subscriber1>>Overcurrent
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber1>>Overcurrent> PTRC 1"
    >
      <span>
        PTRC  - 1
      </span>
      <span slot="secondary">
        SMV_Subscriber1>>Overcurrent
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber2>>Overvoltage"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        SMV_Subscriber2>>Overvoltage
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber2>>Overvoltage> PTRC 1"
    >
      <span>
        PTRC  - 1
      </span>
      <span slot="secondary">
        SMV_Subscriber2>>Overvoltage
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber2>>Overcurrent"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        SMV_Subscriber2>>Overcurrent
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber2>>Overcurrent> PTRC 1"
    >
      <span>
        PTRC  - 1
      </span>
      <span slot="secondary">
        SMV_Subscriber2>>Overcurrent
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot for Sampled Value Control when SVC has a single subscriptions looks like the latest snapshot,  */

snapshots["when SVC has a multiple subscriptions looks like the latest snapshot, "] = 
`<section tabindex="0">
  <h1>
    [subscription.binding.extRefList.title]
  </h1>
  <filtered-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="LLN0  SMV_Subscriber1>>Overvoltage LLN0  SMV_Subscriber2>>Overvoltage"
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
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber1>>Overvoltage"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        SMV_Subscriber1>>Overvoltage
      </span>
      <mwc-icon slot="graphic">
        close
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      disabled=""
      graphic="large"
      twoline=""
      value="SMV_Subscriber2>>Overvoltage"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        SMV_Subscriber2>>Overvoltage
      </span>
      <mwc-icon slot="graphic">
        close
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="PTRC  - 1 SMV_Subscriber1>>Overvoltage LLN0  SMV_Subscriber1>>Overcurrent PTRC  - 1 SMV_Subscriber1>>Overcurrent PTRC  - 1 SMV_Subscriber2>>Overvoltage LLN0  SMV_Subscriber2>>Overcurrent PTRC  - 1 SMV_Subscriber2>>Overcurrent"
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
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber1>>Overvoltage> PTRC 1"
    >
      <span>
        PTRC  - 1
      </span>
      <span slot="secondary">
        SMV_Subscriber1>>Overvoltage
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber1>>Overcurrent"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        SMV_Subscriber1>>Overcurrent
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber1>>Overcurrent> PTRC 1"
    >
      <span>
        PTRC  - 1
      </span>
      <span slot="secondary">
        SMV_Subscriber1>>Overcurrent
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber2>>Overvoltage> PTRC 1"
    >
      <span>
        PTRC  - 1
      </span>
      <span slot="secondary">
        SMV_Subscriber2>>Overvoltage
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber2>>Overcurrent"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        SMV_Subscriber2>>Overcurrent
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber2>>Overcurrent> PTRC 1"
    >
      <span>
        PTRC  - 1
      </span>
      <span slot="secondary">
        SMV_Subscriber2>>Overcurrent
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot when SVC has a multiple subscriptions looks like the latest snapshot,  */

snapshots["for GOOSE Control looks like the latest snapshot, but no event fired"] = 
`<section tabindex="0">
  <h1>
    [subscription.binding.extRefList.noSelection]
  </h1>
</section>
`;
/* end snapshot for GOOSE Control looks like the latest snapshot, but no event fired */

snapshots["for GOOSE Control when GSEControl has no subscriptions looks like the latest snapshot, when GSEControl has no subscriptions"] = 
`<section tabindex="0">
  <h1>
    [subscription.binding.extRefList.title]
  </h1>
  <filtered-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value=""
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
      graphic="large"
      noninteractive=""
      tabindex="-1"
    >
      [subscription.binding.extRefList.noSubscribedLNs]
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="LLN0  GOOSE_Subscriber1>>Earth_Switch CILO  - 1 GOOSE_Subscriber1>>Earth_Switch CSWI  - 1 GOOSE_Subscriber1>>Earth_Switch XSWI  - 1 GOOSE_Subscriber1>>Earth_Switch LLN0  GOOSE_Subscriber2>>Earth_Switch CILO  - 1 GOOSE_Subscriber2>>Earth_Switch CSWI  - 1 GOOSE_Subscriber2>>Earth_Switch XSWI  - 1 GOOSE_Subscriber2>>Earth_Switch"
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
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber1>>Earth_Switch"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        GOOSE_Subscriber1>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber1>>Earth_Switch> CILO 1"
    >
      <span>
        CILO  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber1>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber1>>Earth_Switch> CSWI 1"
    >
      <span>
        CSWI  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber1>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber1>>Earth_Switch> XSWI 1"
    >
      <span>
        XSWI  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber1>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber2>>Earth_Switch"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        GOOSE_Subscriber2>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber2>>Earth_Switch> CILO 1"
    >
      <span>
        CILO  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber2>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber2>>Earth_Switch> CSWI 1"
    >
      <span>
        CSWI  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber2>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber2>>Earth_Switch> XSWI 1"
    >
      <span>
        XSWI  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber2>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot for GOOSE Control when GSEControl has no subscriptions looks like the latest snapshot, when GSEControl has no subscriptions */

snapshots["for GOOSE Control when GSEControl has a single subscription looks like the latest snapshot, "] = 
`<section tabindex="0">
  <h1>
    [subscription.binding.extRefList.title]
  </h1>
  <filtered-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="LLN0  GOOSE_Subscriber2>>Earth_Switch"
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
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber2>>Earth_Switch"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        GOOSE_Subscriber2>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        close
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="LLN0  GOOSE_Subscriber1>>Earth_Switch CILO  - 1 GOOSE_Subscriber1>>Earth_Switch CSWI  - 1 GOOSE_Subscriber1>>Earth_Switch XSWI  - 1 GOOSE_Subscriber1>>Earth_Switch CILO  - 1 GOOSE_Subscriber2>>Earth_Switch CSWI  - 1 GOOSE_Subscriber2>>Earth_Switch XSWI  - 1 GOOSE_Subscriber2>>Earth_Switch"
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
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber1>>Earth_Switch"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        GOOSE_Subscriber1>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber1>>Earth_Switch> CILO 1"
    >
      <span>
        CILO  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber1>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber1>>Earth_Switch> CSWI 1"
    >
      <span>
        CSWI  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber1>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber1>>Earth_Switch> XSWI 1"
    >
      <span>
        XSWI  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber1>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber2>>Earth_Switch> CILO 1"
    >
      <span>
        CILO  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber2>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber2>>Earth_Switch> CSWI 1"
    >
      <span>
        CSWI  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber2>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber2>>Earth_Switch> XSWI 1"
    >
      <span>
        XSWI  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber2>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot for GOOSE Control when GSEControl has a single subscription looks like the latest snapshot,  */

snapshots["when GSEControl has a multiple subscriptions looks like the latest snapshot, "] = 
`<section tabindex="0">
  <h1>
    [subscription.binding.extRefList.title]
  </h1>
  <filtered-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="LLN0  GOOSE_Subscriber1>>Earth_Switch LLN0  GOOSE_Subscriber2>>Earth_Switch CILO  - 1 GOOSE_Subscriber2>>Earth_Switch"
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
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber1>>Earth_Switch"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        GOOSE_Subscriber1>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        close
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="large"
      twoline=""
      value="GOOSE_Subscriber2>>Earth_Switch"
    >
      <span>
        LLN0
      </span>
      <span slot="secondary">
        GOOSE_Subscriber2>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        close
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="large"
      twoline=""
      value="GOOSE_Subscriber2>>Earth_Switch> CILO 1"
    >
      <span>
        CILO  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber2>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        close
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="CILO  - 1 GOOSE_Subscriber1>>Earth_Switch CSWI  - 1 GOOSE_Subscriber1>>Earth_Switch XSWI  - 1 GOOSE_Subscriber1>>Earth_Switch CSWI  - 1 GOOSE_Subscriber2>>Earth_Switch XSWI  - 1 GOOSE_Subscriber2>>Earth_Switch"
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
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber1>>Earth_Switch> CILO 1"
    >
      <span>
        CILO  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber1>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber1>>Earth_Switch> CSWI 1"
    >
      <span>
        CSWI  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber1>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber1>>Earth_Switch> XSWI 1"
    >
      <span>
        XSWI  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber1>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber2>>Earth_Switch> CSWI 1"
    >
      <span>
        CSWI  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber2>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber2>>Earth_Switch> XSWI 1"
    >
      <span>
        XSWI  - 1
      </span>
      <span slot="secondary">
        GOOSE_Subscriber2>>Earth_Switch
      </span>
      <mwc-icon slot="graphic">
        add
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot when GSEControl has a multiple subscriptions looks like the latest snapshot,  */

