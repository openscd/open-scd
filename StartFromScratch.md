Dear OpenSCD user,

If you are looking at this section of the wiki your job is probably the definition of a data model. For most users this means the translation of an existing signal list to IEC 61850 data model references. The easiest way do achieve fast results especially if you are new to this is [starting from the template](https://github.com/openscd/open-scd/wiki/StartFromTemplate).

You are reading further, good this page will help you to create ONE valid `LNodeType` from scratch. We will concentrate on the LN class `CSWI`.

But before going into details let make s small experiment:

1. Open OpenSCD
2. Create new Edition 2.1 project
3. Navigate to `Template` editor
4. Add a `DataTypeTemplate`
5. Click on add `LNodeType`
6. Select LN class `CSWI`
7. Make sure the option `Use LN class from OpenSCD template` is deselected
8. Click on `Next...`
9. Click on `Save`

![grafik](https://user-images.githubusercontent.com/66802940/131665399-3b7ffd50-74f5-424a-b9a5-926eb71eb8be.png)

The wizard does not let you to save it. Well the reason is that you have not defined the minimum required data objects. Those are highlighted red. This means whoever that you need to have at least on `DOType` that is meeting the requirement in your project already. In this case for example you need to have one `DOType` of the type `ENC`. In addition to that you the data object `Pos` is required.

Lets start with `Beh` first. This is of the CDC `ENS`. And if you look into the IEC 61850 7-3 and look for the `ENS` table, you will see that you need at least `stVal`, `q` and `t`. So let's create the `DOType` first.

1. Add `DOType`
2. Leave `value` empty
3. Type `BehENS` as id

Now you can see this in the `DOType` list but is not valid!!! So don't spot here. Let's add the data attribute q and t first.

1. Click on `BehENS`
2. Click on add `Data Attribute`
3. Name is `q`
4. bType is `Quality`
5. FC - functional constraint - is `ST`
6. Click save

7. Click on `BehENS`
8. Click on add `Data Attribute`
9. Name is `t`
10. bType is `Timestamp`
11. FC - functional constraint - is `ST`
12. Click save

Where do I get this information you might ask: you have to look into the IEC 61850 7-3 table for ENS.

The next attribute `stVal` is a bit more tricky. If you look into the same table you will see that the bType is Enum and is also defined in the 7-3. This Enum is called `BehaviorModeKind`. Here you can decide to either create it from scratch again. But with Enums we do not recommend it as all Enums are clearly defined and are part of the templates. So take the one from the templates:

1. Add `EnumType`
2. Select `BehaviorModeKind`
3. Click save

Now we can proceed to add the data attribute `stVal`.

1. Click in BehENS again
2. Click add `Data Attribute`
3. Name is `stVal`
4. bType is `Enum`
5. type is suggested to you and is required for bType Enum
6. Save

The last required things missing is the cdc which in our case is `ENS`.

Do the same thing for the `Pos` which is a DPC common data class. To make is easier make it a [status-only DPC type](https://github.com/openscd/open-scd/wiki/CreateStatusOnlyDPC).

Finally we are in a stage to create the `LNodeType` with lnClass `CSWI`.

1. Add `LNodeType`
2. Select `CSWI`
3. Make sure the option `Use LN class from OpenSCD template`
4. Don't forget to `id`
5. Click on `Next...`
6. For the required data objects `Beh` and `Pos`. The wizard suggests the two `DOType` you just create and

tada you have made it!! You wanna make sure what you did is not completely wrong give the `Validate Template` a shot.
