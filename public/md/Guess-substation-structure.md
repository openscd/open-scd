# What
The `Substation` is an optional element and therefore is often missing in so-called bottom-up projects. With `OpenSCD` you can add the `Substation` element in the aftermath. 
For exactly this purpose the `guess` function has been introduced to `OpenSCD` to either speed up this task or to give pure beginner an impression what to do. 

Disclaimer: A guess will never be perfect as it is based on assumptions (see below) that not necessary fit to the IEDs you have in the `SCL`-file. However, you can give it a try and `undo`.

# How to use 
The `Substation` is an optional element and therefore is often missing in so-called bottom-up projects. With `OpenSCD` you can add the `Substation` element in the aftermath. 
For exactly this purpose the `guess` function has been introduced to `OpenSCD`. This is how you can use the function:
- Open `SCL`-file with missing substation or delete all `Substation`-elements
- Click on the fab button `+Add Substation`
- In the dialog `Add Substation` check the box `Guess content`
- Choose the `Control model (ctlModel)` that identify your switch gear in the IED
- Start `GUESS CONTENT`


# Basic assumption
The biggest challenge with the guess function is to identify the amount of voltage levels (`VoltageLevel`), bays (`Bay`) and so-called conducting equipment or primary equipment(`ConductingEquipment`):
- assumes only one voltage level  
- bays are identified with the logical node `CSWI`. That means, if there is at least a logical node `CSWI` and the mandatory data object `Pos` matches the chosen control model (ctlModel) a bay is created for this particular IED.
- each of the logical nodes `CSWI` with matching `ctlModel ` represents a conducting equipment. If a `XCBR` is connected to it (same `prefix` and `inst` in the same `LDevice`), the conducting equipement `type` is `CBR` in every other case `DIS`. 
- logical node connections `LNode` are automatically assigned to the conducting equipment. Ideally this is the `CSWI`, a `XCRB` or `XSWI` and `CILO`

# Tips
- Especially the assumption that there is only one voltage level does not match big files with lots of IEDs. Use the `move` function to allocate bay to other voltage levels.


