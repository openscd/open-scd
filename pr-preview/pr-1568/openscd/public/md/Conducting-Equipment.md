**Create ConductingEquipment**

<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183962761-e5b168bd-94b0-4200-baaa-824e9511aa3a.png">

To create a new `ConductingEquipment` element within the parent `Bay`

- Navigate to the **Substation** editor
- Select the parent **Bay** you want to add the conducting equipment to
- Select the type
- Fill in all required values
- Click on **Add**

The create wizard allows to set

- `type`: the standard IEC 61850 defines a set of types the user can choose from
- `name`: unique identified of the conducting equipment in the parent `Bay`
- `desc`: human readable description

**Edit ConductingEquipment**

<img width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183963460-6b7e4e5a-5612-441e-bca8-6cd354f1feda.png">

To edit a `ConductingEquipment` element:

- Navigate to the **Substation** editor
- Select the **ConductingEquipment** you want to edit
- Click on the **edit** button
- Make the changes and click **Save**

The element `ConductingEquipment` has two attributes

- `name`: unique identified of the Bay in the parent `Bay`
- `desc`: human readable description
- `type`: cannot be edit!

**Remove ConductingEquipment**

To remove an existing `ConductingEquipment` element within the parent `Bay`

- Navigate to the **Substation** editor
- Select the **ConductingEquipment** you want to remove
- Click on the **delete** button

> NOTE: OpenSCD does not support the definition of user defined conducting equipment types. This can only be manipulated through the code editor.
> NOTE: The **Earth Switch** is unfortunately not a type but a special version of `DIS`. It can be tagged to a earth switch through the data object `SwType` (an logical node reference to the logical node of class `XSWI`) must be present. Or it has a child `Terminal` with a `cNodeName = grounded`. Both those cases are recognized by OpenSCD and is displayed. When you create a new **Earth Switch** the second option is applied
