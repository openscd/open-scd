Dear OpenSCD user,

You are reading this page probably as you are working on the `DataTypeTemplates` section. As this can be a quite complex step the template validator might help you here. As of this moment you have to trigger the validation by hand at the moment. When you do so the output is displayed in the diagnostics pane.

At the moment the template validator is pretty rudimentary and for sure will get more and more rules as the project is growing. This is what the validator states as an issues at the moment:

1. Mandatory `DO` is missing in `LNodeType`
2. Mandatory `DA` is missing in the `DOType`
3. Mandatory `SDO` is missing in the `DOType`
4. Mandatory `BDA` is missing in the `DAType`
5. Missing `DA` needed for control operation depending in ctlModel
   - `sbo-with-enhanced-security`: Missing `Oper`, `SBOw`
   - `sbo-with-normal-security`: Missing `Oper`, `SBO`
   - `direct-with-enhanced-security`: Missing `Oper`
   - `direct-with-normal-security`: Missing `Oper`

The validation at the moment is based on so called [NSD-files](https://github.com/openscd/open-scd/tree/main/public/xml). Those define for project higher than 2007B3 the definition of the IEC 61850 namespace in XML format and ultimately allows OpenSCD the validation against this files.
