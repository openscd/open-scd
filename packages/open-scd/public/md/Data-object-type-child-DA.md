
 **Add new DA**

<img align="right" src="https://user-images.githubusercontent.com/66802940/133857899-b0ccdbb7-6125-4df7-8c1d-f2eb31820973.png" alt="alt text" width="250">


You can use OpenSCD to add new `DA`s to an existing `DOType`. 
1. Navigate to the `DOType` you want to edit and open the **Edit DAType** wizard.
2. Click on **DATA ATTRIBUTE** button in the middle of the wizard. 

*Settings*:
1. **name***: If you choose to have a `BDA` from IEC&#8239;61850 namespace consult IEC&#8239;61850&#x2011;7&#x2011;4. Otherwise make sure to start with an lower case latter [a-z]
2. **desc**: user-defined description field
3. **bType***: The attributes basic type. If *Enum* or *Struct* the **type** field may not be empty.
4. **type***: Type is defined as string in the SCL but is a selector in OpenSCD. If **bType** is *Struct* the selector shows all `DAType` - `id`'s in the project. Without existing `DAType` in the project you cannot create a `BDA`. If **bType** is *Enum* the selector shows all `EnumType` - `id`'s in the project. 
5. **sAddr**: user-defined string to describe a short address 
6. **valKind**: Might be missing and if not must be either true or false.
7. **valImport**: Might be missing and if not must be either true or false.
8. **Val**: Value element that allow you to pre-define the value offline. This can be added to any data attribute (`DA` or `BDA`). 
9. **dchg**: data update acc. IEC 61850-7-3 for this particular data attribute.
10. **qchg**: quality update is true for all DA of name *a* else is empty 
11. **dupd**: data update acc. to IEC 61850-7-3
12. **fc**: functional constraint acc. IEC 61850-7-3 for this particular data attribute.

> **NOTE:**  `Val` definition does not make sense for all function constraints (`FC`). E.g status type data attribute as `stVal` is not very useful. For other data attributes it perfectly makes sense to pre-define the value. E.g. the `ctlModel` 

> **NOTE**: Since Edition 2 you cannot design your own CDC and must use for t a user-defined data object a CDC from IEC 61850-7-3. This means that the data attributes are defined. Please check the tables to set the attributes `dchg`, `qchg`, `dupd` and `fc` 



<img align="right" src="https://user-images.githubusercontent.com/66802940/132106055-277fff5a-9b59-4454-be8d-fd4d4049d056.png" alt="alt text" width="250">

**Edit DA**

You can use OpenSCD to manipulate existing `DA`. 
1. Navigate to `DOType` list in **template editor**
2. Click on `DOType` that contains the `DA` you want to edit 
2. Click on child `DA` you want to edit

*Settings*:

The settings are the same a in the **Add DA** wizard with the difference that there is a remove button.

*Example:*
```
<DA name="ctlModel" bType="Enum" fc="CF" type="CtlModelKind">
    <Val>sbo-with-enhanced-security</Val>
</DA>
```
&nbsp;

**Remove DO**

1. Open **Edit DA** wizard
2. Click on **Remove** button

> **WARNING**: OpenSCD does not check for validity before removal so be careful!











