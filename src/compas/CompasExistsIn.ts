import {property} from "lit-element";

import {LitElementConstructor, Mixin} from "../foundation.js";

import {CompasSclDataService} from "../compas-services/CompasSclDataService.js";
import {getTypeFromDocName} from "./foundation.js";

export type CompasExistsInElement = Mixin<typeof CompasExistsIn>;

export function CompasExistsIn<TBase extends LitElementConstructor>(Base: TBase) {
  class CompasExistsInElement extends Base {
    @property({type: String})
    docName!: string;
    @property({type: String})
    docId?: string;
    @property({type: Boolean})
    existInCompas?: boolean;

    firstUpdated(): void {
      this.checkExistInCompas();
    }

    callService(docType: string, docId: string) {
      return CompasSclDataService().listVersions(docType, docId);
    }

    checkExistInCompas(): void {
      if (this.docId) {
        // Use the versions call to check if any exist, because then the document also exists
        // And it safes bandwidth not to retrieve the whole document.
        const docType = getTypeFromDocName(this.docName);
        this.callService(docType, this.docId)
          .then(() => this.existInCompas = true)
          .catch(() => {
            this.existInCompas = false;
          });
      } else {
        this.existInCompas = false;
      }
    }
  }

  return CompasExistsInElement;
}
