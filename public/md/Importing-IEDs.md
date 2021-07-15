# Importing IEDs
Importing IEDs is a key feature for any system configurator, regardless if is follows the so-called `bottom-up` or `top-down` approach. 
This feature must deal with conflicts in the `DataTypeTemplate` on importing IEDs. To be more precise the `id`'s within `LNodeType`, `DOType`, `DAType` and `EnumType` must be unique in the project. There are two possible ways to deal with those conflicts:  

## Make id's unique
When importing IEDs with connections to data in `DataTypeTemplates` with `id`'s already present in the project the `id` and the `type` attribute can be unified. As the IED name must be unique in the project OpenSCD is attaching this variable to the `id` and `type` attributes in the `DataTypeTemplates`.

## Use iedType attribute
`LNodeType`, `DOType`, `DAType` and `EnumType` all have a attribute `iedType` that points to the attribute `type` in the IED section. With this attribute data can clearly be connected with a IED. **OpenSCD is not using this approach, yet!**


### For further reading
[Tissue 366](https://iec61850.tissue-db.com/tissue/366)
