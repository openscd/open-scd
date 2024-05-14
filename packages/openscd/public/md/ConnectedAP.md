The element `ConnectedAP` has only two attributes and `iedName` and `apName` that in combination are a pointer to the `AccessPoint` of an `IED`. The configuration of such an `ConnectedAP` is done inside the `Address` element.

The structure in the **Communication** editor does not completely follow the SCL. `ConnectedAP` are grouped inside IED containers to help the user to better filter the information. When you click on such an IED container you will find that `AccessPoint`s belonging to the same IED but connected to another subnetwork are disabled but visible too.

<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183641520-a77cd52d-4093-42ac-a306-89322ed75b5d.png">

&nbsp;

**Create ConnectedAP**

As the `ConnectedAP` is just a pointer to an existing access point. The amount and the structure is limited to the amount and structure of available access points. To help the user here OpenSCD does only allow to select a `ConnectedAP` rather to create one from scratch. If an access point has already an representation in the `Communication` section you can not select it again. To create a `ConnectedAP`

1. Navigate to the **Communication** section
2. Click in the **Add more** button of the **Subnetwork** you want to add the `ConnectedAP` element to
3. Select the access point you want to connect and click **Save**

&nbsp;

**Edit ConnectedAP**

<img width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183643564-c8291c91-9d99-41ee-8de8-e34d7ebbb7b8.png">

To configure an `ConnectedAP` element or to be more precise its `Address` child element

1. Navigate to the **Communication** section
2. Click in the **ConnectedAP** you want to edit
3. Click on the **edit** action button

> NOTE: For the various types of setting please refer to IEC 61850-6. The kind of types are summarized in [Communication basics](https://github.com/openscd/open-scd/wiki/Communication-Basics)

&nbsp;

**Remove ConnectedAP**

To create a `ConnectedAP`

1. Navigate to the **Communication** section
2. Click in the **ConnectedAP** you want to remove
3. Click on the **delete** action button
