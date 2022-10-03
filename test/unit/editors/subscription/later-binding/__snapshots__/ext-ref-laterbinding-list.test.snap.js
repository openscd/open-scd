/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["smv-list looks like the latest snapshot without a doc loaded"] = 
`<section tabindex="0">
  <h1>
    [subscription.laterBinding.extRefList.noSelection]
  </h1>
</section>
`;
/* end snapshot smv-list looks like the latest snapshot without a doc loaded */

snapshots["smv-list with document loaded looks like the latest snapshot, but no event fired"] = 
`<section tabindex="0">
  <h1>
    [subscription.laterBinding.extRefList.noSelection]
  </h1>
</section>
`;
/* end snapshot smv-list with document loaded looks like the latest snapshot, but no event fired */

snapshots["smv-list with document loaded when SVC has no subscriptions looks like the latest snapshot, when SVC has no subscriptions"] = 
`<section tabindex="0">
  <h1>
    [subscription.laterBinding.extRefList.title]
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
      [subscription.laterBinding.extRefList.noSubscribedExtRefs]
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="MeasPoint.CT2 SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0] MeasPoint.CT3 SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/instMag.i[0] Restricted To AmpSV SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0] MeasPoint.VT1 SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/q[0] MeasPoint.VT2 SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/instMag.i[0] MeasPoint.VT1 SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/q[0] MeasPoint.VT3 SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/instMag.i[0] MeasPoint.VT1 SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/q[0]"
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
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0]"
    >
      <span>
        AmpSv;TCTR2/AmpSv/instMag.i
                 (MeasPoint.CT2)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/instMag.i[0]"
    >
      <span>
        AmpSv;TCTR3/AmpSv/instMag.i
                 (MeasPoint.CT3)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/instMag.i[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0]"
    >
      <span>
        someRestrictedExtRef
                 (Restricted To AmpSV)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/q[0]"
    >
      <span>
        VolSv;TVTR1/VolSv/q
                 (MeasPoint.VT1)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/q[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/instMag.i[0]"
    >
      <span>
        VolSv;TVTR2/VolSv/instMag.i
                 (MeasPoint.VT2)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/instMag.i[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/q[0]"
    >
      <span>
        VolSv;TVTR2/VolSv/q
                 (MeasPoint.VT1)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/q[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/instMag.i[0]"
    >
      <span>
        VolSv;TVTR3/VolSv/instMag.i
                 (MeasPoint.VT3)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/instMag.i[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/q[0]"
    >
      <span>
        VolSv;TVTR3/VolSv/q
                 (MeasPoint.VT1)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/q[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot smv-list with document loaded when SVC has no subscriptions looks like the latest snapshot, when SVC has no subscriptions */

snapshots["smv-list with document loaded when SVC has a single subscriptions looks like the latest snapshot, "] = 
`<section tabindex="0">
  <h1>
    [subscription.laterBinding.extRefList.title]
  </h1>
  <filtered-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="MeasPoint.CT1 SMV_Subscriber>>Overvoltage> PTRC 1>SMV:currentOnly CurrentTransformer/ LLN0  SMV_Publisher CurrentTransformer/L1 TCTR 1 AmpSv instMag.i@AmpSv;TCTR1/AmpSv/instMag.i"
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
      value="SMV_Subscriber>>Overvoltage> PTRC 1>SMV:currentOnly CurrentTransformer/ LLN0  SMV_Publisher CurrentTransformer/L1 TCTR 1 AmpSv instMag.i@AmpSv;TCTR1/AmpSv/instMag.i"
    >
      <span>
        AmpSv;TCTR1/AmpSv/instMag.i
                 (MeasPoint.CT1)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overvoltage> PTRC 1>SMV:currentOnly CurrentTransformer/ LLN0  SMV_Publisher CurrentTransformer/L1 TCTR 1 AmpSv instMag.i@AmpSv;TCTR1/AmpSv/instMag.i
      </span>
      <mwc-icon slot="graphic">
        swap_horiz
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="MeasPoint.CT2 SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0] MeasPoint.CT3 SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/instMag.i[0] Restricted To AmpSV SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0] MeasPoint.VT1 SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/q[0] MeasPoint.VT2 SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/instMag.i[0] MeasPoint.VT1 SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/q[0] MeasPoint.VT3 SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/instMag.i[0] MeasPoint.VT1 SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/q[0]"
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
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0]"
    >
      <span>
        AmpSv;TCTR2/AmpSv/instMag.i
                 (MeasPoint.CT2)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/instMag.i[0]"
    >
      <span>
        AmpSv;TCTR3/AmpSv/instMag.i
                 (MeasPoint.CT3)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/instMag.i[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0]"
    >
      <span>
        someRestrictedExtRef
                 (Restricted To AmpSV)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/q[0]"
    >
      <span>
        VolSv;TVTR1/VolSv/q
                 (MeasPoint.VT1)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/q[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/instMag.i[0]"
    >
      <span>
        VolSv;TVTR2/VolSv/instMag.i
                 (MeasPoint.VT2)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/instMag.i[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/q[0]"
    >
      <span>
        VolSv;TVTR2/VolSv/q
                 (MeasPoint.VT1)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/q[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/instMag.i[0]"
    >
      <span>
        VolSv;TVTR3/VolSv/instMag.i
                 (MeasPoint.VT3)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/instMag.i[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/q[0]"
    >
      <span>
        VolSv;TVTR3/VolSv/q
                 (MeasPoint.VT1)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/q[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot smv-list with document loaded when SVC has a single subscriptions looks like the latest snapshot,  */

snapshots["smv-list when SVC has a multiple subscriptions looks like the latest snapshot, "] = 
`<section tabindex="0">
  <h1>
    [subscription.laterBinding.extRefList.title]
  </h1>
  <filtered-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="MeasPoint.CT1 SMV_Subscriber>>Overvoltage> PTRC 1>SMV:currentOnly CurrentTransformer/ LLN0  SMV_Publisher CurrentTransformer/L1 TCTR 1 AmpSv q@AmpSv;TCTR1/AmpSv/q MeasPoint.CT1 SMV_Subscriber>>Overvoltage> PTRC 1>SMV:currentOnly CurrentTransformer/ LLN0  SMV_Publisher CurrentTransformer/L1 TCTR 1 AmpSv q@AmpSv;TCTR2/AmpSv/q MeasPoint.CT1 SMV_Subscriber>>Overvoltage> PTRC 1>SMV:currentOnly CurrentTransformer/ LLN0  SMV_Publisher CurrentTransformer/L1 TCTR 1 AmpSv q@AmpSv;TCTR3/AmpSv/q"
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
      value="SMV_Subscriber>>Overvoltage> PTRC 1>SMV:currentOnly CurrentTransformer/ LLN0  SMV_Publisher CurrentTransformer/L1 TCTR 1 AmpSv q@AmpSv;TCTR1/AmpSv/q"
    >
      <span>
        AmpSv;TCTR1/AmpSv/q
                 (MeasPoint.CT1)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overvoltage> PTRC 1>SMV:currentOnly CurrentTransformer/ LLN0  SMV_Publisher CurrentTransformer/L1 TCTR 1 AmpSv q@AmpSv;TCTR1/AmpSv/q
      </span>
      <mwc-icon slot="graphic">
        swap_horiz
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="large"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>SMV:currentOnly CurrentTransformer/ LLN0  SMV_Publisher CurrentTransformer/L1 TCTR 1 AmpSv q@AmpSv;TCTR2/AmpSv/q"
    >
      <span>
        AmpSv;TCTR2/AmpSv/q
                 (MeasPoint.CT1)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overvoltage> PTRC 1>SMV:currentOnly CurrentTransformer/ LLN0  SMV_Publisher CurrentTransformer/L1 TCTR 1 AmpSv q@AmpSv;TCTR2/AmpSv/q
      </span>
      <mwc-icon slot="graphic">
        swap_horiz
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="large"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>SMV:currentOnly CurrentTransformer/ LLN0  SMV_Publisher CurrentTransformer/L1 TCTR 1 AmpSv q@AmpSv;TCTR3/AmpSv/q"
    >
      <span>
        AmpSv;TCTR3/AmpSv/q
                 (MeasPoint.CT1)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overvoltage> PTRC 1>SMV:currentOnly CurrentTransformer/ LLN0  SMV_Publisher CurrentTransformer/L1 TCTR 1 AmpSv q@AmpSv;TCTR3/AmpSv/q
      </span>
      <mwc-icon slot="graphic">
        swap_horiz
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="MeasPoint.CT2 SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0] MeasPoint.CT3 SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/instMag.i[0] Restricted To AmpSV SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0] MeasPoint.VT1 SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/q[0] MeasPoint.VT2 SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/instMag.i[0] MeasPoint.VT1 SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/q[0] MeasPoint.VT3 SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/instMag.i[0] MeasPoint.VT1 SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/q[0]"
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
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0]"
    >
      <span>
        AmpSv;TCTR2/AmpSv/instMag.i
                 (MeasPoint.CT2)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/instMag.i[0]"
    >
      <span>
        AmpSv;TCTR3/AmpSv/instMag.i
                 (MeasPoint.CT3)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/instMag.i[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0]"
    >
      <span>
        someRestrictedExtRef
                 (Restricted To AmpSV)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/q[0]"
    >
      <span>
        VolSv;TVTR1/VolSv/q
                 (MeasPoint.VT1)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/q[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/instMag.i[0]"
    >
      <span>
        VolSv;TVTR2/VolSv/instMag.i
                 (MeasPoint.VT2)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/instMag.i[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/q[0]"
    >
      <span>
        VolSv;TVTR2/VolSv/q
                 (MeasPoint.VT1)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/q[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/instMag.i[0]"
    >
      <span>
        VolSv;TVTR3/VolSv/instMag.i
                 (MeasPoint.VT3)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/instMag.i[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/q[0]"
    >
      <span>
        VolSv;TVTR3/VolSv/q
                 (MeasPoint.VT1)
      </span>
      <span slot="secondary">
        SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/q[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot smv-list when SVC has a multiple subscriptions looks like the latest snapshot,  */

snapshots["gse-list with gse document loaded looks like the latest snapshot, but no event fired"] = 
`<section tabindex="0">
  <h1>
    [subscription.laterBinding.extRefList.noSelection]
  </h1>
</section>
`;
/* end snapshot gse-list with gse document loaded looks like the latest snapshot, but no event fired */

snapshots["gse-list with gse document loaded when GSEControl has no subscriptions looks like the latest snapshot, when GSEControl has no subscriptions"] = 
`<section tabindex="0">
  <h1>
    [subscription.laterBinding.extRefList.title]
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
      [subscription.laterBinding.extRefList.noSubscribedExtRefs]
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="Interlocking.Input2 GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB1_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO2/Pos/EnaOpn Interlocking.Input3 GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO3/Pos/EnaOpn Interlocking.Input GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0] Restricted To Pos GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]"
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
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB1_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO2/Pos/EnaOpn"
    >
      <span>
        Pos;CILO2/Pos/EnaOpn
                 (Interlocking.Input2)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB1_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO2/Pos/EnaOpn
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO3/Pos/EnaOpn"
    >
      <span>
        Pos;CILO3/Pos/EnaOpn
                 (Interlocking.Input3)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO3/Pos/EnaOpn
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]"
    >
      <span>
        Pos;CSWI1/Pos/stVal
                 (Interlocking.Input)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]"
    >
      <span>
        someRestrictedExtRef
                 (Restricted To Pos)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot gse-list with gse document loaded when GSEControl has no subscriptions looks like the latest snapshot, when GSEControl has no subscriptions */

snapshots["gse-list with gse document loaded when GSEControl has a single subscription looks like the latest snapshot, "] = 
`<section tabindex="0">
  <h1>
    [subscription.laterBinding.extRefList.title]
  </h1>
  <filtered-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="Interlocking.Input2 GOOSE_Subscriber>>Earth_Switch> CSWI 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CSWI 1 Pos stVal@Pos;CSWI1/Pos/stVal"
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
      value="GOOSE_Subscriber>>Earth_Switch> CSWI 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CSWI 1 Pos stVal@Pos;CSWI1/Pos/stVal"
    >
      <span>
        Pos;CSWI1/Pos/stVal
                 (Interlocking.Input2)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CSWI 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CSWI 1 Pos stVal@Pos;CSWI1/Pos/stVal
      </span>
      <mwc-icon slot="graphic">
        swap_horiz
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="Interlocking.Input2 GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB1_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO2/Pos/EnaOpn Interlocking.Input3 GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO3/Pos/EnaOpn Interlocking.Input GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0] Restricted To Pos GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]"
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
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB1_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO2/Pos/EnaOpn"
    >
      <span>
        Pos;CILO2/Pos/EnaOpn
                 (Interlocking.Input2)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB1_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO2/Pos/EnaOpn
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO3/Pos/EnaOpn"
    >
      <span>
        Pos;CILO3/Pos/EnaOpn
                 (Interlocking.Input3)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO3/Pos/EnaOpn
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]"
    >
      <span>
        Pos;CSWI1/Pos/stVal
                 (Interlocking.Input)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]"
    >
      <span>
        someRestrictedExtRef
                 (Restricted To Pos)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot gse-list with gse document loaded when GSEControl has a single subscription looks like the latest snapshot,  */

snapshots["gse-list when GSEControl has a multiple subscriptions looks like the latest snapshot, "] = 
`<section tabindex="0">
  <h1>
    [subscription.laterBinding.extRefList.title]
  </h1>
  <filtered-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="Interlocking.Input GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CSWI 1 Pos q@Pos;CSWI1/Pos/q Interlocking.Input2 GOOSE_Subscriber>>Earth_Switch> CSWI 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CSWI 1 Pos q@Pos;CSWI1/Pos/q"
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
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CSWI 1 Pos q@Pos;CSWI1/Pos/q"
    >
      <span>
        Pos;CSWI1/Pos/q
                 (Interlocking.Input)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CSWI 1 Pos q@Pos;CSWI1/Pos/q
      </span>
      <mwc-icon slot="graphic">
        swap_horiz
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      graphic="large"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CSWI 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CSWI 1 Pos q@Pos;CSWI1/Pos/q"
    >
      <span>
        Pos;CSWI1/Pos/q
                 (Interlocking.Input2)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CSWI 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CSWI 1 Pos q@Pos;CSWI1/Pos/q
      </span>
      <mwc-icon slot="graphic">
        swap_horiz
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="Interlocking.Input2 GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB1_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO2/Pos/EnaOpn Interlocking.Input3 GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO3/Pos/EnaOpn Interlocking.Input GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0] Restricted To Pos GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]"
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
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB1_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO2/Pos/EnaOpn"
    >
      <span>
        Pos;CILO2/Pos/EnaOpn
                 (Interlocking.Input2)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB1_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO2/Pos/EnaOpn
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO3/Pos/EnaOpn"
    >
      <span>
        Pos;CILO3/Pos/EnaOpn
                 (Interlocking.Input3)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CILO 1>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CILO 1 EnaOpn stVal@Pos;CILO3/Pos/EnaOpn
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]"
    >
      <span>
        Pos;CSWI1/Pos/stVal
                 (Interlocking.Input)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]"
    >
      <span>
        someRestrictedExtRef
                 (Restricted To Pos)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot gse-list when GSEControl has a multiple subscriptions looks like the latest snapshot,  */

snapshots["gse-list with gse document loaded when GSEControl has no subscriptions looks like the latest snapshot, when GSEControl has no subscriptions"] = 
`<section tabindex="0">
  <h1>
    [subscription.laterBinding.extRefList.title]
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
      [subscription.laterBinding.extRefList.noSubscribedExtRefs]
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
      value="Interlocking.Input GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0] Restricted To Pos GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]"
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
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]"
    >
      <span>
        Pos;CSWI1/Pos/stVal
                 (Interlocking.Input)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="true"
      disabled=""
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]"
    >
      <span>
        someRestrictedExtRef
                 (Restricted To Pos)
      </span>
      <span slot="secondary">
        GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]
      </span>
      <mwc-icon slot="graphic">
        arrow_back
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot gse-list with gse document loaded when GSEControl has no subscriptions looks like the latest snapshot, when GSEControl has no subscriptions */

