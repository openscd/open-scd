# Data attribute (DA/BDA)

## Add new BDA

<img align="right" src="https://user-images.githubusercontent.com/66802940/132066144-6efe36e8-544e-487d-9bdf-70829ab878fd.png" alt="alt text" width="250">


You can use OpenSCD to add new `DO`s to an existing `LNodeType`. 
1. Navigate to the `LNodeType` you want to edit and open the **Edit LNodeType** wizard.
2. Click on **DATA OBJECT** button in the middle of the wizard. 

*Settings*:
1. `name`*: If you choose to have a `DO` from IEC&#8239;61850 namespace consult IEC&#8239;61850&#x2011;7&#x2011;4. Otherwise make sure to start with an upper case latter [A-Z]
2. `desc`: user-defined description field
3. `bType`*: The attributes basic type. If `Enum` or `Struct` the `type` attribute may not be empty.
4. `type`*: Type is defined as string in the SCL but is a selector in OpenSCD. If `bType` is `Struct` the selector shows all `DAType` - `id`'s in the project. Without existing `DAType` you cannot create a `DO`. If `bTYpe` is `Enum` the selector shows all `EnumType` - `id`'s in the project. 
5. `sAddr`: user-defined string to describe a short address 
6. `valKind`: Might be missing and if not must be either true or false.
7. `ValImport`: 
8. `Val`: Value element that allow you to pre-define the value offline. This can be added to any data attribute (`DA` or `BDA`)

> **NOTE:**  `Val` definition does not make sense for all function constraints. E.g status type data attribute as `stVal` is not very useful. Others however is sometimes very useful as the `ctlModel` an all controllable [common data class]().

> **CHECKS**: Missing or wrong `name` is covered by schema validator. Missing or wrong `type` is covered by template validator. 

&nbsp;

<img align="right" src="https://user-images.githubusercontent.com/66802940/132106055-277fff5a-9b59-4454-be8d-fd4d4049d056.png" alt="alt text" width="250">


## Edit DA

You can use OpenSCD to manipulate existing `DA`. 
1. Navigate to `DAType` list
2. Click on `DAType` of your choice
2. Click on child `DA`

*Settings*:

The settings are the same a in the **Add DA** wizard with the difference that there is a remove button.

*Example:*
```
<BDA name="orCat" bType="Enum" type="OpenSCD_OriginatorCategoryKind">
```
&nbsp;
&nbsp;

## Remove DO

1. Open **Edit DA** wizard
2. Click on **Remove** button

> **WARNING**: OpenSCD does not check for validity before removal so be careful!











