export interface CustomDAIValidation {
  validationMessage: string;
}

const daiValidationTypes = ['BOOLEAN'] as const;
export type DaiValidationTypes = typeof daiValidationTypes[number];

export const getCustomDaiValidation: Record<DaiValidationTypes, CustomDAIValidation> = {
  BOOLEAN: {
    validationMessage: "I want to have a boolean please"
  }
};