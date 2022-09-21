By default the function structure is hidden. You can un-hide it using the toggle button **Filter function type element** on the upper corner of the **Substation** editor.

<img width="300" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183363763-d9bcd212-4374-4e60-a4d8-9167156a1f8a.png">

The elements `Function`, `SubFunction`, `EqFunction` and `EqSubFunction` can be allocated in specific parent elements only each in others. OpenSCD guides you here. Click the more add button of the parent element and see if any of the options is shown like so for **Function**

<img width="350" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183364768-869b6654-25a7-47c2-ad0f-a5382e953b55.png">

or so for **EqFunction**

<img width="350" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183364886-28fca8b8-c5af-44ed-a352-a211f5f05761.png">

&nbsp;

**Function type element wizards**
<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183365686-f4f78d0d-4c32-4aaa-be00-ad53e19ec8df.png">

All wizards for the elements `Function`, `SubFunction`, `EqFunction` and `EqSubFunction` have the same attributes and the same restrictions. (see **Add Function** as representative for the others as well)
The wizard dialog allows to add all tree attributes:

- `name`: name of the function
- `desc`: human readable description of the function
- `type`: user definable function type

&nbsp;

**Create Function**

To crate a new `Function` element

1. select a correct parent e.g. `Bay`
2. click on the **add more** button
3. click on **Function**
4. add at least **name** and click **Save**

**Edit Function**

To edit `Function` element

1. select the Function element within the **Substation** editor
2. click on the **edit** button
3. do the changes and click **Save**

&nbsp;

**Create SubFunction**

To crate a new `SubFunction` element

1. select a correct parent `Function` or `SubFunction`
2. click on the **add more** button
3. click on **SubFunction**
4. add at least **name** and click **Save**

**Edit SubFunction**

To edit `SubFunction` element

1. select the **SubFunction** element within the **Substation** editor
2. click on the **edit** button
3. do the changes and click **Save**

&nbsp;

**Create EqFunction**

To crate a new `EqFunction` element

1. select a correct parent e.g. `ConductingEquipment`
2. click on the **add more** button
3. click on **EqFunction**
4. add at least **name** and click **Save**

**Edit EqFunction**

To edit `EqFunction` element

1. select the **EqFunction** element within the **Substation** editor
2. click on the **edit** button
3. do the changes and click **Save**

&nbsp;

**Create EqSubFunction**

To crate a new `EqSubFunction` element

1. select a correct parent `EqFunction` or `EqSubFunction`
2. click on the **add more** button
3. click on **EqSubFunction**
4. add at least **name** and click **Save**

**Edit EqSubFunction**

To edit `EqSubFunction` element

1. select the **EQSubFunction** element within the **Substation** editor
2. click on the **edit** button
3. do the changes and click **Save**
