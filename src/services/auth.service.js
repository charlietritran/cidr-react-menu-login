import axios from "axios";
import store from ".././store";
import { updateUser } from ".././redux/actions/user";

import { selectUserData } from ".././redux/selectors/userSelectors";

//const API_URL = "https://localhost:8084/demo-rest-auth-login/api/auth/";

// TOMCAT
//const API_URL = "https://localhost:8443/demo-rest-auth-login/api/auth/"; // type this on the browser will force it to display cert. list selection

// EXPRESS
const API_URL = "http://localhost:9100/api/user/cidrAdmin/"; // type this on the browser will force it to display cert. list selection

class AuthService {
  authenticate() {
    //alert("LOGIN - URLS:" + API_URL + "user");

    return (
      axios
        //.get(API_URL + "user", {}) // for TOMCAT
        .get(API_URL, {}) // FOR EXPRESS
        .then((response) => {
          //alert("GET USER SRV RSP:" + response.data);
          ////if (response.data.accessToken) {

          ////localStorage.setItem("user", JSON.stringify(response.data));
          ////store.dispatch(updateUser(JSON.stringify(response.data)));
          //alert("GET CURRENT USER - AFTER UPDATING STORE:" + selectUserData(store.getState()));
          //store.dispatch(updateUser({username:"tritran"}));
          ////}
          //alert("GET USER RESP STATUS:" + response.status);

          return response.data;
        })
        .catch((error) => {
          alert(error.message);

          //alert(error.message);
          alert(
            "NO VALID USER - PLEASE CLOSE BROWSER AND REOPEN TO SELECT A VALID CERTIFICATE."
          );
          return error;
        })
    );
  }

  logout() {
    localStorage.removeItem("user");
    store.dispatch(updateUser(null));
  }

  getCurrentUser() {
    console.log(
      "USER FROM REDUX STORE:" +
        JSON.stringify(selectUserData(store.getState()))
    );
    //console.log(
    //  "USER FROM STORAGE:" + JSON.stringify(localStorage.getItem("user"))
    //);
    //return JSON.parse(localStorage.getItem('user'));;
    return store.getState().user.userData;
  }
}

export default new AuthService();
