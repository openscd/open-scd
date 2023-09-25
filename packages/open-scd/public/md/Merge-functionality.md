# Merge or Diff
Merge is a basic functionality that allows to import information from other files or to update existing elements with information from other files. 

To understand what **OpenSCD** is doing behind the scenes we need to explain to terms first:

1. Same: Two elements are the same if they have the same identity. In case of **OpenSCD** we have defined the identity for all elements in our foundation and it is a string of all unique attributes of the path. E.g. A `Bay` must have a `name` attribute and it must be unique within the `VoltageLevel` - so says the standard. This is the id for this element. The same is true vor all parent elements until the `SCL` tag. Therefore the identity of a `Bay` are all `name` attributes separated by `>`: `AA1>E1>Q01` for example. Other element might have other identifiers like the `id` attribute of `LNodeType` element. Sometimes we have to use the index to build the identity.

2. Equal: Two elements are equal if it and all its children are the same and their attributes are equal. 

The merge functionality is using these two attributes of element to calculate a difference and allows to merge elements from different files.

To use this functionality you can click on **Merge Project** or **Update Substation** 

## Merge Project

<img align="right" src="https://user-images.githubusercontent.com/66802940/133101844-ae42bfc5-4700-49e2-96cd-3f1ddbc040d4.png" alt="alt text" width="250">

1. Edit: Attributes same - element's - imported and existing - are present but differ. E.g in the existing it is *Bay01* and the imported *Bay Q01*
2. Add: An attribute is present in the imported but not in the existing file or a child element is present in the imported but not in the existing file.
3. Delete: An attribute is present in the existing but not in the imported same element or a same child element is present in the existing but not in the imported file. E.g. the attribute *sxy:x* is present in the existing but not in the imported file.
4. Merge: Element in the existing file and the imported file are the same but differ in attribute and or child elements themselves.

 The merge is a step by step procedure that starts at the root element `SCL` moving first through all its child elements. This means that you will see a wizard page for all children that are not the same. Once those are done all child elements of the selected element is following. 
 
 As an example let's assume you imported a file that differs in one `DO` definition within a `LNodeType` - `desc`, a `LN` definition with one of four `IED` elements and within one of three `Bay` elements within a `Substation` - here `desc` again is different. 
 1. The merge starts at the `SCL` element showing you that three elements are not equal and can be merged: `Substation`, one `IED` and the `DataTypeTemplates`. Let's assume you select the `Substation` and the `DataTypeTemplates` only and leave out the `IED`. 
 2. The next wizard page will shows you the `Substation` element and that the `VoltageLevel` is not equal and can be merged - let's assume there is only one `VoltageLevel`. We follow this path and select the `VoltageLevel`
 3. Next is the `DataTypeTemplates` element showing you that one `LNodeType` is not equal and you chose to merge this.
 4. Next would be the `Bay` element. Here the attribute `desc` is different and you can edit it. No child element are shows as they are equal.
 5. Next is the `LNodeType` showing you the one `DO` child element that is not equal.
 6. Next is the `DO` element differs in the attribute `desc` that you can decide to edit. 
 

 ## Update Substation
The difference between **Merge Project** and **Update Substation** is that the later is focusing only on the `Substation` element and the process is automated. We have robed the user of its options to reduce the complexity. This means in detail that that we pre-define the selection of the four options to be:

1. Edit: selected 
2. Add: selected
3. Delete: de-selected
4. Merge: selected 

In order to produce valid files or better to not knowingly break valid files elements of `LNode` are checked before editing and adding to be unique within the `Substation` element and to reference to an existing `LN` or `LN0` in the project. E.g. if the imported project has a `LNode` that is pointing to a logical node that does not exist in the existing project the `LNode` element is ignored.
 