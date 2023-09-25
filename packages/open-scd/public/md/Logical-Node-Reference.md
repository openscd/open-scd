&nbsp;

Logical node references are not visible so long the function structure is filtered. (see [Function](https://github.com/openscd/open-scd/wiki/Function) for more detail). When the function structure is visible logical node references are renders using the first letter of the logical node class e.g. **P** for protection or **C** for control. The element is an action icon. You can click on it and see what action can be performed (edit, duplicate, remove)

**Edit Logical Node reference**

The wizard does not allow you to manipulate the logical node reference but it can give you a bit more insight into its structure for trouble shooting in falsy SCL files.

&nbsp;

**Remove Logical Node reference**

Removes the logical node reference from the parent element

&nbsp;

**Duplicate Logical Node reference**

This feature is allowed on logical node references with `iedName = None` (pointer into the data type template). It allows faster instantiate the same logical nodes from the data type templates section by cloning an already existing one and incrementing the logical node instance (`lnInst`). E.g. you need 7 zone for a distance protection. Each is a logical node of the class `PDIS`. You can then ad one using the create wizard and the others can be cloned with the duplicate feature.

&nbsp;

**Create Logical Node instance**

<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183967245-063e72aa-163a-44f6-b0ca-5c6aa1c7d106.png">

<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183966897-1bf30296-9132-4224-9fba-754a0f17c2dc.png">

To create a new logical node reference either

- click on the icon <img width="20" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183966575-b7b6aff3-db56-46b5-8aa1-f3f2786b460f.png">
  or
- navigate to the element you want to add the logical node reference to
- click on the **add more** icon
- Click on **LNode**

&nbsp;

**Reference to instantiated Logical Node in IED**

To create a reference ot a logical node within an IED you can navigate to any process structure type element in the substation section and click in the icon show in the beginning of the article. The wizard is constructed from two pages.

_Select IED_

Allows to select the IED you want to have the logical node from

_Select Logical Node_

Show all logical nodes form the selected IEDs on the first page. IEDs can have a lot of logical node references and we therefore recommend to use the filter function. You can filter for the IED the logical device as well as the prefix and the class of the logical node you want to reference. NOTE: If the logical node has been referenced to another element in the substation OpenSCD won't allow you to reference it twice.

&nbsp;

**Reference to typical Logical Node in DataTypeTemplates section**

<img width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183970914-4e49c7d7-b9b3-4b78-93db-236dcd76f5f8.png">

To create a reference to a template logical node in the data type templates section of the file navigate to one of the functional structure element like `Function` and click on the **add more** and click on **LNode**. The wizard has only one page that is showing all `LNodeType` elements with its `lnClass` and `id`.

> NOTE: You can select multiple templates but you cannot make multiple instance of one template in this wizard. See the duplicate feature in this article

> NOTE: You can navigate between the wizard to instantiate a new logical node and the one to reference to an instantiated logical node. Click on the **more vert** button on the upper right corner of the wizard and select the click on the proposed - other - wizard.

<img width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183976043-3e56acf7-641c-4568-a5af-546a599f7f0a.png">
<img width="220" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183976150-fcc738a6-8240-458d-988e-5b9e343e1e9f.png">
