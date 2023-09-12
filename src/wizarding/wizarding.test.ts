import { LitElement } from "lit-element"
import { Wizarding } from "./wizarding.js"

describe('Wizarding', () => {

  it('works', () => {
    const extendedClass =  Wizarding(LitElement)
    console.log({level:"test", extendedClass })

  })

})
