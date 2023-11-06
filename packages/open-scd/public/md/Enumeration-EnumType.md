
With OpenSCD you can either add enumerations that are defined in the standard, or create your own user-defined `EnumType`. 

> **NOTE**: In most cases enumeration defined in IEC&#8239;61850&#x2011;7&#x2011;4 and IEC&#8239;61850&#x2011;7&#x2011;3 are sufficient enough. It is recommended to use those where ever possible.

<img align="right" src="https://user-images.githubusercontent.com/66802940/132067945-0039b2be-7ad6-4834-a2a6-ac83cd3faa3d.png" alt="alt text" width="250">

**Add EnumType**

1. Navigate to the `EnumType` list and click on **Add EnumType**
2. Select the in the **values** field the `EnumType` you want to add

*Settings*: 
1. **id***: make sure that id is unique in the whole project. 
2. **desc**: user-defined description field


*From IEC 61850*

OpenSCD templates contains all enumerations from IEC&#8239;61850&#x2011;7&#x2011;4 and IEC&#8239;61850&#x2011;7&#x2011;3. The correct `EnumType` with all possible `EnumVal` child elements are added to the project. 

*User-defined* 

Do defined a user-defined from scratch open **Add EnumType** wizard and make sure to NOT select the value. Be careful with this option as this adds a blank `EnumType`.

&nbsp;

<img align="right" src="https://user-images.githubusercontent.com/66802940/132069240-5b7cf7ba-15ea-49d0-8bbf-a48027c3252b.png" alt="alt text" width="250">

**Edit EnumType**

1. Navigate to the `EnumType` list in the **Template editor** and click on the `EnumType` you want to edit 

*Settings*:

1. **id***: make sure that id is unique in the whole project. 
2. **desc**: user-defined description field
3. List of all child `EnumVal` with its `ord` attribute and its inner text.

*Example*:
```
<EnumType id="BehaviorModeKind">
   <EnumVal ord="1">on</EnumVal>
   <EnumVal ord="2">blocked</EnumVal>
   <EnumVal ord="3">test</EnumVal>
   <EnumVal ord="4">test/blocked</EnumVal>
   <EnumVal ord="5">off</EnumVal>
</EnumType>
```

&nbsp;

**Remove EnumType**

1. Open the `EnumType` you want to remove  **Edit EnumType** 
2. Click on **Remove** button

> **WARNING**: OpenSCD does not check for validity before removal so be careful!





