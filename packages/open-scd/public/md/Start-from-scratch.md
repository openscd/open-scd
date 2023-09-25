In this section you are guided through the process to create ONE valid `LNodeType`. We will concentrate on the logical node class `CSWI`.

But before going into details let make a small experiment:

1. Open **OpenSCD**
2. Create new Edition 2.1 project
3. Navigate to **Template editor**
4. Add a `DataTypeTemplate`
5. Click on **Add LNodeType**
6. Click on **Value**
7. Select empty logical node class e.g. _CSWI_ as **lnClass**
8. Click on **Next...**
9. Click on **Save**

![grafik](https://user-images.githubusercontent.com/66802940/131665399-3b7ffd50-74f5-424a-b9a5-926eb71eb8be.png)

The wizard does not let you to save it. Well the reason is that you have not defined the minimum required data objects. Those are highlighted red. When you try to add something here your are disappointed again, as the list is empty. The reason is that **OpenSCD** tries to find a `DOType` that fits the definition of the `DO` but cannot find any as there are no `DOType`s yet in the project.

In this case for example you need to have one `DOType` of the type `ENS`. In addition to that the data object `Pos` is required - `DPC`.

Lets start with `Beh` first. This is of the common data class (CDC) `ENS`. And if you look into the IEC&#8239;61850 7-3 and look for the `ENS` table, you will see that you need at least `stVal`, `q` and `t`. So let's create the `DOType` first.

1. Click on **Add DOType**
2. Leave **value** empty
3. Type _BehENS_ into the **id** field

OpenSCD does add this `DOType` but the validator tells you this is not valid, so don't stop here. Let's add the `DA`s `q` and `t` first.

1. Click on **BehENS**
2. Click on **Add Data Attribute**
3. Type in _q_ into the **name** field
4. Select is _Quality_ in the **bType** field
5. Type in _ST_ in the **fc** field (functional constraint)
6. Click **Save**

7. Click on **BehENS** again
8. Click on **Add Data Attribute**
9. Type in _t_ into the **name** field
10. Select is _Timestamp_ in the **bType** field
11. Type in _ST_ in the **fc** field (functional constraint)
12. Click **Save**

Where do I get this information you might ask: you have to look into the IEC&#8239;61850 7-3 table for `ENS`.

The next attribute `stVal` is a bit more tricky. If you look into the same table you will see that the `bType` attribute is Enum and is also defined in the 7-3. This Enum is called `BehaviorModeKind`. Here you can decide to either create it from scratch again. But with Enums we do not recommend it as all Enums are clearly defined and are part of the templates. So take the one from the templates:

1. Click on **Add EnumType**
2. Select _BehaviorModeKind_ as **Value**
3. Type in _OpenSCD_BehaviorModeKind_ into **id** field
4. Click **Save**

Now we can proceed to add the data attribute `stVal`.

1. Click in **BehENS** once again
2. Click **Add Data Attribute** `
3. Type in _stVal_ into **name** field
4. Select _Enum_ in the **bType** field
5. The type is enabled and show all `EnumType`s in the project.
6. Select _OpenSCD_BehaviorModeKind_ in **type** field
7. Click **Save**

Still the validator will complain. The `cdc` attribute is empty but required within our `DOType`.

1. Click on **BehENS** as last time
2. Type in _ENS_ into the **cdc** field
3. Click **Save**

Nearly done. Now we need to define a `DOType` which must be a `DPC` common data class. To reduce complexity you can a [status-only DPC type](https://github.com/openscd/open-scd/wiki/Create-status-only-DPC). For the full experience create a [sbo-with-enhanced-security DPC](https://github.com/openscd/open-scd/wiki/Create-sbw-with-enchanced-security-DPC)

Finally we are in a stage to create the `LNodeType` with `lnClass` `CSWI`.

1. Click on **Add LNodeType**
2. Select empty logical node class e.g. _CSWI_ as **lnClass**
3. Don't forget the **id** field
4. Click on **Next...**
5. For the required data objects `Beh` and `Pos`. The wizard suggests the two `DOType` you just create and...

...tada you have made it. This procedure is basically always the same but with different kind of common data classes that you need to create before being able to create a LNodeType.

> NOTE: In the **Select Data Objects** wizard OpenSCD suggests `DOType`s based in their `cdc` definition. It does not check if the `DOType` has the correct structure.
