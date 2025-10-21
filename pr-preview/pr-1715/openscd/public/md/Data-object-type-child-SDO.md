
**Add new SDO**

<img align="right" src="https://user-images.githubusercontent.com/66802940/133858960-4cde1946-f2be-49f1-ad24-1477913d9289.png" alt="alt text" width="250">


You can use OpenSCD to add new `SDO`'s to an existing `DOType`. 
1. Navigate to the `DOType` you want to edit and open the **Edit DOType** wizard.
2. Click on **DATA OBJECT** button in the middle of the wizard. 

*Settings*:
1. **name***: If you choose to have a `SDO` from IEC&#8239;61850 namespace consult IEC&#8239;61850&#x2011;7&#x2011;4. Otherwise make sure to start with an upper case latter [A-Z]
2. **desc**: user-defined description field
3. **type***: Type is defined as string in the SCL but is a selector in OpenSCD. The selector shows all `DOType` - `id`'s in the project. Without existing `DOType` you cannot create a `DO`. 


> **CHECKS**: Missing or wrong `name` is covered by schema validator. Missing or wrong `type` is covered by template validator. 

<img align="right" src="https://user-images.githubusercontent.com/66802940/133859075-dbdf88a4-a96d-4af1-93ac-e1ec923edbe7.png" alt="alt text" width="250">

**Edit DO**

You can use OpenSCD to manipulate existing `DO`. 
1. Navigate to `DOType` list in the **template editor**
2. Click on `DOType` that contains the `SDO`. E.g. common data class `WYE`
2. Click on child `SDO` you want to manipulate - **Edit SDO** wizard

&nbsp;

*Settings*:

The settings are the same a in the **Add SDO** wizard with the difference that there is a remove button.

*Example:*
```
<SDO  name="res" type="ABBIED600_Rev5_CMV_1"/>
```
&nbsp;

**Remove SDO**
1. Open **Edit SDO** 
2. Click on **Remove** button

> **WARNING**: OpenSCD does not check for validity before removal so be careful!











