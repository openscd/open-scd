**Open create wizard**

In order to get to the GOOSE Control Block

1. navigate to the **Substation** editor
2. click on the **G** icon button in the upper left corner
3. click in **GOOSE+**
4. select the `IED` you want to store the GOOSE in

or

1. navigate to the **Substation** editor
2. click one of the IEDs in the editor
3. click on the **G** action icon
4. click in **GOOSE+**

> NOTE: The `GSEControl` element, its child elements and its referenced `DataSet` element are saved to the first `LN0` element in the selected `IED`.

&nbsp;

This create wizard consists of three pages. All pages need to be filled properly to be able to add the GOOSE Control Block and its DataSet to the SCL. You can navigate between the pages using the buttons in the footer.

> NOTE: The **Save** button that adds the GOOSE Control Block to the SCL is on the last page.

&nbsp;

**GSEControl page**

<img align="right" width="200" alt="grafik" src="https://user-images.githubusercontent.com/66802940/182394365-fd4198ed-1775-440d-a4e7-a6d0bc8ee4d4.png">

This page contains a set of settings the server needs to have to be able to generate a GOOSE:

- `name`: The main identifier for the GOOSE within the SCL. The name must be unique for all `GSEControl` element in the same parent element. Does influence the GOOSE Control Block reference
- `desc`: optional string that is describing the `GSEControl` element
- `type`: Whether this control block is a `GOOSE` or `GSSE` type. The later one is deprecated!
- `appID`: a unique identifier for the GOOSE.
- `fixedOffs`: Allows to specify the type of encoding for the GOOSE. For more information see IEC 61850-8-1
- `securityEnabled`: The type of security measures the GOOSE has: encryption or/and signature or non of the two.

&nbsp;

<img width="300" alt="grafik" src="https://user-images.githubusercontent.com/66802940/182394792-72f37d6d-8e7b-4411-bf88-693ca6a85274.png">

**Communication page**

This page allows do define all communication related setting for the GOOSE. These information is saved to the `Communication` section.

1. `MAC-Address`: The destination MAC address of the GOOSE
2. `APPID`: The APPID of the GOOSE. This is recommended to be unique though out the complete project.
3. `VLAN-ID`: The virtual LAN ID the GOOSE shall be limited to.
4. `VLAN-PRIORITY`: The priority of the GOOSE message. It can be used to prioritise time-critical messages like trip signals over non-time-critical messages.
5. `MinTime`: The minimum time between two occurring GOOSEs when a e.g. a trip occurs
6. `MaxTime`: The maximum time between two occurring GOOSEs in case there is not trip.

**Data picker**

To define the data set a multi-select data picker is used in the last page of the create wizard. This allows you to select multiple data attributes at the same time. The exampled below picked the data attributes `general` and its quality information `q` from the data object `Op` the logical node `IP_ PTOC 1` and the logical device `ConvSS_DistProt_5051BackUpOC`.

![grafik](https://user-images.githubusercontent.com/66802940/182411370-0be711b6-3daa-43b1-9ec3-4d7f6eb115d0.png)

> NOTE: If no data is picked the `DataSet` is still created but is empty! You can add data using the edit wizard in a later stage.

&nbsp;
