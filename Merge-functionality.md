Merge is a basic functionality that allows to import information from other files or to update existing elements with information from other files. 

To understand what **OpenSCD** is doing behind the scenes we need to explain to terms first:

1. Same: Two elements are the same if they have the same identity. In case of **OpenSCD** we have defined the identity for all elements in our foundation and it is a string of all unique attributes of the path. E.g. A `Bay` must have a `name` attribute and it must be unique within the `VoltageLevel` - so says the standard. This is the id for this element. The same is true vor all parent elements until the `SCL` tag. Therefore the identity of a `Bay` are all `name` attributes separated by `>`: `AA1>E1>Q01` for example. Other element might have other identifiers like the `id` attribute of `LNodeType` element. Sometimes we have to use the index to build the identity.

2. Equal: Two elements are equal if it and all its children are the same and their attributes are equal. 

The merge functionality is using these two attributes of element to calculate a difference and allows to merge elements from different files.

To use this functionality you can click on **Merge Project** or **Update Substation** - merge only the `Substation` elements. You can import any `SCL` file - the imported file and merge to the project - which is the existing file. Merge allows you to step through the file and for each element select from four basic options.

<img align="right" src="https://user-images.githubusercontent.com/66802940/133101844-ae42bfc5-4700-49e2-96cd-3f1ddbc040d4.png" alt="alt text" width="250">

1. Edit: Attributes same - element's - imported and existing - are present but differ. E.g in the existing it is *Bay01* and the imported *Bay Q01*
2. Add: An attribute is present in the imported but not in the existing file or a child element is present in the imported but not in the existing file.
3. Delete: An attribute is present in the existing but not in the imported same element or a same child element is present in the existing but not in the imported file. E.g. the attribute *sxy:x* is present in the existing but not in the imported file.
4. Merge: Element in the existing file and the imported file are the same but differ in attribute and or child elements themselves.

In OpenSCD you can merge two files together. The merge is a step by step procedure where the software guide you through the process. It starts with children of the SCL root element moving deeper with each step. 
 
The difference between **Merge Project** and **Update Substation** is that the later is focusing only on the `Substation` element and the process is more automated. We have robed the user of its options a little bit to reduce the complexity. This means in detail that:

1. Edit: selected 
2. Add: selected
3. Delete: de-selected
4. Merge: selected 

In order to produce valid files or better to not knowingly break valid files elements of `LNode` are checked before editing and adding to be unique with the `Substation` element and to reference to an existing `LN` or `LN0` in the project. E.g. if the imported project has a `LNode` that is pointing to a logical node that does not exist in the existing project the `LNode` element is ignored.
 