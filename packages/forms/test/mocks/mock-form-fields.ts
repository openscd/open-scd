import { FormField, Value } from '../../src/types/types.js';

export class MockFormField implements FormField {
  value: Value = null;
  error = false;
  errorText: string | null = null;
}
