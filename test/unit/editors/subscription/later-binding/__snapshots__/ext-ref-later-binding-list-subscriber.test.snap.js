/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["extref-later-binding-list-subscriber for Sampled Value Control looks like the latest snapshot, but no event fired"] = 
`<section tabindex="0">
  <h1>
    [subscription.laterBinding.extRefList.title]
    <mwc-icon-button
      class="switch-view"
      icon="alt_route"
      title="[subscription.laterBinding.extRefList.switchView]"
    >
    </mwc-icon-button>
    <mwc-icon-button
      class="filter-action-menu-icon"
      icon="filter_list"
      title="[subscription.laterBinding.extRefList.filter]"
    >
    </mwc-icon-button>
    <mwc-menu
      class="filter-menu"
      corner="BOTTOM_RIGHT"
      menucorner="END"
      multi=""
    >
      <mwc-check-list-item
        aria-disabled="false"
        class="show-bound"
        graphic="control"
        left=""
        mwc-list-item=""
        role="menuitem"
        selected=""
        tabindex="0"
      >
        <span>
          [subscription.laterBinding.extRefList.bound]
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="show-not-bound"
        graphic="control"
        left=""
        mwc-list-item=""
        role="menuitem"
        selected=""
        tabindex="-1"
      >
        <span>
          [subscription.laterBinding.extRefList.unBound]
        </span>
      </mwc-check-list-item>
    </mwc-menu>
    <mwc-icon-button
      class="settings-action-menu-icon"
      icon="settings"
      title="[subscription.laterBinding.extRefList.settings]"
    >
    </mwc-icon-button>
    <mwc-menu
      class="settings-menu"
      corner="BOTTOM_RIGHT"
      menucorner="END"
      multi=""
    >
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        left=""
        mwc-list-item=""
        role="menuitem"
        selected=""
        tabindex="0"
      >
        <span>
          [subscription.laterBinding.extRefList.autoIncrement]
        </span>
      </mwc-check-list-item>
    </mwc-menu>
  </h1>
  <filtered-list
    activatable=""
    class="extref-list show-bound show-not-bound"
  >
    <mwc-list-item
      aria-disabled="false"
      class="ied"
      graphic="icon"
      noninteractive=""
      tabindex="-1"
      value=""
    >
      <span>
        SMV_Publisher
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
      class="ied show-bound show-not-bound"
      graphic="icon"
      noninteractive=""
      tabindex="-1"
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR1/AmpSv/instMag.i[0] SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR1/AmpSv/q[0] SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0] SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/q[0] SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/instMag.i[0] SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/q[0] SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/instMag.i[0] SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/q[0] SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/instMag.i[0] SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/q[0] SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/instMag.i[0] SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/q[0] SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0] SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[1]"
    >
      <span>
        SMV_Subscriber
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
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0] "
    >
      <span>
        Overcurrent> PTRC 1:
        someRestrictedExtRef
      </span>
      <span slot="secondary">
        Restricted To AmpSV
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[1] "
    >
      <span>
        Overcurrent> PTRC 1:
        someRestrictedExtRef
      </span>
      <span slot="secondary">
        Restricted To AmpSV
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/instMag.i[0] "
    >
      <span>
        Overcurrent> PTRC 1:
        VolSv;TVTR1/VolSv/instMag.i
        ⬌ SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>VoltageTransformer/L1 TVTR 1.VolSv instMag.i (MX)
      </span>
      <span slot="secondary">
        MeasPoint.VT1
        (CurrentTransformer / LLN0 voltageOnly)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/q[0] "
    >
      <span>
        Overcurrent> PTRC 1:
        VolSv;TVTR1/VolSv/q
      </span>
      <span slot="secondary">
        MeasPoint.VT1
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/instMag.i[0] "
    >
      <span>
        Overcurrent> PTRC 1:
        VolSv;TVTR2/VolSv/instMag.i
      </span>
      <span slot="secondary">
        MeasPoint.VT2
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/q[0] "
    >
      <span>
        Overcurrent> PTRC 1:
        VolSv;TVTR2/VolSv/q
      </span>
      <span slot="secondary">
        MeasPoint.VT1
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/instMag.i[0] "
    >
      <span>
        Overcurrent> PTRC 1:
        VolSv;TVTR3/VolSv/instMag.i
      </span>
      <span slot="secondary">
        MeasPoint.VT3
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/q[0] "
    >
      <span>
        Overcurrent> PTRC 1:
        VolSv;TVTR3/VolSv/q
      </span>
      <span slot="secondary">
        MeasPoint.VT1
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR1/AmpSv/instMag.i[0] "
    >
      <span>
        Overvoltage> PTRC 1:
        AmpSv;TCTR1/AmpSv/instMag.i
        ⬌ SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L1 TCTR 1.AmpSv instMag.i (MX)
      </span>
      <span slot="secondary">
        MeasPoint.CT1
        (CurrentTransformer / LLN0 currentOnly)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR1/AmpSv/q[0] "
    >
      <span>
        Overvoltage> PTRC 1:
        AmpSv;TCTR1/AmpSv/q
        ⬌ SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L1 TCTR 1.AmpSv q (MX)
      </span>
      <span slot="secondary">
        MeasPoint.CT1
        (CurrentTransformer / LLN0 currentOnly)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0] "
    >
      <span>
        Overvoltage> PTRC 1:
        AmpSv;TCTR2/AmpSv/instMag.i
      </span>
      <span slot="secondary">
        MeasPoint.CT2
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/q[0] "
    >
      <span>
        Overvoltage> PTRC 1:
        AmpSv;TCTR2/AmpSv/q
        ⬌ SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L1 TCTR 1.AmpSv q (MX)
      </span>
      <span slot="secondary">
        MeasPoint.CT1
        (CurrentTransformer / LLN0 currentOnly)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/instMag.i[0] "
    >
      <span>
        Overvoltage> PTRC 1:
        AmpSv;TCTR3/AmpSv/instMag.i
      </span>
      <span slot="secondary">
        MeasPoint.CT3
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/q[0] "
    >
      <span>
        Overvoltage> PTRC 1:
        AmpSv;TCTR3/AmpSv/q
        ⬌ SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L1 TCTR 1.AmpSv q (MX)
      </span>
      <span slot="secondary">
        MeasPoint.CT1
        (CurrentTransformer / LLN0 currentOnly)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot extref-later-binding-list-subscriber for Sampled Value Control looks like the latest snapshot, but no event fired */

snapshots["extref-later-binding-list-subscriber for Sampled Value Control looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.laterBinding.extRefList.title]
    <mwc-icon-button
      class="switch-view"
      icon="alt_route"
      title="[subscription.laterBinding.extRefList.switchView]"
    >
    </mwc-icon-button>
    <mwc-icon-button
      class="filter-action-menu-icon"
      icon="filter_list"
      title="[subscription.laterBinding.extRefList.filter]"
    >
    </mwc-icon-button>
    <mwc-menu
      class="filter-menu"
      corner="BOTTOM_RIGHT"
      menucorner="END"
      multi=""
    >
      <mwc-check-list-item
        aria-disabled="false"
        class="show-bound"
        graphic="control"
        left=""
        mwc-list-item=""
        role="menuitem"
        selected=""
        tabindex="0"
      >
        <span>
          [subscription.laterBinding.extRefList.bound]
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="show-not-bound"
        graphic="control"
        left=""
        mwc-list-item=""
        role="menuitem"
        selected=""
        tabindex="-1"
      >
        <span>
          [subscription.laterBinding.extRefList.unBound]
        </span>
      </mwc-check-list-item>
    </mwc-menu>
    <mwc-icon-button
      class="settings-action-menu-icon"
      icon="settings"
      title="[subscription.laterBinding.extRefList.settings]"
    >
    </mwc-icon-button>
    <mwc-menu
      class="settings-menu"
      corner="BOTTOM_RIGHT"
      menucorner="END"
      multi=""
    >
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        left=""
        mwc-list-item=""
        role="menuitem"
        selected=""
        tabindex="0"
      >
        <span>
          [subscription.laterBinding.extRefList.autoIncrement]
        </span>
      </mwc-check-list-item>
    </mwc-menu>
  </h1>
  <filtered-list
    activatable=""
    class="extref-list show-bound show-not-bound"
  >
    <mwc-list-item
      aria-disabled="false"
      class="ied show-bound show-not-bound"
      graphic="icon"
      noninteractive=""
      tabindex="-1"
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR1/AmpSv/instMag.i[0] SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR1/AmpSv/q[0] SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0] SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/q[0] SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/instMag.i[0] SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/q[0] SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/instMag.i[0] SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/q[0] SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/instMag.i[0] SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/q[0] SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/instMag.i[0] SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/q[0] SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0] SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[1]"
    >
      <span>
        SMV_Subscriber
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
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[0]"
    >
      <span>
        Overcurrent> PTRC 1:
        someRestrictedExtRef
      </span>
      <span slot="secondary">
        Restricted To AmpSV
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>someRestrictedExtRef[1]"
    >
      <span>
        Overcurrent> PTRC 1:
        someRestrictedExtRef
      </span>
      <span slot="secondary">
        Restricted To AmpSV
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/instMag.i[0]"
    >
      <span>
        Overcurrent> PTRC 1:
        VolSv;TVTR1/VolSv/instMag.i
        ⬌ SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>VoltageTransformer/L1 TVTR 1.VolSv instMag.i (MX)
      </span>
      <span slot="secondary">
        MeasPoint.VT1
        (CurrentTransformer / LLN0 voltageOnly)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR1/VolSv/q[0]"
    >
      <span>
        Overcurrent> PTRC 1:
        VolSv;TVTR1/VolSv/q
      </span>
      <span slot="secondary">
        MeasPoint.VT1
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/instMag.i[0]"
    >
      <span>
        Overcurrent> PTRC 1:
        VolSv;TVTR2/VolSv/instMag.i
      </span>
      <span slot="secondary">
        MeasPoint.VT2
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR2/VolSv/q[0]"
    >
      <span>
        Overcurrent> PTRC 1:
        VolSv;TVTR2/VolSv/q
      </span>
      <span slot="secondary">
        MeasPoint.VT1
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/instMag.i[0]"
    >
      <span>
        Overcurrent> PTRC 1:
        VolSv;TVTR3/VolSv/instMag.i
      </span>
      <span slot="secondary">
        MeasPoint.VT3
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overcurrent> PTRC 1>VolSv;TVTR3/VolSv/q[0]"
    >
      <span>
        Overcurrent> PTRC 1:
        VolSv;TVTR3/VolSv/q
      </span>
      <span slot="secondary">
        MeasPoint.VT1
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR1/AmpSv/instMag.i[0]"
    >
      <span>
        Overvoltage> PTRC 1:
        AmpSv;TCTR1/AmpSv/instMag.i
        ⬌ SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L1 TCTR 1.AmpSv instMag.i (MX)
      </span>
      <span slot="secondary">
        MeasPoint.CT1
        (CurrentTransformer / LLN0 currentOnly)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR1/AmpSv/q[0]"
    >
      <span>
        Overvoltage> PTRC 1:
        AmpSv;TCTR1/AmpSv/q
        ⬌ SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L1 TCTR 1.AmpSv q (MX)
      </span>
      <span slot="secondary">
        MeasPoint.CT1
        (CurrentTransformer / LLN0 currentOnly)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/instMag.i[0]"
    >
      <span>
        Overvoltage> PTRC 1:
        AmpSv;TCTR2/AmpSv/instMag.i
      </span>
      <span slot="secondary">
        MeasPoint.CT2
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR2/AmpSv/q[0]"
    >
      <span>
        Overvoltage> PTRC 1:
        AmpSv;TCTR2/AmpSv/q
        ⬌ SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L1 TCTR 1.AmpSv q (MX)
      </span>
      <span slot="secondary">
        MeasPoint.CT1
        (CurrentTransformer / LLN0 currentOnly)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/instMag.i[0]"
    >
      <span>
        Overvoltage> PTRC 1:
        AmpSv;TCTR3/AmpSv/instMag.i
      </span>
      <span slot="secondary">
        MeasPoint.CT3
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Subscriber>>Overvoltage> PTRC 1>AmpSv;TCTR3/AmpSv/q[0]"
    >
      <span>
        Overvoltage> PTRC 1:
        AmpSv;TCTR3/AmpSv/q
        ⬌ SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L1 TCTR 1.AmpSv q (MX)
      </span>
      <span slot="secondary">
        MeasPoint.CT1
        (CurrentTransformer / LLN0 currentOnly)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot extref-later-binding-list-subscriber for Sampled Value Control looks like the latest snapshot */

snapshots["extref-later-binding-list-subscriber for GOOSE Control looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.laterBinding.extRefList.title]
    <mwc-icon-button
      class="switch-view"
      icon="alt_route"
      title="[subscription.laterBinding.extRefList.switchView]"
    >
    </mwc-icon-button>
    <mwc-icon-button
      class="filter-action-menu-icon"
      icon="filter_list"
      title="[subscription.laterBinding.extRefList.filter]"
    >
    </mwc-icon-button>
    <mwc-menu
      class="filter-menu"
      corner="BOTTOM_RIGHT"
      menucorner="END"
      multi=""
    >
      <mwc-check-list-item
        aria-disabled="false"
        class="show-bound"
        graphic="control"
        left=""
        mwc-list-item=""
        role="menuitem"
        selected=""
        tabindex="0"
      >
        <span>
          [subscription.laterBinding.extRefList.bound]
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="show-not-bound"
        graphic="control"
        left=""
        mwc-list-item=""
        role="menuitem"
        selected=""
        tabindex="-1"
      >
        <span>
          [subscription.laterBinding.extRefList.unBound]
        </span>
      </mwc-check-list-item>
    </mwc-menu>
    <mwc-icon-button
      class="settings-action-menu-icon"
      icon="settings"
      title="[subscription.laterBinding.extRefList.settings]"
    >
    </mwc-icon-button>
    <mwc-menu
      class="settings-menu"
      corner="BOTTOM_RIGHT"
      menucorner="END"
      multi=""
    >
      <mwc-check-list-item
        aria-disabled="false"
        graphic="control"
        left=""
        mwc-list-item=""
        role="menuitem"
        selected=""
        tabindex="0"
      >
        <span>
          [subscription.laterBinding.extRefList.autoIncrement]
        </span>
      </mwc-check-list-item>
    </mwc-menu>
  </h1>
  <filtered-list
    activatable=""
    class="extref-list show-bound show-not-bound"
  >
    <mwc-list-item
      aria-disabled="false"
      class="ied show-bound show-not-bound"
      graphic="icon"
      noninteractive=""
      tabindex="-1"
      value="GOOSE_Subscriber>>Earth_Switch>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CSWI 1 Pos stVal GOOSE_Subscriber>>Earth_Switch>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CSWI 1 Pos q GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0] GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/q[0] GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CILO/EnaOpn/stVal[0] GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CILO/EnaCls/stVal[0] GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CILO/EnaOpn2/stVal[0] GOOSE_Subscriber>>Earth_Switch> CSWI 1>Pos;CSWI1/Pos/stVal[0] GOOSE_Subscriber>>Earth_Switch> CSWI 1>Pos;CSWI1/Pos/q[0] GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0] GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[1]"
    >
      <span>
        GOOSE_Subscriber
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
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CILO/EnaCls/stVal[0]"
    >
      <span>
        Earth_Switch> CILO 1:
        Pos;CILO/EnaCls/stVal
        ⬌ GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB1_Disconnector/ CILO 1.EnaCls stVal (ST)
      </span>
      <span slot="secondary">
        Interlocking.Input3
        (QB2_Disconnector / LLN0 GOOSE2)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CILO/EnaOpn/stVal[0]"
    >
      <span>
        Earth_Switch> CILO 1:
        Pos;CILO/EnaOpn/stVal
        ⬌ GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB1_Disconnector/ CILO 1.EnaOpn stVal (ST)
      </span>
      <span slot="secondary">
        Interlocking.Input2
        (QB2_Disconnector / LLN0 GOOSE2)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CILO/EnaOpn2/stVal[0]"
    >
      <span>
        Earth_Switch> CILO 1:
        Pos;CILO/EnaOpn2/stVal
        ⬌ GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CILO 1.EnaOpn stVal (ST)
      </span>
      <span slot="secondary">
        Interlocking.Input4
        (QB2_Disconnector / LLN0 GOOSE2)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/q[0]"
    >
      <span>
        Earth_Switch> CILO 1:
        Pos;CSWI1/Pos/q
        ⬌ GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos q (ST)
      </span>
      <span slot="secondary">
        Interlocking.Input
        (QB2_Disconnector / LLN0 GOOSE2)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CILO 1>Pos;CSWI1/Pos/stVal[0]"
    >
      <span>
        Earth_Switch> CILO 1:
        Pos;CSWI1/Pos/stVal
      </span>
      <span slot="secondary">
        Interlocking.Input
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CSWI 1>Pos;CSWI1/Pos/q[0]"
    >
      <span>
        Earth_Switch> CSWI 1:
        Pos;CSWI1/Pos/q
        ⬌ GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos q (ST)
      </span>
      <span slot="secondary">
        Interlocking.Input2
        (QB2_Disconnector / LLN0 GOOSE2)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CSWI 1>Pos;CSWI1/Pos/stVal[0]"
    >
      <span>
        Earth_Switch> CSWI 1:
        Pos;CSWI1/Pos/stVal
        ⬌ GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos stVal (ST)
      </span>
      <span slot="secondary">
        Interlocking.Input2
        (QB2_Disconnector / LLN0 GOOSE2)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[0]"
    >
      <span>
        Earth_Switch> CSWI 1:
        someRestrictedExtRef
      </span>
      <span slot="secondary">
        Restricted To Pos
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-not-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch> CSWI 1>someRestrictedExtRef[1]"
    >
      <span>
        Earth_Switch> CSWI 1:
        someRestrictedExtRef
      </span>
      <span slot="secondary">
        Restricted To Pos
      </span>
      <mwc-icon slot="graphic">
        link_off
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CSWI 1 Pos q"
    >
      <span>
        Earth_Switch:
        
        ⬌ GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos q (ST)
      </span>
      <span slot="secondary">
        (QB2_Disconnector / LLN0 GOOSE2)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="extref show-bound"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Subscriber>>Earth_Switch>GOOSE:GOOSE2 QB2_Disconnector/ LLN0  GOOSE_Publisher QB2_Disconnector/ CSWI 1 Pos stVal"
    >
      <span>
        Earth_Switch:
        
        ⬌ GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos stVal (ST)
      </span>
      <span slot="secondary">
        (QB2_Disconnector / LLN0 GOOSE2)
      </span>
      <mwc-icon slot="graphic">
        link
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot extref-later-binding-list-subscriber for GOOSE Control looks like the latest snapshot */

