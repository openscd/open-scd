The configuration of GOOSEs or to be more precise GOOSE Blocks is done on the SCL element `GSEControl`, its referenced `DataSet` element and its referenced `GSE` element allocated in the `Communication` section.
The schema does restrict the allocation of the element:

1. `GSEControl` must reside in the `LN0` element
2. `GSEControl` and its referenced `DataSet` must have the same parent

**Editing GOOSEs**

In OpenSCD `GSEControl` elements are configured using so-called wizards. There are three wizards combined that allow editing of GOOSE

<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/182388141-9818dc40-9d27-4fd1-bc24-a9f78b0f1304.png">

&nbsp;

The wizard contains a set of setting allocated in the element `GSEControl`:

- `name`: The main identifier for the GOOSE within the SCL. The name must be unique for all `GSEControl` element in the same parent element. Does influence the GOOSE Control Block reference
- `desc`: optional string that is describing the `GSEControl` element
- `type`: Whether this control block is a `GOOSE` or `GSSE` type. The later one is deprecated!
- `appID`: a unique identifier for the GOOSE.
- `fixedOffs`: Allows to specify the type of encoding for the GOOSE. For more information see IEC 61850-8-1
- `securityEnabled`: The type of security measures the GOOSE has: encryption or/and signature or non of the two.

To change any of the attributes you have to click on the **Save** button of the wizard.

&nbsp;

**Communication page**

<img width="250" alt="grafik"  src="https://user-images.githubusercontent.com/66802940/182598880-546ded95-63a4-429c-9ae1-24600e4e8500.png">

This page allows do define all communication related setting for the GOOSE. These information is saved to the `Communication` section.

1. `MAC-Address`: The destination MAC address of the GOOSE
2. `APPID`: The APPID of the GOOSE. This is recommended to be unique though out the complete project.
3. `VLAN-ID`: The virtual LAN ID the GOOSE shall be limited to.
4. `VLAN-PRIORITY`: The priority of the GOOSE message. It can be used to prioritise time-critical messages like trip signals over non-time-critical messages.
5. `MinTime`: The minimum time between two occurring GOOSEs when a e.g. a trip occurs
6. `MaxTime`: The maximum time between two occurring GOOSEs in case there is not trip.

&nbsp;

**Editing data set (DataSet)**

> See data set wizard

&nbsp;

**Navigating between wizard**

<img align="right" width="150" src="https://user-images.githubusercontent.com/66802940/182599062-dd5b6cbe-f530-4086-b364-a720968a85cf.png">

Each wizard represents one element in the SCL. To navigate between those click on the **more vert** icon button on the upper left corner. The pop up menu show various choices.

1. Remove the `GSEControl` element
   > NOTE: When the referenced `DataSet` element is referenced to this GOOSE only than this is removes as well
2. Opens the data set wizard for the `DataSet` referenced to this GOOSE
3. Opens the communication wizard
