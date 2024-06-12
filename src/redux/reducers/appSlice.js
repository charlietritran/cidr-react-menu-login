import AppService from "../../services/app.service";

// INIT STATE OF APP
const initialState = {};

export async function fetchCidrData(dispatch, getState) {
  const state = getState();

  AppService.getCountries().then(
    (data) => {
      if (data) {
        console.log("COUNTRIES:" + data);
        dispatch({ type: "app/countries", payload: data });
      }
    },
    (error) => {
      alert(error.message);
    }
  );

  AppService.getStates().then(
    (data) => {
      if (data) {
        console.log("STATES:" + data);
        dispatch({ type: "app/states", payload: data });
      }
    },
    (error) => {
      alert(error.message);
    }
  );

  AppService.getApplicantTypes().then(
    (data) => {
      if (data) {
        console.log("APPLICANT TYPES:" + data);
        //alert("APPLICANT TYPES:" + data);
        dispatch({ type: "app/applicantTypes", payload: data });
      }
    },
    (error) => {
      alert(error.message);
    }
  );

  AppService.getFormNumbers().then(
    (data) => {
      if (data) {
        console.log("FORM NUMBERS:" + data);
        //alert("FORM NUMBERS:" + data);
        dispatch({ type: "app/formNumbers", payload: data });
      }
    },
    (error) => {
      alert(error.message);
    }
  );

  AppService.getClassifications().then(
    (data) => {
      if (data) {
        console.log("CLASSIFICATIONS:" + data);
        //alert("APPLICANT TYPES:" + data);
        dispatch({ type: "app/classifications", payload: data });
      }
    },
    (error) => {
      alert(error.message);
    }
  );
}

/**
 * A reducer to populate citmData to store
 *
 * @param {*} state
 * @param {*} action
 * @returns
 */
export default function appReducer(state = initialState, action) {
  switch (action.type) {
    case "app/states": {
      return {
        ...state,
        states: action.payload,
      };
    }
    case "app/countries": {
      return {
        ...state,
        countries: action.payload,
      };
    }
    case "app/applicantTypes": {
      return {
        ...state,
        applicantTypes: action.payload,
      };
    }
    case "app/formNumbers": {
      return {
        ...state,
        formNumbers: action.payload,
      };
    }
    case "app/classifications": {
      return {
        ...state,
        classifications: action.payload,
      };
    }
    default: {
      return state;
    }
  }
}
