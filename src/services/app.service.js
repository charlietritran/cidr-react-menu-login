import axios from "axios";
import store from "../store";
import { updateUser } from "../redux/actions/user";
import { selectUserData } from "../redux/selectors/userSelectors";

// TOMCAT
//const API_URL = "https://localhost:8443/demo-rest-auth-login/api/auth/"; // type this on the browser will force it to display cert. list selection

// EXPRESS
const API_URL = "http://localhost:9100/api/select/"; // type this on the browser will force it to display cert. list selection

/**
 * Provide rest service for Home page
 */
class AppService {
  getApplicantTypes() {
    return (
      axios
        //.get(API_URL + "user", {}) // for TOMCAT
        .get(API_URL + "applicantType", {}) // FOR EXPRESS
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          alert(error.message);

          return error;
        })
    );
  }

  getFormNumbers() {
    return (
      axios
        //.get(API_URL + "user", {}) // for TOMCAT
        .get(API_URL + "formNumber", {}) // FOR EXPRESS
        .then((response) => {
          //alert("FORM NUBMER - RESPONSE DATA:" + response.data);
          return response.data;
        })
        .catch((error) => {
          alert(error.message);

          return error;
        })
    );
  }

  getCountries() {
    return (
      axios
        //.get(API_URL + "user", {}) // for TOMCAT
        .get(API_URL + "country", {}) // FOR EXPRESS
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          alert(error.message);

          return error;
        })
    );
  }

  getStates() {
    return (
      axios
        //.get(API_URL + "user", {}) // for TOMCAT
        .get(API_URL + "state", {}) // FOR EXPRESS
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          alert(error.message);

          return error;
        })
    );
  }
  getClassifications() {
    return (
      axios
        //.get(API_URL + "user", {}) // for TOMCAT
        .get(API_URL + "classification", {}) // FOR EXPRESS
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          alert(error.message);

          return error;
        })
    );
  }
}

export default new AppService();
