**Open create wizard**

In order to get to the Sampled Value Control Block

1. navigate to the **Substation** editor
2. click on the **S** icon button in the upper left corner
3. click in **Sampled Value Control Block+**
4. select the `IED` you want to store the Sampled Value in

or

1. navigate to the **Substation** editor
2. click one of the IEDs in the editor
3. click on the **S** action icon
4. click in **Sampled Value Control Block+**

> NOTE: The `SampledValueControl` element, its child elements and its referenced `DataSet` element are saved to the first `LN0` element in the selected `IED`.

&nbsp;

This create wizard consists of three pages. All pages need to be filled properly to be able to add the Sampled Value Control Block and its DataSet to the SCL. You can navigate between the pages using the buttons in the footer.

> NOTE: The **Save** button that adds the Sampled Value Control Block to the SCL is on the last page.

&nbsp;

**SampledValueControl page**

<img align="right" width="200" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183049528-3c652d04-bdc7-49ca-9a97-0ad29e2a5893.png">

This page contains a set of settings the server needs to have to be able to generate a Sampled Value:

- `name`: The main identifier for the Sampled Value within the SCL. The name must be unique for all `SampledValueControl` element in the same parent element. Does influence the Sampled Value Control Block reference
- `desc`: optional string that is describing the `SampledValueControl` element
- `smvID`: a unique identifier for the Sampled Value.
- `smpMod`: The mode the sample rate is expressed in. Samples per period, sampled per second or seconds per sampled. Default is samples per period
- `smpRate`: The sample rate depending on the sample mode.
- `noASDU`: Timestamps per Ethernet packet
- `securityEnabled`: The type of security measures the Sampled Value has: encryption or/and signature or non of the two.

&nbsp;

**SmvOpts page (optional configuration)**

<img width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183049735-795e0049-d764-4600-80c9-331d299bdaaf.png">

This wizard allows to configure the optional behavior of the sampled value stream.

1. `refreshTime`: Whether the timestamp of the generation of the sample value stream shall be included
2. `sampleRate`: Whether sample rate and sample mode shall be part of the sampled value stream
3. `dataSet`: Whether the data set reference shall be part of the sampled value stream
4. `security`: Whether the sampled value stream contains the security attribute. (Used for future definition e.g. digital signature)
5. `synchSourceId`: Whether the the sampled value stream contains the synchronizing grand master ID.

   &nbsp;

<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183049873-c5d2efd0-211e-4f30-88e9-9e9be80fe130.png">

**Communication page**

This page allows do define all communication related setting for the Sampled Value. These information is saved to the `Communication` section to be more precise into the element `SMV`.

1. `MAC-Address`: The destination MAC address of the Sampled Value: `01-0C-CD-04-00-00` to `01-0C-CD-04-01-FF`
2. `APPID`: The APPID of the Sampled Value. This is recommended to be unique though out the complete project.
3. `VLAN-ID`: The virtual LAN ID the Sampled Value shall be limited to.
4. `VLAN-PRIORITY`: The priority of the Sampled Value message. It can be used to prioritise time-critical messages like trip signals over non-time-critical messages.

   &nbsp;

**Data picker**

To define the data set a multi-select data picker is used in the last page of the create wizard. This allows you to select multiple data attributes at the same time. The exampled below picked the data attributes `instMag.i` and its quality information `q` from the data object `AmpSv` the logical node `I01A TCTR 1`, `I01A TCTR 2` and the logical device `Mod2_MU1`.

![grafik](https://user-images.githubusercontent.com/66802940/183050221-ef606fc7-1201-4e3a-930f-7bc91a56654a.png)

> NOTE: If no data is picked the `DataSet` is still created but is empty! You can add data using the edit wizard in a later stage.
> NOTE: The picker does restrict the data for Sample Values to the data objects `AmpSv`, `Amp` in logical node `TCTR` and `VolSv`, `Vol` in logical node `TVTR`

&nbsp;
