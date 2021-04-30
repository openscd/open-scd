# Roadmap

| Section             | Q2-2021                              | Q3-2021                                                                                                                                | Q4-2021                                                                  | Q1-2022                           |
| ------------------- | ------------------------------------ | -------------------------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------ | --------------------------------- |
| `DataTypeTemplates` | `DAType` editor <br> `DOType` editor | `LNType` editor <br> Templates import/export                                                                                           |                                                                          |                                   |
| `IED`               | IED editor plugin                    | Navigate in data model <br> Create/edit/remove `GSEControl` <br> Create/edit/remove `ReportControl` <br> Create/edit/remove `Services` | Create template `IED` <br> Merge template and vendor `IED`               |                                   |
| `Communication`     |                                      | Functional validation\*                                                                                                                | Functional validation\*                                                  | `Communication` overview          |
| `Substation`        |                                      |                                                                                                                                        | `PowerTransformer` <br> `SubEquipment` <br> `Function` <br> `EqFunction` | Single Line Diagram (Coordinates) |
| General topics      |                                      | General XML editor\*                                                                                                                   |                                                                          | Role based access\*               |

**Functiona validation:** Checking information within the SCL file that is not covered by the schema validator. Also checking for information that technically is not incorrect but would lead to problems when exchanging SCL files between tools. E.g Unique IP-Address, MAC-Address ect.

**General XML editor view:** A XML container that allowes experienced users to manipulte XML code directly. This XML conatainer shall be accessable from every element with OpenSCD and also from the log.

**Role based access:** `IEC 61850-6` is defining a role access to SCL files to make sure that within the engeneering process only neccessary parts are touched.
