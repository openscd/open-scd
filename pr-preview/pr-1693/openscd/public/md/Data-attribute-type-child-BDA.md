
 **Add new BDA**

<img align="right" src="https://user-images.githubusercontent.com/66802940/132066144-6efe36e8-544e-487d-9bdf-70829ab878fd.png" alt="alt text" width="250">


You can use OpenSCD to add new `BDA`s to an existing `DAType`. 
1. Navigate to the `DAType` you want to edit and open the **Edit DAType** wizard.
2. Click on **DATA ATTRIBUTE** button in the middle of the wizard. 

*Settings*:
1. **name***: If you choose to have a `BDA` from IEC&#8239;61850 namespace consult IEC&#8239;61850&#x2011;7&#x2011;4. Otherwise make sure to start with an lower case latter [a-z]
2. **desc**: user-defined description field
3. **bType***: The attributes basic type. If *Enum* or *Struct* the **type** field may not be empty.
4. **type***: Type is defined as string in the SCL but is a selector in OpenSCD. If **bType** is *Struct* the selector shows all `DAType` - `id`'s in the project. Without existing `DAType` in the project you cannot create a `BDA`. If **bType** is *Enum* the selector shows all `EnumType` - `id`'s in the project. 
5. **sAddr**: user-defined string to describe a short address 
6. **valKind**: Might be missing and if not must be either true or false.
7. **valImport**: 
8. **Val**: Value element that allow you to pre-define the value offline. This can be added to any data attribute (`DA` or `BDA`). 

> **NOTE:**  `Val` definition does not make sense for all function constraints (`FC`). E.g status type data attribute as `stVal` is not very useful. For other data attributes it perfectly makes sense to pre-define the value. E.g. the `ctlModel` 

> **CHECKS**: Missing or wrong `name` is covered by schema validator. Missing or wrong `type` is covered by template validator. 


<img align="right" src="https://user-images.githubusercontent.com/66802940/132106055-277fff5a-9b59-4454-be8d-fd4d4049d056.png" alt="alt text" width="250">

**Edit BDA**

You can use OpenSCD to manipulate existing `BDA`. 
1. Navigate to `DAType` list in **template editor**
2. Click on `DAType` that contains the `BDA` you want to edit 
2. Click on child `BDA` you want to edit

*Settings*:

The settings are the same a in the **Add BDA** wizard with the difference that there is a remove button.

*Example:*
```
<BDA name="orCat" bType="Enum" type="OpenSCD_OriginatorCategoryKind">
```
&nbsp;

**Remove BDA**

1. Open **Edit DA** wizard
2. Click on **Remove** button

> **WARNING**: OpenSCD does not check for validity before removal so be careful!











