import axios from "axios";
import store from "../store";
import { updateUser } from "../redux/actions/user";
import { selectUserData } from "../redux/selectors/userSelectors";

// TOMCAT
//const API_URL = "https://localhost:8443/demo-rest-auth-login/api/auth/"; // type this on the browser will force it to display cert. list selection

// EXPRESS
const API_URL = "http://localhost:9100/api/search/"; // type this on the browser will force it to display cert. list selection

/**
 * Provide rest service for Home page
 */
class SearchService {
  getApplicants() {
    return (
      axios
        //.get(API_URL + "user", {}) // for TOMCAT
        .get(API_URL + "applicantSearch", {}) // FOR EXPRESS
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          alert(error.message);

          return error;
        })
    );
  }

  getDocuments() {
    return (
      axios
        //.get(API_URL + "user", {}) // for TOMCAT
        .get(API_URL + "documentSearch", {}) // FOR EXPRESS
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          alert(error.message);

          return error;
        })
    );
  }
  getSavedSearches() {
    return (
      axios
        //.get(API_URL + "user", {}) // for TOMCAT
        .get(API_URL + "savedSearch", {}) // FOR EXPRESS
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

export default new SearchService();
