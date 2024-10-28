The service called Sampled Values is designed to transmit current and voltage measurement data via Ethernet as defined in 9-2. Strictly there is also a way to do that using other connection mechanism as defined in the IEC 61850-9-1 but this is not described nor supported in OpenSCD.

Sampled Value Streams do not use TCP/IP but use multicast mechanism instead to be send to all communication participants in the same LAN/VLAN. Its sending (publishing) and its use (subscription) are therefore completely separated. That has its effect also on the configuration of Sampled Value related communication in the SCL.

**Publishing: Sampled Value Control Block (SampledValueControl)**

The configuration of Sampled Value publishers is done in the SCL element `SampledValueControl` and its referenced `DataSet` element. The reference to its `DataSet` is set through the attribute `datSet` in the `SampledValueControl` element.

> NOTE: `SampledValueControl` must reside in the `LN0` element and `SampledValueControl` and its referenced `DataSet` must have the same parent

A configuration of the publisher has three basics steps:

1. create control block: Create the element `SampledValueControl` or import SCL with pre-existing `SampledValueControl` elements
2. create data set: Create element `DataSet` in the same parent as the `SampledValueControl` and add data `FCDA` to it
3. combine control block and data set: Set the `datSet` attribute within the `SampledValueControl` element

**Publishing: Configuring Sampled Values with OpenSCD**

1. [Create Sampled Value Control Blocks and its DataSet](https://github.com/openscd/open-scd/wiki/Create-Sampled-Value-Control-Blocks)
2. [Edit Sampled Value Control Blocks and its DataSets](https://github.com/openscd/open-scd/wiki/Edit-Sampled-Value-Control-Blocks)

**Subscription: Basics**

See [Subscription basics](https://github.com/openscd/open-scd/wiki/Subscriber-basics)

**Subscription with OpenSCD**

See [Subscription complete Sampled Value Stream](https://github.com/openscd/open-scd/wiki/Subscribe-complete-SMV)
