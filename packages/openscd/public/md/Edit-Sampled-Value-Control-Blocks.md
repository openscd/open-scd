The configuration of Sampled Values or to be more precise Sampled Value Blocks is done on the SCL element `SampledValueControl`, its referenced `DataSet` element and its referenced `SMV` element allocated in the `Communication` section.
The schema does restrict the allocation of the element:

1. `SampledValueControl` must reside in the `LN0` element
2. `SampledValueControl` and its referenced `DataSet` must have the same parent
3. `SMV` can only exist if the access point (`ConnectedAP`) of the server is connected to a sub-network (`SubNetwork`) in the `Communication` section

**Editing Sampled Values**

In OpenSCD `SampledValueControl` elements are configured using so-called wizards. There are three wizards combined that allow editing of Sampled Value Control Block

<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183037382-03113028-29f7-4e73-ba02-1bff38fc7344.png">

&nbsp;

The wizard contains a set of setting allocated in the element `SampledValueControl`:

- `name`: The main identifier for the Sampled Value within the SCL. The name must be unique for all `SampledValueControl` element in the same parent element. Does influence the Sampled Value Control Block reference
- `desc`: optional string that is describing the `SampledValueControl` element
- `multicast`: Only visible when false as non-multicast sampled value streams are deprecated.
- `smvID`: a unique identifier for the Sampled Value.
- `smpMod`: The mode the sample rate is expressed in. Samples per period, sampled per second or seconds per sampled. Default is samples per period
- `smpRate`: The sample rate depending on the sample mode.
- `noASDU`: Timestamps per Ethernet packet
- `securityEnabled`: The type of security measures the Sampled Value has: encryption or/and signature or non of the two.

To change any of the attributes you have to click on the **Save** button of the wizard.

&nbsp;

**Editing the Optional information page**

<img width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183042678-a6ec19b1-4b26-4681-891c-3b3d658092be.png">

This wizard allows to configure the optional behavior of the sampled value stream.

1. `refreshTime`: Whether the timestamp of the generation of the sample value stream shall be included
2. `sampleRate`: Whether sample rate and sample mode shall be part of the sampled value stream
3. `dataSet`: Whether the data set reference shall be part of the sampled value stream
4. `security`: Whether the sampled value stream contains the security attribute. (Used for future definition e.g. digital signature)
5. `synchSourceId`: Whether the the sampled value stream contains the synchronizing grand master ID.

   &nbsp;

   <img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183041967-68d158b7-62c4-4aa2-90c1-b0f52bbf2232.png">

**Communication page**

This wizard allows do define all communication related setting for the Sampled Value. These information is saved to the `Communication` section to be more precise into the element `SMV`.

1. `MAC-Address`: The destination MAC address of the Sampled Value: `01-0C-CD-04-00-00` to `01-0C-CD-04-01-FF`
2. `APPID`: The APPID of the Sampled Value. This is recommended to be unique though out the complete project.
3. `VLAN-ID`: The virtual LAN ID the Sampled Value shall be limited to.
4. `VLAN-PRIORITY`: The priority of the Sampled Value message. It can be used to priorities time-critical messages like trip signals over non-time-critical messages.

   &nbsp;

**Editing data set (DataSet)**

> See data set wizard

&nbsp;

<img align="right" width="250" alt="grafik" src="https://user-images.githubusercontent.com/66802940/183048016-bbf17f11-20a3-4871-8439-36ca1b8a6005.png">

**Navigating between wizard**

Each wizard represents one element in the SCL. To navigate between those click on the **more vert** icon button on the upper left corner. The pop up menu show various choices.

1. Remove the `SampledValueControl` element. Its referenced data set is removed as well so long it is referenced only to this control block.
2. Opens the data set wizard for the `DataSet` referenced to this GOOSE
3. Opens the communication wizard
