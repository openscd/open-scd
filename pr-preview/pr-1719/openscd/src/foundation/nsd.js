export const iec6185074 = fetch("public/xml/IEC_61850-7-4_2007B5.nsd").then((response) => response.text()).then((str) => new DOMParser().parseFromString(str, "application/xml"));
export const iec6185073 = fetch("public/xml/IEC_61850-7-3_2007B5.nsd").then((response) => response.text()).then((str) => new DOMParser().parseFromString(str, "application/xml"));
export const iec6185072 = fetch("public/xml/IEC_61850-7-2_2007B5.nsd").then((response) => response.text()).then((str) => new DOMParser().parseFromString(str, "application/xml"));
export const iec6185081 = fetch("public/xml/IEC_61850-8-1_2003A2.nsd").then((response) => response.text()).then((str) => new DOMParser().parseFromString(str, "application/xml"));
