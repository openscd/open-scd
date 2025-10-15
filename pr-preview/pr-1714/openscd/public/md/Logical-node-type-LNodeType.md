**Add LNodeType**

<img align="right" src="https://user-images.githubusercontent.com/66802940/133859718-d1fddf5b-2d5f-4ed1-92ed-1e111ee3c460.png" alt="alt text" width="200">

1. Navigate to the list of `LNodeType`'s in the **template editor**
2. Click on **Add LNodeType**
3. Select a logical node class form the **lnClass** field
4. You can add a pre-defined lnClass form templates or create your own lnClass with the help of OpenSCD

_Settings_:

1. **id**: make sure that id is unique in the whole project.
2. **desc**: user-defined description field

_From IEC 61850_

See details how to [start from templates database]()

_User-defined_

See details how to [start from scratch]()

<img align="right" src="https://user-images.githubusercontent.com/66802940/133859990-29701010-ced0-465b-80df-07184904d58d.png" alt="alt text" width="250">

&nbsp;

**Edit LNodeType**

1. Navigate to the `LNodeType`'s list in the **template editor**
2. Click on the `LNodeType` you want to edit

&nbsp;

_Settings_:

1. **id\***: make sure that id is unique in the whole project.
2. **desc**: user-defined description field
3. **lnClass\***: the class acc. to the IEC 61850-7-4
4. List of all child `DO`. The item shows the `id` as well as the type reference to `DOType`. `DO` must have a `type` attribute

&nbsp;

**Remove LNodeType**

1. Open the `LNodeType` you want to remove **Edit LNodeType**
2. Click on **Remove** button

> **WARNING**: OpenSCD does not check for validity before removal so be careful!

_Example_:

```
<LNodeType lnClass="CILO" id="myCILO">
    <DO name="Mod" type="OpenSCD_ENCMod"/>
    <DO name="Beh" type="OpenSCD_ENSBeh"/>
    <DO name="Health" type="OpenSCD_ENSHealth"/>
    <DO name="NamPlt" type="OpenSCD_LPLnoLD"/>
    <DO name="EnaOpn" type="OpenSCD_SPSsimple"/>
    <DO name="EnaCls" type="OpenSCD_SPSsimple"/>
</LNodeType>
```
