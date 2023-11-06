
**Add DAType**

<img align="right" src="https://user-images.githubusercontent.com/66802940/132105466-55a9ace1-84d5-4ab3-83b8-ad4cb4195cf7.png" alt="alt text" width="250">

1. Navigate to the list of `DAType`'s in the **template editor**
2. Click on **Add DAType**
3. Select either a `DAType` from the template library or an empty on (empty **value** field)

*Settings*: 
1. **id***: make sure that id is unique in the whole project. 
2. **desc**: user-defined description field

*From IEC 61850*

OpenSCD templates contains all data attribute types from IEC&#8239;61850&#x2011;7&#x2011;3. Other than `EnumType` most pre-defined `DAType` have more flexibility in their definition. As an example you can see the definition of the `AnalogueValue` as defined in the [NSD]() files. 

```
<ConstructedAttribute name="AnalogueValue"
    titleID="IEC61850_7_3.AnalogueValue::AnalogueValue.cl.title">
    <SubDataAttribute name="i"
        type="INT32"
        ...
        presCond="AtLeastOne"
        presCondArgs="1"/>
    <SubDataAttribute name="f"
        type="FLOAT32"
        ...
        presCond="AtLeastOne"
        presCondArgs="1"/>
</ConstructedAttribute>
```

The definition especially the attribute `presCond` gives the freedom to decide if one or both can be children of the `AnalogueValue`. This means for you as a user that you have to decide how your `AnalogueValue` can look like. For OpenSCD templates this means that most `DAType` contain all possible children. From there on you can remove children so that the `DAType` does fit your needs.

> NOTE: `DAType` in the OpenSCD templates contain often all possible children. Please check if you really need all of them. Check the definition of the `DAType` definition of the standard.


*User-defined* 

An black `DAType` is added to the project, that in a lot of cases is invalid so do not stop here.

&nbsp;

**Edit DAType**

<img align="right" src="https://user-images.githubusercontent.com/66802940/132105442-e3518994-5369-4342-ab1a-8a70a9133ed1.png" alt="alt text" width="250">

1. Navigate to the `DAType`'s list in the **template editor**
2. Click on the `DAType` you want to edit

*Settings*:

1. **id***: make sure that id is unique in the whole project. 
2. **desc**: user-defined description field
3. List of all child `BDA`. The item shows the `id` as well as the type - `bType`. When the type starts with **#** than the `BDA` is either a constructed attribute or an enumeration. 


*Example*:
```
<DAType id="OpenSCD_Originator">
    <BDA name="orCat" bType="Enum" type="OriginatorCategoryKind"/>
    <BDA name="orIdent" bType="Octet64"/>
</DAType>
```

&nbsp;

**Remove EnumType**

1. Open the `DAType` you want to remove  **Edit DAType** 
2. Click on **Remove** button

> **WARNING**: OpenSCD does not check for validity before removal so be careful!

