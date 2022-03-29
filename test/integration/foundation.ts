export function cleanLocalStorageForNsdocFiles(): void {
  // Cleanup NSDoc Files from LocalStorage
  localStorage.removeItem('IEC 61850-7-2');
  localStorage.removeItem('IEC 61850-7-3');
  localStorage.removeItem('IEC 61850-7-4');
  localStorage.removeItem('IEC 61850-8-1');
}
