The Report is a services defined in the IEC 61850-7-2. It allows event driven communication by introducing trigger options to the Report which allow the server to create a Report and send it to the client based on events in the substation. This services is commonly applied for communication between the bay level equipment and station level equipment and is used for signals like:

1. Measurement information
2. Status of switch gear and other sensors in the substation

**Report Control Block**

The configuration of Reports or to be more precise Report Control Blocks is done on the SCL element `ReportControl`, its child elements `TrgOpts` (trigger options), `OptFields` (optional fields) and `RptEnabled` (containing the clients) and its referenced `DataSet` element. The reference to its `DataSet` is set through the attribute `datSet` in the `ReportControl` element.

> NOTE: `ReportControl` must reside in the `LN0` or `LN` element and `ReportControl` and its referenced `DataSet` must have the same parent

**Dynamic vs. Static Reporting**

Reports need to be configured in three steps and depending on the strategy - dynamic vs static reporting - online or in a system configuration tool(SCT) or IED configuration tool (ICT)

| basic step                         |  static reporting                                                                                                    | dynamic reporting                                                                                                                                       |
| ---------------------------------- | -------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| create control block               | Both SCT or ICT but more common in SCT                                                                               | Predefined empty Report control blocks in the \*.icd file                                                                                               |
| create data set                    | Both SCT or ICT but more common in SCT                                                                               | Online using `CreateDataSet` request defined in IEC 61850-7-2                                                                                           |
| combine control block and data set | Both SCT and ICT but more common in SCT                                                                              | Online using `SetBRCBValues`, `SetURCBValues`                                                                                                           |
| Enable the Report by a client      | Online using `SetBRCBValues`, `SetURCBValues` request. Can be automated using the `ClientLN` element in the SCL file | Online using `SetBRCBValues`, `SetURCBValues` request. Can be automated using the `ClientLN` element in the SCL file but not common for dynamic reports |

**Configuring Reports with OpenSCD**

1. [Create Report Control Blocks and its DataSet](https://github.com/openscd/open-scd/wiki/Create-Report-Control-Blocks)
2. [Edit Report Control Blocks and its DataSets](https://github.com/openscd/open-scd/wiki/Edit-Report-Control-Blocks)
3. [Manage ClientLN configuration](https://github.com/openscd/open-scd/wiki/ClientLN)
