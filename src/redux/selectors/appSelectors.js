// ----------------------------------------------------------- //
//
// Defined Selectors to get inittial store values for citm-ui
// State: is the overall state of the app
// Usage: Import selector to the file, then directly call selectorNAMEstate)
//
// ----------------------------------------------------------- //

// Selectors for all app state
export const selectApp = (state) => state.app; // {acopUserData: {....}, app:{....}}
export const selectCountries = (state) => state.app.countries; // {app: {...}}
export const selectStates = (state) => state.app.states; // {app: {...}}
export const selectApplicantTypes = (state) => state.app.applicantTypes;
export const selectFormNumbers = (state) => state.app.formNumbers;
export const selectClassifications = (state) => state.app.classifications;
