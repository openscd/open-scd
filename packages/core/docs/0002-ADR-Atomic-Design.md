# Atomic Design proposal for Open-SCD

Date: 2023-05-24

## Status

Open

## Context
If we want to build robust reusable components, we should make use of the Atomic Design principal. 
This design principal consists of multiple levels of components:
* Atoms
* Molecules
* Organisms
* Templates
* Page

A molecule is a group of atoms together. An organism is a group of molecules together. etc. etc.

#### Example

We have a textfield component (Atom) called @openscd/oscd-textfield.
We also have a button component (Atom) @openscd/oscd-button.

We now can create a search component (Molecule) called @openscd/oscd-search.


### Background
Related links:
- [Atomic Web Design](https://bradfrost.com/blog/post/atomic-web-design/)

## Decision
T.B.D.


## Consequences
This decision will mean that the current OSCD components might need some extra 
work to split up components by type (Atoms/Molecules/Organisms).
Also, we might introduce more overhead if we split all the atoms and molecules up by repository.
