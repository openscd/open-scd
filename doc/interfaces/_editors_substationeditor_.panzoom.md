[open-scd](../README.md) › [Globals](../globals.md) › ["editors/SubstationEditor"](../modules/_editors_substationeditor_.md) › [PanZoom](_editors_substationeditor_.panzoom.md)

# Interface: PanZoom

## Hierarchy

* **PanZoom**

## Index

### Properties

* [centerOn](_editors_substationeditor_.panzoom.md#centeron)
* [dispose](_editors_substationeditor_.panzoom.md#dispose)
* [fire](_editors_substationeditor_.panzoom.md#fire)
* [getMaxZoom](_editors_substationeditor_.panzoom.md#getmaxzoom)
* [getMinZoom](_editors_substationeditor_.panzoom.md#getminzoom)
* [getTransform](_editors_substationeditor_.panzoom.md#gettransform)
* [getTransformOrigin](_editors_substationeditor_.panzoom.md#gettransformorigin)
* [getZoomSpeed](_editors_substationeditor_.panzoom.md#getzoomspeed)
* [isPaused](_editors_substationeditor_.panzoom.md#ispaused)
* [moveBy](_editors_substationeditor_.panzoom.md#moveby)
* [moveTo](_editors_substationeditor_.panzoom.md#moveto)
* [off](_editors_substationeditor_.panzoom.md#off)
* [on](_editors_substationeditor_.panzoom.md#on)
* [pause](_editors_substationeditor_.panzoom.md#pause)
* [resume](_editors_substationeditor_.panzoom.md#resume)
* [setMaxZoom](_editors_substationeditor_.panzoom.md#setmaxzoom)
* [setMinZoom](_editors_substationeditor_.panzoom.md#setminzoom)
* [setTransformOrigin](_editors_substationeditor_.panzoom.md#settransformorigin)
* [setZoomSpeed](_editors_substationeditor_.panzoom.md#setzoomspeed)
* [showRectangle](_editors_substationeditor_.panzoom.md#showrectangle)
* [smoothZoom](_editors_substationeditor_.panzoom.md#smoothzoom)
* [smoothZoomAbs](_editors_substationeditor_.panzoom.md#smoothzoomabs)
* [zoomAbs](_editors_substationeditor_.panzoom.md#zoomabs)
* [zoomTo](_editors_substationeditor_.panzoom.md#zoomto)

## Properties

###  centerOn

• **centerOn**: *function*

*Defined in [src/editors/SubstationEditor.ts:65](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L65)*

#### Type declaration:

▸ (`ui`: any): *void*

**Parameters:**

Name | Type |
------ | ------ |
`ui` | any |

___

###  dispose

• **dispose**: *function*

*Defined in [src/editors/SubstationEditor.ts:62](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L62)*

#### Type declaration:

▸ (): *void*

___

###  fire

• **fire**: *function*

*Defined in [src/editors/SubstationEditor.ts:85](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L85)*

#### Type declaration:

▸ (`eventName`: string): *void*

**Parameters:**

Name | Type |
------ | ------ |
`eventName` | string |

___

###  getMaxZoom

• **getMaxZoom**: *function*

*Defined in [src/editors/SubstationEditor.ts:88](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L88)*

#### Type declaration:

▸ (): *number*

___

###  getMinZoom

• **getMinZoom**: *function*

*Defined in [src/editors/SubstationEditor.ts:86](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L86)*

#### Type declaration:

▸ (): *number*

___

###  getTransform

• **getTransform**: *function*

*Defined in [src/editors/SubstationEditor.ts:78](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L78)*

#### Type declaration:

▸ (): *[Transform](_editors_substationeditor_.transform.md)*

___

###  getTransformOrigin

• **getTransformOrigin**: *function*

*Defined in [src/editors/SubstationEditor.ts:90](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L90)*

#### Type declaration:

▸ (): *[TransformOrigin](_editors_substationeditor_.transformorigin.md)*

___

###  getZoomSpeed

• **getZoomSpeed**: *function*

*Defined in [src/editors/SubstationEditor.ts:92](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L92)*

#### Type declaration:

▸ (): *number*

___

###  isPaused

• **isPaused**: *function*

*Defined in [src/editors/SubstationEditor.ts:82](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L82)*

#### Type declaration:

▸ (): *boolean*

___

###  moveBy

• **moveBy**: *function*

*Defined in [src/editors/SubstationEditor.ts:63](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L63)*

#### Type declaration:

▸ (`dx`: number, `dy`: number, `smooth`: boolean): *void*

**Parameters:**

Name | Type |
------ | ------ |
`dx` | number |
`dy` | number |
`smooth` | boolean |

___

###  moveTo

• **moveTo**: *function*

*Defined in [src/editors/SubstationEditor.ts:64](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L64)*

#### Type declaration:

▸ (`x`: number, `y`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`x` | number |
`y` | number |

___

###  off

• **off**: *function*

*Defined in [src/editors/SubstationEditor.ts:84](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L84)*

#### Type declaration:

▸ ‹**T**›(`eventName`: string, `handler`: function): *void*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **eventName**: *string*

▪ **handler**: *function*

▸ (`e`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`e` | T |

___

###  on

• **on**: *function*

*Defined in [src/editors/SubstationEditor.ts:83](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L83)*

#### Type declaration:

▸ ‹**T**›(`eventName`: string, `handler`: function): *void*

**Type parameters:**

▪ **T**

**Parameters:**

▪ **eventName**: *string*

▪ **handler**: *function*

▸ (`e`: T): *void*

**Parameters:**

Name | Type |
------ | ------ |
`e` | T |

___

###  pause

• **pause**: *function*

*Defined in [src/editors/SubstationEditor.ts:80](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L80)*

#### Type declaration:

▸ (): *void*

___

###  resume

• **resume**: *function*

*Defined in [src/editors/SubstationEditor.ts:81](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L81)*

#### Type declaration:

▸ (): *void*

___

###  setMaxZoom

• **setMaxZoom**: *function*

*Defined in [src/editors/SubstationEditor.ts:89](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L89)*

#### Type declaration:

▸ (`newMaxZoom`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`newMaxZoom` | number |

___

###  setMinZoom

• **setMinZoom**: *function*

*Defined in [src/editors/SubstationEditor.ts:87](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L87)*

#### Type declaration:

▸ (`newMinZoom`: number): *number*

**Parameters:**

Name | Type |
------ | ------ |
`newMinZoom` | number |

___

###  setTransformOrigin

• **setTransformOrigin**: *function*

*Defined in [src/editors/SubstationEditor.ts:91](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L91)*

#### Type declaration:

▸ (`newTransformOrigin`: [TransformOrigin](_editors_substationeditor_.transformorigin.md)): *void*

**Parameters:**

Name | Type |
------ | ------ |
`newTransformOrigin` | [TransformOrigin](_editors_substationeditor_.transformorigin.md) |

___

###  setZoomSpeed

• **setZoomSpeed**: *function*

*Defined in [src/editors/SubstationEditor.ts:93](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L93)*

#### Type declaration:

▸ (`zoomSpeed`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`zoomSpeed` | number |

___

###  showRectangle

• **showRectangle**: *function*

*Defined in [src/editors/SubstationEditor.ts:79](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L79)*

#### Type declaration:

▸ (`rect`: ClientRect): *void*

**Parameters:**

Name | Type |
------ | ------ |
`rect` | ClientRect |

___

###  smoothZoom

• **smoothZoom**: *function*

*Defined in [src/editors/SubstationEditor.ts:68](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L68)*

#### Type declaration:

▸ (`clientX`: number, `clientY`: number, `scaleMultiplier`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`clientX` | number |
`clientY` | number |
`scaleMultiplier` | number |

___

###  smoothZoomAbs

• **smoothZoomAbs**: *function*

*Defined in [src/editors/SubstationEditor.ts:73](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L73)*

#### Type declaration:

▸ (`clientX`: number, `clientY`: number, `toScaleValue`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`clientX` | number |
`clientY` | number |
`toScaleValue` | number |

___

###  zoomAbs

• **zoomAbs**: *function*

*Defined in [src/editors/SubstationEditor.ts:67](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L67)*

#### Type declaration:

▸ (`clientX`: number, `clientY`: number, `zoomLevel`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`clientX` | number |
`clientY` | number |
`zoomLevel` | number |

___

###  zoomTo

• **zoomTo**: *function*

*Defined in [src/editors/SubstationEditor.ts:66](https://github.com/openscd/open-scd/blob/32cb8f5/src/editors/SubstationEditor.ts#L66)*

#### Type declaration:

▸ (`clientX`: number, `clientY`: number, `scaleMultiplier`: number): *void*

**Parameters:**

Name | Type |
------ | ------ |
`clientX` | number |
`clientY` | number |
`scaleMultiplier` | number |
