# Enumeration value (EnumVal)

## Add new EnumVal

<img align="right" src="https://user-images.githubusercontent.com/66802940/132070327-26d452dc-f4b8-441a-aee3-0b57f521f76a.png" alt="alt text" width="250">


You can use OpenSCD to add new `EnumVal`s to an existing `EnumType`. 
1. Navigate to the `EnumVal` you want to edit and open the **Edit EnumType** wizard.
2. Click on **ENUM VALUE** button in the middle of the wizard. 

*Settings*:
1. `ord`*: Must be unique within the `EnumType`. 
2. `desc`: user-defined description field
3. `value`*: The enumeration value as string.

> **CHECKS**: Duplicate `ord` is covered by schema validator. 

&nbsp;

## Edit EnumVal

*Settings*:

1. `ord`*: Must be unique within the `EnumType`. 
2. `desc`: user-defined description field
3. `value`*: The enumeration value as string.


&nbsp;

*Example:*
```
<EnumVal ord="1">on</EnumVal>
```



## Remove EnumVal

Removiging `EnumVal` from `EnumType` might be neccassery from time to time to adapt to the definition to verndor specific data model. Es an exampled you can often see that `BehaviorModeKind` to consist of on, test and off only.

1. Open the `EnumVal` you want to remove in **Edit EnumVal** wizard
2. Click on **Remove**
