**Open create wizard**

In order to get to the Report Control Block

1. navigate to the **Substation** editor
2. click on the **R** icon button in the upper left corner
3. click in **Report+**
4. select the `IED` you want to store the Report in

or

1. navigate to the **Substation** editor
2. click one of the IEDs in the editor
3. click on the **R** action icon
4. click in **Report+**

> NOTE: The `ReportControl` element, its child elements and its referenced `DataSet` element are saved to the first `LN0` element in the selected `IED`.

&nbsp;

This create wizard consists of four pages. All pages need to be filled properly to be able to add the Report Control Block and its DataSet to the SCL. You can navigate between the pages using the buttons in the footer.

> NOTE: The **Save** button that adds the Report Control Block to the SCL is on the last page.

&nbsp;

<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/182343605-46ba8e68-b264-4d75-a065-2010554c7271.png">

**ReportControl page**

This page contains a set of settings the server needs to have to be able to generate a Report:

- `name`: The main identifier for the Report within the SCL. The name must be unique for all `ReportControl` element in the same parent element. Does influence the Report Control Block reference
- `desc`: optional string that is describing the `ReportControl` element
- `buffered`: whether the report control is buffered or not
- `rptID`: a unique identifier for the Report. If empty string the ID will be set to the Report Control Block reference (path to the report control block in the data model)
- `indexed`: Whether there can be multiple instances of the Report online. When connecting to a Report only one client can work with the Report at a same time due to the TCP/IP type connection. Therefore you need to have multiple instances of the same Report in case more than on client wants to use the same Report
- `max Clients`: This is the maximum of instances the IED has to instantiate at power-up. This field is reflecting the attribute `max` in the child element `RptEnabled`
- `bufTime`: The minimum time in [ms] between two Report messages online
- `intgPd`: The time in [ms] between two Report messages triggered periodically.

&nbsp;

&nbsp;

&nbsp;

&nbsp;

**Trigger Options page**

<img align="right" width="300" alt="grafik" src="https://user-images.githubusercontent.com/66802940/182343937-266818b7-8894-42fe-99d5-3b559ea89218.png">
This page allows do define how a Report is triggered once activated.

1. `dchg`: A report is send if any data in the data set is changed in the data model. E.g. the trip signal of a protection function changes from false to true
2. `qchg`: A report is send if the quality of any of the data is changes. Quality is a bit string that allow to specify the current quality of information and also allow to have indicators on the quality reason. The quality information must be part of the data set otherwise this setting does nothing.
3. `dupd`: Some data can be triggered on data update in addition to data change. This is often the case for measurement information. Let's assume you want to track our secondary voltage measurement, that is nominally 100 V. If everything work well you do not see any changes in the secondary voltage that you track but you might want to be still be updated from time to time. This trigger as active always when the values is updated in the data model independent if the value itself has been changed.
4. `period`: If true it triggers the Report periodically depending on the `intgPd` in the parent `ReportControl` attribute
   > NOTE: If `period` is set to true, but `intgPd` is set to 0 the trigger condition is disabled
5. `gi`: Stand for general interrogation and allows to actively trigger a Report generation only. It simulates a master slave behavior that the Report services is trying to avoid.

&nbsp;

**Optional Fields page**

<img align="right" width="250" src="https://user-images.githubusercontent.com/66802940/182344346-7c36c46c-72d3-433d-a274-1f76b4210e08.png">

This page allows do define what extra information in addition to the data itself the Report message has as well.

1. `seqNum`: The sequence number of the Report message. Every time a new Report is generated the sequence number is incremented.
2. `timeStamp`: The time stamp when the Report message has been generated.
   > NOTE: This is not the time of the change of data in the Report but the time of the generation of the Report. The coding of this particular time does differ from those in the data set of the report and is not so precise.
3. `dataSet`: The reference to the `DataSet` connected with this Report. This allows to double check if the correct data is send with the Report
4. `reasonCode`: The trigger option that triggered the generation of the Report. data change, quality change ...
5. `dataRef`: The references fo all data in the data set of the Report. This allows the client decode a Report without knowing the structure of the data set.
6. `entryID`: The ID in the buffer for the Report. Is used for buffered Reports to retrieve only Reports from the buffered that has not been send before.
7. `configRev`: The `confRev` attribute of the Report. Allows to see if the Report has been re-configured.
8. `bufOvfl`: Indicates whether there has been a overflow of the buffer

&nbsp;

**Data picker**

To define the data set a multi-select data picker is used in the last page of the create wizard. This allows you to select multiple data attributes at the same time. The exampled below picked the data attributes `stVal`, `q` and `t` from the data object `Pos` the logical node `DC CSWI 1` and the logical device `CTRL`.

![grafik](https://user-images.githubusercontent.com/66802940/182344535-9196c230-bf7b-4c90-b248-483cdd22e7d4.png)

> NOTE: If no data is picked the `DataSet` is still created but is empty! You can add data using the edit wizard in a later stage.

&nbsp;
