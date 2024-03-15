/* @web/test-runner snapshot v1 */
export const snapshots = {};

snapshots["GOOSE subscriber plugin in Publisher view per default the plugin itself looks like the latest snapshot"] = 
`<div>
  <mwc-formfield label="Publisher | Subscriber">
    <mwc-radio
      checked=""
      id="goosePublisherView"
      name="view"
      value="goose"
    >
    </mwc-radio>
  </mwc-formfield>
  <mwc-formfield label="Subscriber | Publisher">
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
`;
/* end snapshot GOOSE subscriber plugin in Publisher view per default the plugin itself looks like the latest snapshot */

snapshots["GOOSE subscriber plugin in Publisher view per default the right hand side GSEControl list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    GOOSE Publishers
  </h1>
  <filtered-list activatable="">
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      noninteractive=""
      tabindex="-1"
      value="IED1>>CircuitBreaker_CB1>GCB"
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
      value="IED1>>CircuitBreaker_CB1>GCB"
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
      value="IED2>>CBSW>GCB"
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
      value="IED2>>CBSW>GCB"
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
      value=""
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
      value="IED4>>CircuitBreaker_CB1>GCB"
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
      value="IED4>>CircuitBreaker_CB1>GCB"
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
  </filtered-list>
</section>
`;
/* end snapshot GOOSE subscriber plugin in Publisher view per default the right hand side GSEControl list looks like the latest snapshot */

snapshots["GOOSE subscriber plugin in Publisher view per default the left hand side subscriber IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    IEDs subscribed to GOOSE
  </h1>
  <mwc-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
    >
      <span>
        No control block selected
      </span>
    </mwc-list-item>
  </mwc-list>
</section>
`;
/* end snapshot GOOSE subscriber plugin in Publisher view per default the left hand side subscriber IED list looks like the latest snapshot */

snapshots["GOOSE subscriber plugin in Publisher view with a selected GOOSE message the left hand side subscriber IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    IEDs subscribed to IED2 > GCB
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED1"
      >
        <span>
          Subscribed
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
        <mwc-icon
          slot="meta"
          title="IED1>>CircuitBreaker_CB1> LGOS 1"
        >
          monitor_heart
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Partially subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED3 IED4"
      >
        <span>
          Available to subscribe
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
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
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
    </filtered-list>
  </div>
</section>
`;
/* end snapshot GOOSE subscriber plugin in Publisher view with a selected GOOSE message the left hand side subscriber IED list looks like the latest snapshot */

snapshots["GOOSE subscriber plugin in Publisher view with a selected GOOSE message for unsubscribed IEDs after clicking on the IEDs list element the left hand side subscriber IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    IEDs subscribed to IED2 > GCB
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED1 IED3"
      >
        <span>
          Subscribed
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
        <mwc-icon
          slot="meta"
          title="IED1>>CircuitBreaker_CB1> LGOS 1"
        >
          monitor_heart
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        graphic="avatar"
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
        value=""
      >
        <span>
          Partially subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED4"
      >
        <span>
          Available to subscribe
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        aria-selected="true"
        graphic="avatar"
        mwc-list-item=""
        selected=""
        tabindex="0"
      >
        <span>
          IED4
        </span>
        <mwc-icon slot="graphic">
          add
        </mwc-icon>
      </mwc-list-item>
    </filtered-list>
  </div>
</section>
`;
/* end snapshot GOOSE subscriber plugin in Publisher view with a selected GOOSE message for unsubscribed IEDs after clicking on the IEDs list element the left hand side subscriber IED list looks like the latest snapshot */

snapshots["GOOSE subscriber plugin in Publisher view with a selected GOOSE message for subscribed IEDs after clicking on the IEDs list element looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    IEDs subscribed to IED2 > GCB
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED1"
      >
        <span>
          Subscribed
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        aria-selected="true"
        graphic="avatar"
        hasmeta=""
        mwc-list-item=""
        selected=""
        tabindex="0"
      >
        <span>
          IED1
        </span>
        <mwc-icon slot="graphic">
          clear
        </mwc-icon>
        <mwc-icon
          slot="meta"
          title="IED1>>CircuitBreaker_CB1> LGOS 1"
        >
          monitor_heart
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Partially subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED3 IED4"
      >
        <span>
          Available to subscribe
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
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
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
    </filtered-list>
  </div>
</section>
`;
/* end snapshot GOOSE subscriber plugin in Publisher view with a selected GOOSE message for subscribed IEDs after clicking on the IEDs list element looks like the latest snapshot */

snapshots["GOOSE subscriber plugin in Publisher view with a selected GOOSE message for partially subscribed IEDs after clicking on the IEDs list element it looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    IEDs subscribed to IED2 > GCB
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED1"
      >
        <span>
          Subscribed
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
        <mwc-icon
          slot="meta"
          title="IED1>>CircuitBreaker_CB1> LGOS 1"
        >
          monitor_heart
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Partially subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED3 IED4"
      >
        <span>
          Available to subscribe
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
      <mwc-list-item
        aria-disabled="false"
        aria-selected="true"
        graphic="avatar"
        mwc-list-item=""
        selected=""
        tabindex="0"
      >
        <span>
          IED4
        </span>
        <mwc-icon slot="graphic">
          add
        </mwc-icon>
      </mwc-list-item>
    </filtered-list>
  </div>
</section>
`;
/* end snapshot GOOSE subscriber plugin in Publisher view with a selected GOOSE message for partially subscribed IEDs after clicking on the IEDs list element it looks like the latest snapshot */

snapshots["GOOSE subscriber plugin in Subscriber view per default the plugin itsself looks like the latest snapshot"] = 
`<div>
  <mwc-formfield label="Publisher | Subscriber">
    <mwc-radio
      id="goosePublisherView"
      name="view"
      value="goose"
    >
    </mwc-radio>
  </mwc-formfield>
  <mwc-formfield label="Subscriber | Publisher">
    <mwc-radio
      checked=""
      id="gooseSubscriberView"
      name="view"
      value="ied"
    >
    </mwc-radio>
  </mwc-formfield>
  <div class="container">
    <ied-list
      class="row"
      servicetype="goose"
    >
    </ied-list>
    <subscriber-list-goose class="row">
    </subscriber-list-goose>
  </div>
</div>
`;
/* end snapshot GOOSE subscriber plugin in Subscriber view per default the plugin itsself looks like the latest snapshot */

snapshots["GOOSE subscriber plugin in Subscriber view per default the right hand side IEDs list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    GOOSE Subscribers
  </h1>
  <filtered-list activatable="">
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
/* end snapshot GOOSE subscriber plugin in Subscriber view per default the right hand side IEDs list looks like the latest snapshot */

snapshots["GOOSE subscriber plugin in Subscriber view per default the left hand side subscriber IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    GOOSE Messages subscribed to IED
  </h1>
  <mwc-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
    >
      <span>
        No IED selected
      </span>
    </mwc-list-item>
  </mwc-list>
</section>
`;
/* end snapshot GOOSE subscriber plugin in Subscriber view per default the left hand side subscriber IED list looks like the latest snapshot */

snapshots["GOOSE subscriber plugin in Subscriber view with a selected IED the left hand side subscriber IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    GOOSE Messages subscribed to IED2
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Partially subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED1>>CircuitBreaker_CB1>GCB IED4>>CircuitBreaker_CB1>GCB"
      >
        <span>
          Available to subscribe
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
        graphic="avatar"
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
/* end snapshot GOOSE subscriber plugin in Subscriber view with a selected IED the left hand side subscriber IED list looks like the latest snapshot */

snapshots["GOOSE subscriber plugin in Subscriber view with a selected IED for unsubscribed GSEControl s clicking on a GSEControl list item the left hand side subscriber IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    GOOSE Messages subscribed to IED2
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Partially subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED1>>CircuitBreaker_CB1>GCB IED4>>CircuitBreaker_CB1>GCB"
      >
        <span>
          Available to subscribe
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
        aria-selected="true"
        graphic="avatar"
        mwc-list-item=""
        selected=""
        tabindex="0"
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
/* end snapshot GOOSE subscriber plugin in Subscriber view with a selected IED for unsubscribed GSEControl s clicking on a GSEControl list item the left hand side subscriber IED list looks like the latest snapshot */

snapshots["GOOSE subscriber plugin in Subscriber view with a selected IED for subscribed GSEControl s clicking on the GSEControl list item the left hand side subscriber IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    GOOSE Messages subscribed to IED2
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED4>>CircuitBreaker_CB1>GCB"
      >
        <span>
          Subscribed
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        aria-selected="true"
        graphic="avatar"
        mwc-list-item=""
        selected=""
        tabindex="0"
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
        value=""
      >
        <span>
          Partially subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED1>>CircuitBreaker_CB1>GCB"
      >
        <span>
          Available to subscribe
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
    </filtered-list>
  </div>
</section>
`;
/* end snapshot GOOSE subscriber plugin in Subscriber view with a selected IED for subscribed GSEControl s clicking on the GSEControl list item the left hand side subscriber IED list looks like the latest snapshot */

snapshots["GOOSE subscriber plugin in Subscriber view with a selected IED for partially subscribed GSEControl s clicking on the GSEControl list item the left hand side subscriber IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    GOOSE Messages subscribed to IED2
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Partially subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED1>>CircuitBreaker_CB1>GCB IED4>>CircuitBreaker_CB1>GCB"
      >
        <span>
          Available to subscribe
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        aria-selected="true"
        graphic="avatar"
        mwc-list-item=""
        selected=""
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
        graphic="avatar"
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
/* end snapshot GOOSE subscriber plugin in Subscriber view with a selected IED for partially subscribed GSEControl s clicking on the GSEControl list item the left hand side subscriber IED list looks like the latest snapshot */

snapshots["in Publisher view per default the plugin itself looks like the latest snapshot"] = 
`<div>
  <mwc-formfield label="Publisher | Subscriber">
    <mwc-radio
      checked=""
      id="goosePublisherView"
      name="view"
      value="goose"
    >
    </mwc-radio>
  </mwc-formfield>
  <mwc-formfield label="Subscriber | Publisher">
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
`;
/* end snapshot in Publisher view per default the plugin itself looks like the latest snapshot */

snapshots["in Publisher view per default the right hand side GSEControl list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    GOOSE Publishers
  </h1>
  <filtered-list activatable="">
    <mwc-list-item
      aria-disabled="false"
      graphic="icon"
      noninteractive=""
      tabindex="-1"
      value="IED1>>CircuitBreaker_CB1>GCB"
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
      value="IED1>>CircuitBreaker_CB1>GCB"
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
      value="IED2>>CBSW>GCB"
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
      value="IED2>>CBSW>GCB"
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
      value=""
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
      value="IED4>>CircuitBreaker_CB1>GCB"
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
      value="IED4>>CircuitBreaker_CB1>GCB"
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
  </filtered-list>
</section>
`;
/* end snapshot in Publisher view per default the right hand side GSEControl list looks like the latest snapshot */

snapshots["in Publisher view per default the left hand side subscriber IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    IEDs subscribed to GOOSE
  </h1>
  <mwc-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
    >
      <span>
        No control block selected
      </span>
    </mwc-list-item>
  </mwc-list>
</section>
`;
/* end snapshot in Publisher view per default the left hand side subscriber IED list looks like the latest snapshot */

snapshots["in Publisher view with a selected GOOSE message the left hand side subscriber IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    IEDs subscribed to IED2 > GCB
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED1"
      >
        <span>
          Subscribed
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
        <mwc-icon
          slot="meta"
          title="IED1>>CircuitBreaker_CB1> LGOS 1"
        >
          monitor_heart
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Partially subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED3 IED4"
      >
        <span>
          Available to subscribe
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
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
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
    </filtered-list>
  </div>
</section>
`;
/* end snapshot in Publisher view with a selected GOOSE message the left hand side subscriber IED list looks like the latest snapshot */

snapshots["in Publisher view with a selected GOOSE message for unsubscribed IEDs after clicking on the IEDs list element the left hand side subscriber IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    IEDs subscribed to IED2 > GCB
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED1 IED3"
      >
        <span>
          Subscribed
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
        <mwc-icon
          slot="meta"
          title="IED1>>CircuitBreaker_CB1> LGOS 1"
        >
          monitor_heart
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        aria-selected="false"
        graphic="avatar"
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
        value=""
      >
        <span>
          Partially subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED4"
      >
        <span>
          Available to subscribe
        </span>
      </mwc-list-item>
      <li
        divider=""
        role="separator"
      >
      </li>
      <mwc-list-item
        aria-disabled="false"
        aria-selected="true"
        graphic="avatar"
        mwc-list-item=""
        selected=""
        tabindex="-1"
      >
        <span>
          IED4
        </span>
        <mwc-icon slot="graphic">
          add
        </mwc-icon>
      </mwc-list-item>
    </filtered-list>
  </div>
</section>
`;
/* end snapshot in Publisher view with a selected GOOSE message for unsubscribed IEDs after clicking on the IEDs list element the left hand side subscriber IED list looks like the latest snapshot */

snapshots["in Publisher view with a selected GOOSE message for subscribed IEDs after clicking on the IEDs list element looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    IEDs subscribed to IED2 > GCB
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Partially subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED1 IED3 IED4"
      >
        <span>
          Available to subscribe
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
        aria-disabled="false"
        graphic="avatar"
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
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
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
    </filtered-list>
  </div>
</section>
`;
/* end snapshot in Publisher view with a selected GOOSE message for subscribed IEDs after clicking on the IEDs list element looks like the latest snapshot */

snapshots["in Publisher view with a selected GOOSE message for partially subscribed IEDs after clicking on the IEDs list element it looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    IEDs subscribed to IED2 > GCB
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED1 IED4"
      >
        <span>
          Subscribed
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
        <mwc-icon
          slot="meta"
          title="IED1>>CircuitBreaker_CB1> LGOS 1"
        >
          monitor_heart
        </mwc-icon>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        graphic="avatar"
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
        value=""
      >
        <span>
          Partially subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED3"
      >
        <span>
          Available to subscribe
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
/* end snapshot in Publisher view with a selected GOOSE message for partially subscribed IEDs after clicking on the IEDs list element it looks like the latest snapshot */

snapshots["in Subscriber view per default the plugin itsself looks like the latest snapshot"] = 
`<div>
  <mwc-formfield label="Publisher | Subscriber">
    <mwc-radio
      id="goosePublisherView"
      name="view"
      value="goose"
    >
    </mwc-radio>
  </mwc-formfield>
  <mwc-formfield label="Subscriber | Publisher">
    <mwc-radio
      checked=""
      id="gooseSubscriberView"
      name="view"
      value="ied"
    >
    </mwc-radio>
  </mwc-formfield>
  <div class="container">
    <ied-list
      class="row"
      servicetype="goose"
    >
    </ied-list>
    <subscriber-list-goose class="row">
    </subscriber-list-goose>
  </div>
</div>
`;
/* end snapshot in Subscriber view per default the plugin itsself looks like the latest snapshot */

snapshots["in Subscriber view per default the right hand side IEDs list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    GOOSE Subscribers
  </h1>
  <filtered-list activatable="">
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
/* end snapshot in Subscriber view per default the right hand side IEDs list looks like the latest snapshot */

snapshots["in Subscriber view per default the left hand side subscriber IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    GOOSE Messages subscribed to IED
  </h1>
  <mwc-list>
    <mwc-list-item
      aria-disabled="false"
      noninteractive=""
      tabindex="-1"
    >
      <span>
        No IED selected
      </span>
    </mwc-list-item>
  </mwc-list>
</section>
`;
/* end snapshot in Subscriber view per default the left hand side subscriber IED list looks like the latest snapshot */

snapshots["in Subscriber view with a selected IED the left hand side subscriber IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    GOOSE Messages subscribed to IED2
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Partially subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED1>>CircuitBreaker_CB1>GCB IED4>>CircuitBreaker_CB1>GCB"
      >
        <span>
          Available to subscribe
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
        graphic="avatar"
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
/* end snapshot in Subscriber view with a selected IED the left hand side subscriber IED list looks like the latest snapshot */

snapshots["in Subscriber view with a selected IED for subscribed GSEControl s clicking on the GSEControl list item the left hand side subscriber IED list looks like the latest snapshot"] = 
`<section tabindex="0">
  <h1>
    GOOSE Messages subscribed to IED2
  </h1>
  <div class="wrapper">
    <filtered-list>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value=""
      >
        <span>
          Partially subscribed
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
          None
        </span>
      </mwc-list-item>
      <mwc-list-item
        aria-disabled="false"
        noninteractive=""
        tabindex="-1"
        value="IED1>>CircuitBreaker_CB1>GCB IED4>>CircuitBreaker_CB1>GCB"
      >
        <span>
          Available to subscribe
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
        graphic="avatar"
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
/* end snapshot in Subscriber view with a selected IED for subscribed GSEControl s clicking on the GSEControl list item the left hand side subscriber IED list looks like the latest snapshot */

