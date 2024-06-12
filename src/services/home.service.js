import axios from "axios";
import store from "../store";
import { updateUser } from "../redux/actions/user";
import { selectUserData } from "../redux/selectors/userSelectors";

// TOMCAT
//const API_URL = "https://localhost:8443/demo-rest-auth-login/api/auth/"; // type this on the browser will force it to display cert. list selection

// EXPRESS
const API_URL = "http://localhost:9100/api/home/"; // type this on the browser will force it to display cert. list selection

/**
 * Provide rest service for Home page
 */
class HomeService {
  getSavedSearches() {
    return (
      axios
        //.get(API_URL + "user", {}) // for TOMCAT
        .get(API_URL + "savedSearches", {}) // FOR EXPRESS
        .then((response) => {
          return response.data;
        })
        .catch((error) => {
          alert(error.message);

          return error;
        })
    );
  }

  getFlaggedSearches() {
    return (
      axios
        //.get(API_URL + "user", {}) // for TOMCAT
        .get(API_URL + "flaggedSearches", {}) // FOR EXPRESS
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

export default new HomeService();
