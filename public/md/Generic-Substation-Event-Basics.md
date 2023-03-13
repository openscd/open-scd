The Generic Substation Event is a service class that has been designed to transmit data for time critical functions such as trip signals to circuit breakers. Its most prominent type is the Generic Object Oriented Substation Event GOOSE. The other one is the so-called GSSE but is deprecated.

The GOOSE is defined in the part IEC 61850-8-1. It is often applied to communicate between servers such as bay controller and switch gear control unit.

GOOSE does not use TCP/IP but uses a multicast mechanism instead to send to all communication participants in the same LAN/VLAN. Its sending (or publishing) and its use (or subscribing) are, therefore, completely separated. This has an impact on the way GOOSE-related communications are configured in the SCL.

**Publishing: GOOSE Control Block (GSEControl)**

The configuration of GOOSE publishers is done in the SCL element `GSEControl` and its referenced `DataSet` element. The reference to its `DataSet` is set through the attribute `datSet` in the `GSEControl` element.

> NOTE: `GSEControl` must reside in the `LN0` element and `GSEControl` and its referenced `DataSet` must have the same parent

1. create control block: Create the element `GSEControl` or import SCL with pre-existing `GSEControl` elements
2. create data set: Create element `DataSet` in the same parent as the `GSEControl` and add data `FCDA` to it
3. combine control block and data set: Set the `datSet` attribute within the `GSEControl` element

**Publishing: Configuring GOOSEs with OpenSCD**

1. [Create GOOSE Control Blocks and its DataSet](https://github.com/openscd/open-scd/wiki/Create-GOOSE-Control-Blocks)
2. [Edit GOOSE Control Blocks and its DataSets](https://github.com/openscd/open-scd/wiki/Edit-GOOSE-Control-Blocks)

**Subscription: Basics**
See [Subscription basics](https://github.com/openscd/open-scd/wiki/Subscriber-basics)

**Subscription with OpenSCD**
See [Subscription complete GOOSE](https://github.com/openscd/open-scd/wiki/Subscribe-complete-GOOSE)
