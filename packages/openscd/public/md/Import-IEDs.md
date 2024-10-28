Importing IEDs is a key feature for any system configuration, regardless if is follows the so-called `bottom-up` or `top-down` approach. 

To import IEDs to the project
1. Navigate to the **Menu**
2. Click on **Import IED**
3. Select the file(s) you want to import the IED(s) from


Behind the scenes **OpenSCD** checks for uniqueness of the IEDs `name` attribute. This must be unique within the project. There is only one exception to the rule and is called `TEMPLATE`. This is a key word defined to describe template IED an opposition to "real" IEDs.

Another important information that is checked is within the `DataTypeTemplates` section. As the `IED` section is relying on **OpenSCD** makes sure that there are no conflict between the imported and existing templates. To be more precise the `id`'s within `LNodeType`, `DOType`, `DAType` and `EnumType` must be unique in the project. The standard describe two basic procedure how to deal with this situation:

1. Make `id` unique. When importing IEDs with connections to data in `DataTypeTemplates` with `id`'s already present in the project the `id` and the `type` attribute can be unified. As the IED name must be unique in the project OpenSCD is attaching this variable to the `id` and `type` attributes in the `DataTypeTemplates`.

2. Use `iedType` attribute: `LNodeType`, `DOType`, `DAType` and `EnumType` all have an attribute `iedType` that points to the attribute `type` in the IED section. With this attribute data can clearly be connected with a IED. 

> NOTE: OpenSCD does only use the first option a the moment to make sure that all `id`'s are unique within the `DataTypeTemplates` section.

> INFO: [Tissue 366](https://iec61850.tissue-db.com/tissue/366)
