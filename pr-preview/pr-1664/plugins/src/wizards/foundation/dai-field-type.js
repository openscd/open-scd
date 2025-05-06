import {html} from "../../../../_snowpack/pkg/lit-html.js";
import {get} from "../../../../_snowpack/pkg/lit-translate.js";
import "../../../../_snowpack/pkg/@material/mwc-list/mwc-list-item.js";
import "../../../../openscd/src/wizard-textfield.js";
import "../../../../openscd/src/wizard-select.js";
import {
  getValue
} from "../../../../openscd/src/foundation.js";
const daiFieldTypes = [
  "BOOLEAN",
  "Enum",
  "FLOAT32",
  "FLOAT64",
  "INT8",
  "INT16",
  "INT24",
  "INT32",
  "INT64",
  "INT128",
  "INT8U",
  "INT16U",
  "INT24U",
  "INT32U",
  "Timestamp",
  "VisString32",
  "VisString64",
  "VisString65",
  "VisString129",
  "VisString255",
  "ObjRef",
  "Currency",
  "Octet64",
  "Octet6",
  "Octet16"
];
const emptyIfNull = (item, value) => {
  return item === null ? "" : value;
};
export function getCustomField() {
  return {
    BOOLEAN: booleanField(),
    Enum: enumField(),
    FLOAT32: floatField("FLOAT32", -(2 ** 32), 2 ** 32 - 1),
    FLOAT64: floatField("FLOAT64", -(2 ** 64), 2 ** 64 - 1),
    INT8: integerField("INT8", -(2 ** 8), 2 ** 8 - 1),
    INT16: integerField("INT16", -(2 ** 16), 2 ** 16 - 1),
    INT24: integerField("INT24", -(2 ** 24), 2 ** 24 - 1),
    INT32: integerField("INT32", -(2 ** 32), 2 ** 32 - 1),
    INT64: integerField("INT64", -(2 ** 64), 2 ** 64 - 1),
    INT128: integerField("INT128", -(2 ** 128), 2 ** 128 - 1),
    INT8U: integerField("INT8U", 0, 2 ** 8 - 1),
    INT16U: integerField("INT16U", 0, 2 ** 16 - 1),
    INT24U: integerField("INT24U", 0, 2 ** 24 - 1),
    INT32U: integerField("INT32U", 0, 2 ** 32 - 1),
    Timestamp: timestampField(),
    VisString32: stringField("VisString32", 32),
    VisString64: stringField("VisString64", 64),
    VisString65: stringField("VisString65", 65),
    VisString129: stringField("VisString129", 129),
    VisString255: stringField("VisString255", 255),
    ObjRef: stringField("VisString129", 129),
    Currency: stringField("Currency", 3),
    Octet64: stringField("Octet64", 64 * 2),
    Octet6: stringField("Octet6", 6 * 2),
    Octet16: stringField("Octet16", 16 * 2)
  };
  function booleanField() {
    return {
      render: (element, instanceElement, numOfSGs = null) => {
        return (numOfSGs ? [...Array(numOfSGs)] : [numOfSGs]).map((item, i) => {
          return html`<wizard-select
            id="Val${emptyIfNull(item, `${i + 1}`)}"
            label="Val${emptyIfNull(item, ` for sGroup ${i + 1}`)}"
            .maybeValue=${getInstanceValue(instanceElement)}
            fixedMenuPosition
          >
            <mwc-list-item value="true">true</mwc-list-item>
            <mwc-list-item value="false">false</mwc-list-item>
          </wizard-select>`;
        });
      },
      value: (inputs, sGroup) => {
        return getValue(inputs.find((input) => input.id === `Val${sGroup || ""}`));
      }
    };
  }
  function enumField() {
    return {
      render: (element, instanceElement, numOfSGs = null) => {
        return (numOfSGs ? [...Array(numOfSGs)] : [numOfSGs]).map((item, i) => {
          return html`<wizard-select
            id="Val${emptyIfNull(item, `${i + 1}`)}"
            label="Val${emptyIfNull(item, ` for sGroup ${i + 1}`)}"
            .maybeValue=${getInstanceValue(instanceElement)}
            fixedMenuPosition
          >
            ${getEnumValues(element).map((enumValue) => {
            return html`<mwc-list-item value="${enumValue}"
                >${enumValue}</mwc-list-item
              >`;
          })}
          </wizard-select>`;
        });
      },
      value: (inputs, sGroup) => {
        return getValue(inputs.find((input) => input.id === `Val${sGroup || ""}`));
      }
    };
  }
  function floatField(type, min, max) {
    return {
      render: (element, instanceElement, numOfSGs = null) => {
        return (numOfSGs ? [...Array(numOfSGs)] : [numOfSGs]).map((item, i) => {
          return html`<wizard-textfield
            id="Val${emptyIfNull(item, `${i + 1}`)}"
            label="Val${emptyIfNull(item, ` for sGroup ${i + 1}`)}"
            .maybeValue=${getInstanceValue(instanceElement)}
            helper="${get("dai.wizard.valueHelper", {type})}"
            type="number"
            min=${min}
            max=${max}
            step="0.1"
          >
          </wizard-textfield>`;
        });
      },
      value: (inputs, sGroup) => {
        return getValue(inputs.find((input) => input.id === `Val${sGroup || ""}`));
      }
    };
  }
  function integerField(type, min, max) {
    return {
      render: (element, instanceElement, numOfSGs = null) => {
        return (numOfSGs ? [...Array(numOfSGs)] : [numOfSGs]).map((item, i) => {
          return html`<wizard-textfield
            id="Val${emptyIfNull(item, `${i + 1}`)}"
            label="Val${emptyIfNull(item, ` for sGroup ${i + 1}`)}"
            .maybeValue=${getInstanceValue(instanceElement)}
            helper="${get("dai.wizard.valueHelper", {type})}"
            type="number"
            min=${min}
            max=${max}
          >
          </wizard-textfield>`;
        });
      },
      value: (inputs, sGroup) => {
        return getValue(inputs.find((input) => input.id === `Val${sGroup || ""}`));
      }
    };
  }
  function timestampField() {
    return {
      render: (element, instanceElement, numOfSGs = null) => {
        const value = getInstanceValue(instanceElement);
        return (numOfSGs ? [...Array(numOfSGs)] : [numOfSGs]).reduce((acc, item, i) => {
          return acc.concat([
            html`<wizard-textfield
                id="ValDate${emptyIfNull(item, `${i + 1}`)}"
                label="Val (Date)${emptyIfNull(item, ` for sGroup ${i + 1}`)}"
                .maybeValue=${getDateValueFromTimestamp(value)}
                type="date"
              >
              </wizard-textfield>`,
            html`<wizard-textfield
                id="ValTime${emptyIfNull(item, `${i + 1}`)}"
                label="Val (Time)${emptyIfNull(item, ` for sGroup ${i + 1}`)}"
                .maybeValue=${getTimeValueFromTimestamp(value)}
                type="time"
                step="1"
              >
              </wizard-textfield>`
          ]);
        }, []);
      },
      value: (inputs, sGroup) => {
        const values = [`ValDate${sGroup || ""}`, `ValTime${sGroup || ""}`].map((id) => getValue(inputs.find((input) => input.id === id)));
        const dateValue = values[0] ? values[0] : "0000-00-00";
        const timeValue = values[1] ? values[1] : "00:00:00";
        return dateValue + "T" + timeValue + ".000";
      }
    };
  }
  function stringField(type, maxNrOfCharacters) {
    return {
      render: (element, instanceElement, numOfSGs = null) => {
        return (numOfSGs ? [...Array(numOfSGs)] : [numOfSGs]).map((item, i) => {
          return html`<wizard-textfield
            id="Val${emptyIfNull(item, ` ${i + 1}`)}"
            label="Val${emptyIfNull(item, ` for sGroup ${i + 1}`)}"
            .maybeValue=${getInstanceValue(instanceElement)}
            helper="${get("dai.wizard.valueHelper", {type})}"
            maxLength=${maxNrOfCharacters}
            type="text"
          >
          </wizard-textfield>`;
        });
      },
      value: (inputs, sGroup) => {
        return getValue(inputs.find((input) => input.id === `Val${sGroup || ""}`));
      }
    };
  }
  function getInstanceValue(daiOrVal) {
    const val = daiOrVal?.querySelector("Val") ? daiOrVal?.querySelector("Val") : daiOrVal;
    return val?.textContent?.trim() ?? "";
  }
  function getEnumValues(element) {
    const daType = element.getAttribute("type");
    const values = [];
    Array.from(element.ownerDocument.querySelectorAll(`EnumType[id="${daType}"] > EnumVal`)).filter((enumValElement) => enumValElement.textContent && enumValElement.textContent !== "").sort((eve1, eve2) => parseInt(eve1.getAttribute("ord") ?? "0") - parseInt(eve2.getAttribute("ord") ?? "0")).forEach((enumValElement) => {
      values.push(enumValElement.textContent ?? "");
    });
    return values;
  }
}
export function getDateValueFromTimestamp(value) {
  const values = value.split("T");
  let dateValue = values[0];
  if (!/^\d{4}-\d{2}-\d{2}$/.test(dateValue)) {
    dateValue = null;
  }
  if (dateValue === "0000-00-00") {
    dateValue = null;
  }
  return dateValue;
}
export function getTimeValueFromTimestamp(value) {
  const values = value.split("T");
  let timeValue = null;
  if (values.length == 2) {
    timeValue = values[1];
    if (timeValue.length > 8) {
      timeValue = timeValue.substring(0, 8);
    }
    if (!/^\d{2}:\d{2}:\d{2}$/.test(timeValue)) {
      timeValue = null;
    }
    if (timeValue === "00:00:00") {
      timeValue = null;
    }
  }
  return timeValue;
}
