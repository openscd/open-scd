**Add new DO**

<img align="right" src="https://user-images.githubusercontent.com/66802940/132066144-6efe36e8-544e-487d-9bdf-70829ab878fd.png" alt="alt text" width="250">


You can use OpenSCD to add new `DO`'s to an existing `LNodeType`. 
1. Navigate to the `LNodeType` you want to edit and open the **Edit LNodeType** wizard.
2. Click on **DATA OBJECT** button in the middle of the wizard. 

*Settings*:
1. **name***: If you choose to have a `DO` from IEC&#8239;61850 namespace consult IEC&#8239;61850&#x2011;7&#x2011;4. Otherwise make sure to start with an upper case latter [A-Z]
2. **desc**: user-defined description field
3. **type***: Type is defined as string in the SCL but is a selector in OpenSCD. The selector shows all `DOType` - `id`'s in the project. Without existing `DOType` you cannot create a `DO`. 
4. **accessControl**: user-defined string to describe the access control 
5. **transient**: If `DO` is from the IEC&#8239;61850 namespace transient must be as defined in the IEC&#8239;61850&#x2011;7&#x2011;4. E.g. `Tr` from logical node class `PTRC`.


> **CHECKS**: Missing or wrong `name` is covered by schema validator. Missing or wrong `type` is covered by template validator. 

<img align="right" src="https://user-images.githubusercontent.com/66802940/132067177-deffa835-b2e2-4e1a-9600-29bbad1996a7.png" alt="alt text" width="250">

**Edit DO**

You can use OpenSCD to manipulate existing `DO`. 
1. Navigate to `LNodeType` list in the **template editor**
2. Click on `LNodeType` that contains the `DO`
2. Click on child `DO` you want to manipulate - **Edit DO** wizard

&nbsp;

*Settings*:

The settings are the same a in the **Add DO** wizard with the difference that there is a remove button.

*Example:*
```
<DO name="Mod" type="OpenSCD_ENCMod">
```
&nbsp;

**Remove DO**
1. Open **Edit DO** 
2. Click on **Remove** button

> **WARNING**: OpenSCD does not check for validity before removal so be careful!











