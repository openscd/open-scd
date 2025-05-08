The configuration of Reports or to be more precise Report Control Blocks is done on the SCL element `ReportControl`, its child elements `TrgOpts`. `OptFields` and `RptEnabled` and its referenced `DataSet` element.
The schema does restrict the allocation of the element:

1. `ReportControl` must reside in the `LN0` or `LN` element
2. `ReportControl` and its referenced `DataSet` must have the same parent

**Editing Report**

In OpenSCD `ReportControl` elements are configured using so-called wizards. There are four wizards combined that allow editing of Reports

<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/182157943-1d633d14-ec6d-4660-b4f6-2035af2b3279.png">

&nbsp;

1. Edit wizard or create wizard page for the `ReportControl` element itself. This allow to set all attributes that are:

   - `name`: The main identifier for the Report within the SCL. The name must be unique for all `ReportControl` element in the same parent element
   - `desc`: optional string that is describing the `ReportControl` element
   - `buffered`: whether the report control is buffered or not
   - `rptID`: a unique identifier for the Report. If empty string the ID will be set to the Report Control Block reference (path to the Report Control Block in the data model)
   - `indexed`: Whether there can be multiple instances of the Report online. When connecting to a Report only one client can work with the Report at a time due to the TCP/IP type connection. Therefore you need to have multiple instances of the same Report in case more than on client wants to use the same Report
   - `max Clients`: This is the maximum of instances the IED has to instantiate at power-up. This field is reflecting the attribute `max` in the child element `RptEnabled`
   - `bufTime`: The minimum time in [ms] between two Report messages online
   - `intgPd`: The time in [ms] between two Report messages triggered periodically.

To change any of the attributes you have to click on the **Save** button of the wizard.

&nbsp;

**Editing Trigger Options**

<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/182178318-64a70504-0c15-4ddb-ac7e-ad7a1299b1f3.png">

The wizard for Reports child element `TrgOps` (Trigger Options) allow do define how a Report is triggered once activated.

1. `dchg`: A report is send if any data in the data set is changed in the data model. E.g. the trip signal of a protection function changes from false to true
2. `qchg`: A report is send if the quality of any of the data is changes. Quality is a bit string that allow to specify the current quality of information and also allow to have indicators on the quality reason. The quality information must be part of the data set otherwise this setting does nothing.
3. `dupd`: Some data can be triggered on data update in addition to data change. This is often the case for measurement information. Let's assume you want to track our secondary voltage measurement, that is nominally 100 V. If everything work well you do not see any changes in the secondary voltage that you track but you might want to be still be updated from time to time. This trigger as active always when the values is updated in the data model independent if the value itself has been changed.
4. `period`: If true it triggers the Report periodically depending on the `intgPd` in the parent `ReportControl` attribute
   > NOTE: If `period` is set to true, but `intgPd` is set to 0 the trigger condition is disabled
5. `gi`: Stand for general interrogation and allows to actively trigger a Report generation only. It simulates a master slave behavior that the Report services is trying to avoid.

&nbsp;

**Editing Optional Fields**

<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/182181029-537688ce-6018-4f3a-8454-11e9c0a2505e.png">

The wizard for Reports child element `OptFields` (optional Fields) allow do define what extra information in addition to the data itself the Report message has as well.

1. `seqNum`: The sequence number of the Report message. Every time a new Report is generated the sequence number is incremented.
2. `timeStamp`: The time stamp when the Report message has been generated.
   > NOTE: This is not the time of the change of data in the Report but the time of the generation of the Report. The coding of this particular time does differ from those in the data set of the report and is not so precise.
3. `dataSet`: The reference to the `DataSet` connected with this Report. This allows to double check if the correct data is send with the Report
4. `reasonCode`: The trigger option that triggered the generation of the Report. data change, quality change ...
5. `dataRef`: The references fo all data in the data set of the Report. This allows the client decode a Report without knowing the structure of the data set.
6. `entryID`: The ID in the buffer for the Report. Is used for buffered Reports to retrieve only Reports from the buffered that has not been send before.
7. `configRev`: The `confRev` attribute of the Report. Allows to see if the Report has been re-configured.
8. `bufOvfl`: Indicates whether there has been a overflow of the buffer

**Editing data set (DataSet)**

> See data set wizard

&nbsp;

**Navigating between wizard**

<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/182178064-c629d7f3-2bc5-464b-8069-88f0f8680d42.png">

Each wizard represents one element in the SCL. To navigate between those click on the **more vert** icon button on the upper left corner. The pop up menu show various choices.

1. Remove the `ReportControl` element including all its child elements: `TrgOps`, `OptFields` and `RptEnabled`.
   > NOTE: When the referenced `DataSet` element is referenced to this Report only than this is removes as well
2. Opens the data set wizard for the `DataSet` referenced to this Report
3. Opens the trigger options wizard
4. Opens the optional fields wizard
5. Allows to deep copy the Report to other IEDs
