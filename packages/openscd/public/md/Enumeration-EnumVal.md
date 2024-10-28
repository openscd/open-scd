
**Add EnumVal**

You can use OpenSCD to add new `EnumVal`s to an existing `EnumType`. 

<img align="right" src="https://user-images.githubusercontent.com/66802940/132070327-26d452dc-f4b8-441a-aee3-0b57f521f76a.png" alt="alt text" width="250">

1. Navigate to the `EnumType` you want to add a `EnumVal` to open the **Edit EnumType** wizard.
2. Click on **ENUM VALUE** button in the middle of the wizard. 

*Settings*:
1. **ord***: Must be unique within the `EnumType`. 
2. **desc**: user-defined description field
3. **value***: The enumeration value as string.

&nbsp;

**Edit EnumVal**

You can edit existing `EnumVal` element to for example fix issues. 

1. Navigate to the `EnumType` that contains the `EnumVal` you want to edit
2. Open the **Edit EnumType** page and click on the `EnumVal` you want to edit the **Edit Enum** wizard.

*Settings*:
1. **ord***: Must be unique within the `EnumType`. 
2. **desc**: user-defined description field
3. **value***: The enumeration value as string.


&nbsp;

*Example:*
```
<EnumVal ord="1">on</EnumVal>
```



**Remove EnumVal**

Removing `EnumVal` from `EnumType` might be necessary from time to time to adapt to the definition to vendor specific data model. Es an exampled you can often see that `BehaviorModeKind` to consist of on, test and off only. (test/blocked and on-blocked are removed)

1. Open the `EnumVal` you want to remove in **Edit EnumVal** wizard
2. Click on **Remove**
