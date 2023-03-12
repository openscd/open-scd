/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["fcda-binding-list without a doc loaded looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.undefined.controlBlockList.title]
    <mwc-icon-button
      class="actions-menu-icon"
      icon="filter_list"
    >
    </mwc-icon-button>
    <mwc-menu
      class="actions-menu"
      corner="BOTTOM_RIGHT"
      menucorner="END"
      multi=""
    >
      <mwc-check-list-item
        aria-disabled="false"
        class="filter-subscribed"
        graphic="control"
        left=""
        mwc-list-item=""
        role="menuitem"
        selected=""
        tabindex="0"
      >
        <span>
          [subscription.subscriber.subscribed]
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="filter-not-subscribed"
        graphic="control"
        left=""
        mwc-list-item=""
        role="menuitem"
        selected=""
        tabindex="-1"
      >
        <span>
          [subscription.subscriber.notSubscribed]
        </span>
      </mwc-check-list-item>
    </mwc-menu>
  </h1>
  <filtered-list
    activatable=""
    class="control-block-list show-not-subscribed show-subscribed"
  >
  </filtered-list>
</section>
`;
/* end snapshot fcda-binding-list without a doc loaded looks like the latest snapshot */

snapshots["fcda-binding-list with a SampledValueControl doc loaded looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.SampledValueControl.controlBlockList.title]
    <mwc-icon-button
      class="actions-menu-icon"
      icon="filter_list"
    >
    </mwc-icon-button>
    <mwc-menu
      class="actions-menu"
      corner="BOTTOM_RIGHT"
      menucorner="END"
      multi=""
    >
      <mwc-check-list-item
        aria-disabled="false"
        class="filter-subscribed"
        graphic="control"
        left=""
        mwc-list-item=""
        role="menuitem"
        selected=""
        tabindex="0"
      >
        <span>
          [subscription.subscriber.subscribed]
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="filter-not-subscribed"
        graphic="control"
        left=""
        mwc-list-item=""
        role="menuitem"
        selected=""
        tabindex="-1"
      >
        <span>
          [subscription.subscriber.notSubscribed]
        </span>
      </mwc-check-list-item>
    </mwc-menu>
  </h1>
  <filtered-list
    activatable=""
    class="control-block-list show-not-subscribed show-subscribed"
  >
    <mwc-list-item
      aria-disabled="false"
      class="control show-not-subscribed"
      graphic="icon"
      hasmeta=""
      noninteractive=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>fullSmv
                        AmpSv.instMag.i
                        CurrentTransformer / L3 TCTR 1
                        SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L3 TCTR 1.AmpSv instMag.i (MX)
                        AmpSv.q
                        CurrentTransformer / L3 TCTR 1
                        SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L3 TCTR 1.AmpSv q (MX)
                        AmpSv.instMag.i
                        CurrentTransformer / L2 TCTR 1
                        SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L2 TCTR 1.AmpSv instMag.i (MX)
                        AmpSv.q
                        CurrentTransformer / L2 TCTR 1
                        SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L2 TCTR 1.AmpSv q (MX)
                        AmpSv.instMag.i
                        CurrentTransformer / L1 TCTR 1
                        SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L1 TCTR 1.AmpSv instMag.i (MX)
                        AmpSv.q
                        CurrentTransformer / L1 TCTR 1
                        SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L1 TCTR 1.AmpSv q (MX)
                        VolSv.instMag.i
                        VoltageTransformer / L3 TVTR 1
                        SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>VoltageTransformer/L3 TVTR 1.VolSv instMag.i (MX)
                        VolSv.q
                        VoltageTransformer / L3 TVTR 1
                        SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>VoltageTransformer/L3 TVTR 1.VolSv q (MX)
                        VolSv.instMag.i
                        VoltageTransformer / L2 TVTR 1
                        SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>VoltageTransformer/L2 TVTR 1.VolSv instMag.i (MX)
                        VolSv.q
                        VoltageTransformer / L2 TVTR 1
                        SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>VoltageTransformer/L2 TVTR 1.VolSv q (MX)
                        VolSv.instMag.i
                        VoltageTransformer / L1 TVTR 1
                        SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>VoltageTransformer/L1 TVTR 1.VolSv instMag.i (MX)
                        VolSv.q
                        VoltageTransformer / L1 TVTR 1
                        SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>VoltageTransformer/L1 TVTR 1.VolSv q (MX)"
    >
      <mwc-icon-button
        class="interactive"
        icon="edit"
        slot="meta"
      >
      </mwc-icon-button>
      <span>
        fullSmv
      </span>
      <span slot="secondary">
        SMV_Publisher>>CurrentTransformer>fullSmv
      </span>
      <mwc-icon slot="graphic">
      </mwc-icon>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="0"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>fullSmv
             SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L3 TCTR 1.AmpSv instMag.i (MX)"
    >
      <span>
        AmpSv.instMag.i
      </span>
      <span slot="secondary">
        CurrentTransformer / L3 TCTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>fullSmv
             SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L3 TCTR 1.AmpSv q (MX)"
    >
      <span>
        AmpSv.q
      </span>
      <span slot="secondary">
        CurrentTransformer / L3 TCTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>fullSmv
             SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L2 TCTR 1.AmpSv instMag.i (MX)"
    >
      <span>
        AmpSv.instMag.i
      </span>
      <span slot="secondary">
        CurrentTransformer / L2 TCTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>fullSmv
             SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L2 TCTR 1.AmpSv q (MX)"
    >
      <span>
        AmpSv.q
      </span>
      <span slot="secondary">
        CurrentTransformer / L2 TCTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>fullSmv
             SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L1 TCTR 1.AmpSv instMag.i (MX)"
    >
      <span>
        AmpSv.instMag.i
      </span>
      <span slot="secondary">
        CurrentTransformer / L1 TCTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>fullSmv
             SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>CurrentTransformer/L1 TCTR 1.AmpSv q (MX)"
    >
      <span>
        AmpSv.q
      </span>
      <span slot="secondary">
        CurrentTransformer / L1 TCTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>fullSmv
             SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>VoltageTransformer/L3 TVTR 1.VolSv instMag.i (MX)"
    >
      <span>
        VolSv.instMag.i
      </span>
      <span slot="secondary">
        VoltageTransformer / L3 TVTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>fullSmv
             SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>VoltageTransformer/L3 TVTR 1.VolSv q (MX)"
    >
      <span>
        VolSv.q
      </span>
      <span slot="secondary">
        VoltageTransformer / L3 TVTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>fullSmv
             SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>VoltageTransformer/L2 TVTR 1.VolSv instMag.i (MX)"
    >
      <span>
        VolSv.instMag.i
      </span>
      <span slot="secondary">
        VoltageTransformer / L2 TVTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>fullSmv
             SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>VoltageTransformer/L2 TVTR 1.VolSv q (MX)"
    >
      <span>
        VolSv.q
      </span>
      <span slot="secondary">
        VoltageTransformer / L2 TVTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>fullSmv
             SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>VoltageTransformer/L1 TVTR 1.VolSv instMag.i (MX)"
    >
      <span>
        VolSv.instMag.i
      </span>
      <span slot="secondary">
        VoltageTransformer / L1 TVTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>fullSmv
             SMV_Publisher>>CurrentTransformer>fullSmvsDataSet>VoltageTransformer/L1 TVTR 1.VolSv q (MX)"
    >
      <span>
        VolSv.q
      </span>
      <span slot="secondary">
        VoltageTransformer / L1 TVTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="control show-not-subscribed show-subscribed"
      graphic="icon"
      hasmeta=""
      noninteractive=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>voltageOnly
                        VolSv.instMag.i
                        VoltageTransformer / L1 TVTR 1
                        SMV_Publisher>>CurrentTransformer>voltageOnlysDataSet>VoltageTransformer/L1 TVTR 1.VolSv instMag.i (MX)
                        VolSv.q
                        VoltageTransformer / L1 TVTR 1
                        SMV_Publisher>>CurrentTransformer>voltageOnlysDataSet>VoltageTransformer/L1 TVTR 1.VolSv q (MX)
                        VolSv.instMag.i
                        VoltageTransformer / L2 TVTR 1
                        SMV_Publisher>>CurrentTransformer>voltageOnlysDataSet>VoltageTransformer/L2 TVTR 1.VolSv instMag.i (MX)
                        VolSv.q
                        VoltageTransformer / L2 TVTR 1
                        SMV_Publisher>>CurrentTransformer>voltageOnlysDataSet>VoltageTransformer/L2 TVTR 1.VolSv q (MX)
                        VolSv.instMag.i
                        VoltageTransformer / L3 TVTR 1
                        SMV_Publisher>>CurrentTransformer>voltageOnlysDataSet>VoltageTransformer/L3 TVTR 1.VolSv instMag.i (MX)
                        VolSv.q
                        VoltageTransformer / L3 TVTR 1
                        SMV_Publisher>>CurrentTransformer>voltageOnlysDataSet>VoltageTransformer/L3 TVTR 1.VolSv q (MX)"
    >
      <mwc-icon-button
        class="interactive"
        icon="edit"
        slot="meta"
      >
      </mwc-icon-button>
      <span>
        voltageOnly
      </span>
      <span slot="secondary">
        SMV_Publisher>>CurrentTransformer>voltageOnly
      </span>
      <mwc-icon slot="graphic">
      </mwc-icon>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      class="show-subscribed subitem"
      graphic="large"
      hasmeta=""
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>voltageOnly
             SMV_Publisher>>CurrentTransformer>voltageOnlysDataSet>VoltageTransformer/L1 TVTR 1.VolSv instMag.i (MX)"
    >
      <span>
        VolSv.instMag.i
      </span>
      <span slot="secondary">
        VoltageTransformer / L1 TVTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
      <span slot="meta">
        1
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>voltageOnly
             SMV_Publisher>>CurrentTransformer>voltageOnlysDataSet>VoltageTransformer/L1 TVTR 1.VolSv q (MX)"
    >
      <span>
        VolSv.q
      </span>
      <span slot="secondary">
        VoltageTransformer / L1 TVTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>voltageOnly
             SMV_Publisher>>CurrentTransformer>voltageOnlysDataSet>VoltageTransformer/L2 TVTR 1.VolSv instMag.i (MX)"
    >
      <span>
        VolSv.instMag.i
      </span>
      <span slot="secondary">
        VoltageTransformer / L2 TVTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>voltageOnly
             SMV_Publisher>>CurrentTransformer>voltageOnlysDataSet>VoltageTransformer/L2 TVTR 1.VolSv q (MX)"
    >
      <span>
        VolSv.q
      </span>
      <span slot="secondary">
        VoltageTransformer / L2 TVTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>voltageOnly
             SMV_Publisher>>CurrentTransformer>voltageOnlysDataSet>VoltageTransformer/L3 TVTR 1.VolSv instMag.i (MX)"
    >
      <span>
        VolSv.instMag.i
      </span>
      <span slot="secondary">
        VoltageTransformer / L3 TVTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>voltageOnly
             SMV_Publisher>>CurrentTransformer>voltageOnlysDataSet>VoltageTransformer/L3 TVTR 1.VolSv q (MX)"
    >
      <span>
        VolSv.q
      </span>
      <span slot="secondary">
        VoltageTransformer / L3 TVTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="control show-not-subscribed show-subscribed"
      graphic="icon"
      hasmeta=""
      noninteractive=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>currentOnly
                        AmpSv.instMag.i
                        CurrentTransformer / L1 TCTR 1
                        SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L1 TCTR 1.AmpSv instMag.i (MX)
                        AmpSv.q
                        CurrentTransformer / L1 TCTR 1
                        SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L1 TCTR 1.AmpSv q (MX)
                        AmpSv.instMag.i
                        CurrentTransformer / L2 TCTR 1
                        SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L2 TCTR 1.AmpSv instMag.i (MX)
                        AmpSv.q
                        CurrentTransformer / L2 TCTR 1
                        SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L2 TCTR 1.AmpSv q (MX)
                        AmpSv.instMag.i
                        CurrentTransformer / L3 TCTR 1
                        SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L3 TCTR 1.AmpSv instMag.i (MX)
                        AmpSv.q
                        CurrentTransformer / L3 TCTR 1
                        SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L3 TCTR 1.AmpSv q (MX)"
    >
      <mwc-icon-button
        class="interactive"
        icon="edit"
        slot="meta"
      >
      </mwc-icon-button>
      <span>
        currentOnly
      </span>
      <span slot="secondary">
        SMV_Publisher>>CurrentTransformer>currentOnly
      </span>
      <mwc-icon slot="graphic">
      </mwc-icon>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      class="show-subscribed subitem"
      graphic="large"
      hasmeta=""
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>currentOnly
             SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L1 TCTR 1.AmpSv instMag.i (MX)"
    >
      <span>
        AmpSv.instMag.i
      </span>
      <span slot="secondary">
        CurrentTransformer / L1 TCTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
      <span slot="meta">
        1
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-subscribed subitem"
      graphic="large"
      hasmeta=""
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>currentOnly
             SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L1 TCTR 1.AmpSv q (MX)"
    >
      <span>
        AmpSv.q
      </span>
      <span slot="secondary">
        CurrentTransformer / L1 TCTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
      <span slot="meta">
        3
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>currentOnly
             SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L2 TCTR 1.AmpSv instMag.i (MX)"
    >
      <span>
        AmpSv.instMag.i
      </span>
      <span slot="secondary">
        CurrentTransformer / L2 TCTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>currentOnly
             SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L2 TCTR 1.AmpSv q (MX)"
    >
      <span>
        AmpSv.q
      </span>
      <span slot="secondary">
        CurrentTransformer / L2 TCTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>currentOnly
             SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L3 TCTR 1.AmpSv instMag.i (MX)"
    >
      <span>
        AmpSv.instMag.i
      </span>
      <span slot="secondary">
        CurrentTransformer / L3 TCTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="SMV_Publisher>>CurrentTransformer>currentOnly
             SMV_Publisher>>CurrentTransformer>currentOnlysDataSet>CurrentTransformer/L3 TCTR 1.AmpSv q (MX)"
    >
      <span>
        AmpSv.q
      </span>
      <span slot="secondary">
        CurrentTransformer / L3 TCTR 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot fcda-binding-list with a SampledValueControl doc loaded looks like the latest snapshot */

snapshots["fcda-binding-list with a GSEControl doc loaded looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    [subscription.GSEControl.controlBlockList.title]
    <mwc-icon-button
      class="actions-menu-icon"
      icon="filter_list"
    >
    </mwc-icon-button>
    <mwc-menu
      class="actions-menu"
      corner="BOTTOM_RIGHT"
      menucorner="END"
      multi=""
    >
      <mwc-check-list-item
        aria-disabled="false"
        class="filter-subscribed"
        graphic="control"
        left=""
        mwc-list-item=""
        role="menuitem"
        selected=""
        tabindex="0"
      >
        <span>
          [subscription.subscriber.subscribed]
        </span>
      </mwc-check-list-item>
      <mwc-check-list-item
        aria-disabled="false"
        class="filter-not-subscribed"
        graphic="control"
        left=""
        mwc-list-item=""
        role="menuitem"
        selected=""
        tabindex="-1"
      >
        <span>
          [subscription.subscriber.notSubscribed]
        </span>
      </mwc-check-list-item>
    </mwc-menu>
  </h1>
  <filtered-list
    activatable=""
    class="control-block-list show-not-subscribed show-subscribed"
  >
    <mwc-list-item
      aria-disabled="false"
      class="control show-subscribed"
      graphic="icon"
      hasmeta=""
      noninteractive=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Publisher>>QB2_Disconnector>GOOSE2
                        Pos.stVal
                        QB2_Disconnector / CSWI 1
                        GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos stVal (ST)
                        Pos.q
                        QB2_Disconnector / CSWI 1
                        GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos q (ST)
                        EnaOpn.stVal
                        QB1_Disconnector / CILO 1
                        GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB1_Disconnector/ CILO 1.EnaOpn stVal (ST)
                        EnaCls.stVal
                        QB1_Disconnector / CILO 1
                        GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB1_Disconnector/ CILO 1.EnaCls stVal (ST)
                        EnaOpn.stVal
                        QB2_Disconnector / CILO 1
                        GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CILO 1.EnaOpn stVal (ST)"
    >
      <mwc-icon-button
        class="interactive"
        icon="edit"
        slot="meta"
      >
      </mwc-icon-button>
      <span>
        GOOSE2
      </span>
      <span slot="secondary">
        GOOSE_Publisher>>QB2_Disconnector>GOOSE2
      </span>
      <mwc-icon slot="graphic">
      </mwc-icon>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      class="show-subscribed subitem"
      graphic="large"
      hasmeta=""
      mwc-list-item=""
      tabindex="0"
      twoline=""
      value="GOOSE_Publisher>>QB2_Disconnector>GOOSE2
             GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos stVal (ST)"
    >
      <span>
        Pos.stVal
      </span>
      <span slot="secondary">
        QB2_Disconnector / CSWI 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
      <span slot="meta">
        1
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-subscribed subitem"
      graphic="large"
      hasmeta=""
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Publisher>>QB2_Disconnector>GOOSE2
             GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CSWI 1.Pos q (ST)"
    >
      <span>
        Pos.q
      </span>
      <span slot="secondary">
        QB2_Disconnector / CSWI 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
      <span slot="meta">
        2
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-subscribed subitem"
      graphic="large"
      hasmeta=""
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Publisher>>QB2_Disconnector>GOOSE2
             GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB1_Disconnector/ CILO 1.EnaOpn stVal (ST)"
    >
      <span>
        EnaOpn.stVal
      </span>
      <span slot="secondary">
        QB1_Disconnector / CILO 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
      <span slot="meta">
        1
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-subscribed subitem"
      graphic="large"
      hasmeta=""
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Publisher>>QB2_Disconnector>GOOSE2
             GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB1_Disconnector/ CILO 1.EnaCls stVal (ST)"
    >
      <span>
        EnaCls.stVal
      </span>
      <span slot="secondary">
        QB1_Disconnector / CILO 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
      <span slot="meta">
        1
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-subscribed subitem"
      graphic="large"
      hasmeta=""
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Publisher>>QB2_Disconnector>GOOSE2
             GOOSE_Publisher>>QB2_Disconnector>GOOSE2sDataSet>QB2_Disconnector/ CILO 1.EnaOpn stVal (ST)"
    >
      <span>
        EnaOpn.stVal
      </span>
      <span slot="secondary">
        QB2_Disconnector / CILO 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
      <span slot="meta">
        1
      </span>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="control show-not-subscribed"
      graphic="icon"
      hasmeta=""
      noninteractive=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Publisher>>QB2_Disconnector>GOOSE1
                        Pos.stVal
                        QB1_Disconnector / CSWI 1
                        GOOSE_Publisher>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos stVal (ST)
                        Pos.q
                        QB1_Disconnector / CSWI 1
                        GOOSE_Publisher>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos q (ST)"
    >
      <mwc-icon-button
        class="interactive"
        icon="edit"
        slot="meta"
      >
      </mwc-icon-button>
      <span>
        GOOSE1
      </span>
      <span slot="secondary">
        GOOSE_Publisher>>QB2_Disconnector>GOOSE1
      </span>
      <mwc-icon slot="graphic">
      </mwc-icon>
    </mwc-list-item>
    <li
      divider=""
      role="separator"
    >
    </li>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Publisher>>QB2_Disconnector>GOOSE1
             GOOSE_Publisher>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos stVal (ST)"
    >
      <span>
        Pos.stVal
      </span>
      <span slot="secondary">
        QB1_Disconnector / CSWI 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
    <mwc-list-item
      aria-disabled="false"
      class="show-not-subscribed subitem"
      graphic="large"
      mwc-list-item=""
      tabindex="-1"
      twoline=""
      value="GOOSE_Publisher>>QB2_Disconnector>GOOSE1
             GOOSE_Publisher>>QB2_Disconnector>GOOSE1sDataSet>QB1_Disconnector/ CSWI 1.Pos q (ST)"
    >
      <span>
        Pos.q
      </span>
      <span slot="secondary">
        QB1_Disconnector / CSWI 1
      </span>
      <mwc-icon slot="graphic">
        subdirectory_arrow_right
      </mwc-icon>
    </mwc-list-item>
  </filtered-list>
</section>
`;
/* end snapshot fcda-binding-list with a GSEControl doc loaded looks like the latest snapshot */

