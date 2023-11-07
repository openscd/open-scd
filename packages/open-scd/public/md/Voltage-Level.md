**Create Voltage Level**

<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183957372-fbeafeda-9b33-4af6-bc8a-e9f3a14e152d.png">

To create a new `VoltageLevel` element within a `Substation` element

- Navigate to the **Substation** editor
- Select the **Substation** you want to add the voltage level to
- Click on the **Add mode** button on the upper right of the **Substation** pane
- Fill in all required value
- Click on **Add**

The create wizard allows to set

- `name`: unique identified of the voltage level in the parent substation
- `desc`: human readable description
- `nomFreq`: nominal frequency of the voltage level e.g. 50Hz/60Hz/16.6hz
- `numPhases`: number of phases
- `Voltage`: the voltage of the voltage level (combination of value and multiplier)

**Edit Voltage Level**

<img width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183958087-3b0150a5-efec-4988-b51c-10016a5b09c5.png">

To edit a `VoltageLevel` element:

- Navigate to the **Substation** editor
- Select the **VoltageLevel** you want to edit
- Click on the **edit** button
- Make the changes and click **Save**

The element `VoltageLevel` has four attributes

- `name`: unique identified of the voltage level in the parent substation
- `desc`: human readable description
- `nomFreq`: nominal frequency of the voltage level e.g. 50Hz/60Hz/16.6hz
- `numPhases`: number of phases

The setting **Voltage** is editing the element `Voltage` that looks like this

```xml
<Voltage multiplier="k" unit="V">110</Voltage>
```

In the wizard you can set the `multiplier` and the value (110). The unit is fixed to `V`.

**Remove Voltage Level**

To remove an existing `VoltageLevel` element within the parent `Substation`

- Navigate to the **Substation** editor
- Select the **Voltage Level** you want to remove
- Click on the **delete** button
