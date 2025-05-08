The templates validator can find issues that the schema validator cannot, because the issues are not connected to the schema defined in IEC 61850-6 but with other parts of the standard: IEC 61850-7-3/IEC 61850-7-4/IEC 61850-8-1.

> NOTE: OpenSCD is using name space description (NSD) files as a reference (how it should be). These files are provided by the standard but not for all Editions. That is why we only validate the `DataTypeTemplate` section for projects 2007B3 and higher (Edition 2.1).



The validator is triggered on every change in the project basis and the results are displayed in the **diagnostics** pane like so:

![grafik](https://user-images.githubusercontent.com/66802940/133213707-80789ca7-b23f-467e-9142-711e54ffe70c.png)


There rules we have implemented so far cover the following issues:

- Mandatory `DO` is missing in `LNodeType`
- Mandatory `DA` is missing in the `DOType`
- Mandatory `SDO` is missing in the `DOType`
- Mandatory `BDA` is missing in the `DAType`
- Missing `DA` needed for control operation depending in ctlModel
   - `sbo-with-enhanced-security`: Missing `Oper`, `SBOw`
   - `sbo-with-normal-security`: Missing `Oper`, `SBO`
   - `direct-with-enhanced-security`: Missing `Oper`
   - `direct-with-normal-security`: Missing `Oper`
- Check for correct service data implementation `Oper`, 
- Broken reference of `DO` to `DOType` - missing type or invalid type
- Broken reference of `SDO` to `DOType` - missing type or invalid type 
- Broken reference of `DA` to `DAType` - missing type or invalid type 
- Broken reference of `BDA` to `DAType` - missing type or invalid type 
