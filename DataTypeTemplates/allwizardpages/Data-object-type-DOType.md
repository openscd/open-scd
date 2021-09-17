
**Add DOType**

<img align="right" src="https://user-images.githubusercontent.com/66802940/133856906-5b1e5d93-4a0f-4d26-9ad6-fd8705026193.png" alt="alt text" width="200">


1. Navigate to the list of `DOType`'s in the **template editor**
2. Click on **Add DOType**
3. Select either a `DOType` from the template library or an empty one (empty **value** field)

*Settings*: 
1. **id***: make sure that id is unique in the whole project. 
2. **desc**: user-defined description field

*From IEC 61850*

OpenSCD templates have suggestions for all common data classes defined in the IEC&#8239;61850&#x2011;7&#x2011;3. Other than with `EnumType`'s however you will have to edit the imported `DOType` to fit the needs. 

> NOTE: `DOType` in the OpenSCD templates contain often a minimal `DOType` or `CDC`. You will in most cases have to add more children to fit your needs. Check the `DOType` definition in the standard.


*User-defined* 

An black `DOType` is added to the project, that in a lot of cases is invalid so do not stop here.

<img align="right" src="https://user-images.githubusercontent.com/66802940/133857438-05b4b1bc-b931-4fbd-a887-a25b03e06d64.png" alt="alt text" width="250">

&nbsp;

**Edit DOType**

1. Navigate to the `DOType`'s list in the **template editor**
2. Click on the `DOType` you want to edit

&nbsp;


*Settings*:

1. **id***: make sure that id is unique in the whole project. 
2. **desc**: user-defined description field
3. **cdc***: common data class definition acc. to IEC 61850-7-3
3. List of all child `DA` of `DO`. The item shows the `id` as well as the type - `bType`. When the type starts with **#** than the `DA` is either a constructed attribute or an enumeration. `SDO` are always constructed data and are referencing to a `DOType` itself. 


&nbsp;

**Remove DOType**

1. Open the `DOType` you want to remove  **Edit DOType** 
2. Click on **Remove** button


> **WARNING**: OpenSCD does not check for validity before removal so be careful!



*Example*:
```
<DOType  cdc="DPC" id="myENC">
    <DA name="origin" bType="Enum" dchg="true" fc="ST" type="OpenSCD_Originator"/>
    <DA name="stVal" bType="Enum" dchg="true" fc="ST" type="BehaviourModeKind"/>
    <DA name="q" bType="Quality" qchg="true" fc="ST"/>
    <DA name="t" bType="Timestamp" fc="ST"/>
    <DA name="ctlModel" bType="Enum" fc="CF" type="CtlModelKind">
        <Val>sbo-with-enhanced-security</Val>
    </DA>
    <DA name="sboTimeout" bType="INT32U" fc="CF">
        <Val>30000</Val>
    </DA>
    <DA name="operTimeout" bType="INT32U" fc="CF">
        <Val>600</Val>
    </DA>
    <DA name="pulseConfig" bType="Struct" fc="CO" type="OpenSCD_PulseConfig"/>
    <DA name="SBOw" bType="Struct" fc="CO" type="OpenSCD_OpenSBOw"/>
    <DA name="Oper" bType="Struct" fc="CO" type="OpenSCD_OpenSBOw"/>
    <DA name="Cancel" bType="Struct" fc="CO" type="OpenSCD_Cancel"/>
</DOType>
```