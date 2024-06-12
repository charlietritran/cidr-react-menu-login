import React, { useState, useEffect } from "react";
import { useDispatch } from 'react-redux'
import { useHistory } from "react-router-dom";


import Form from "react-validation/build/form";
import UserService from "../../services/user.service";
import AuthService from "../../services/auth.service";

import store from "../.././store";
import { updateUser } from "../.././redux/actions/user";
import {selectUserData} from "../.././redux/selectors/userSelectors";

function EntryPoint (props) {
	
	const dispatch = useDispatch();
	
	const [content, setContent] = useState("");
	const [currentUser, setCurrentUser] = useState(undefined);
	const [loading, setLoading] = useState(false);
	const [message, setMessage] = useState("");  
	const history = useHistory();
    
    // Similar to componentDidMount and componentDidUpdate:
	useEffect(() => {
	    // Update the document title using the browser API
	    const user = AuthService.getCurrentUser();
	    setCurrentUser(user);

	}, []); // Add empty array to force it run only one time.  no repeat after render


	function handleLogin(e) {
		
	    e.preventDefault();
	    setMessage("");
	    setLoading(true);
	   
	      AuthService.authenticate().then( data => {
		
			  // If valid, load profile page
	          //props.history.push("/cidr-react-menu-login/profile");
	          
	          
	           if (data.accessToken) {

		          localStorage.setItem("user", JSON.stringify(data));
		          //store.dispatch(updateUser(JSON.stringify(data)));
		          dispatch({ type: 'user/update', payload: JSON.stringify(data) })
		         //alert("ENTRY POPINT - CURRENT USER - AFTER UPDATING STORE:" + selectUserData(store.getState()));
		          //store.dispatch(updateUser({username:"tritran"}));
		        }
        
	          //window.location.reload();

	          
	          props.browserHistory.push('/')
	        },
	        error => {
	          setMessage(
	            (error.response &&
	              error.response.data &&
	              error.response.data.message) ||
	            error.message ||
	            error.toString());
	          setLoading(false);
	                  }
	      );
	    
	}
  

    return (
      <div className="container">
        <header className="jumbotron">
          <h3>{content}</h3>
        </header>
        <div>
        <br/>
<table align="center" title="US DEPARTMENT OF DEFENSE WARNING STATEMENT">
            <tr>
                <td colspan="3">
                    <img src="/images/ENSS.jpg" width="1223" height="65"/>
                </td>
            </tr>
             
            <tr>
                <td colspan="3">&nbsp;</td>
            </tr>
             
            <tr>
                <td width="15%"></td>
                <td>
                    <p style={{color:"DarkBlue" ,fontSize: "25px"}}>US Department of Homeland Security Warning Statement</p>
                    <hr/>
                    <p style={{color:"DarkBlue" ,fontSize: "18px"}}>
                        You are accessing a U.S. government information system, which includes (1) this computer, (2)
                        this computer network, (3) all computers connected to this network, and (4) all devices and
                        storage media attached to this network or a computer on this network. This information system is
                        provided for U.S. Government-authorized use only. Unauthorized or improper use or access of this
                        system may result in disciplinary action, as well as civil or criminal penalties. 
                        <br/>
                         By using this information system, you understand and consent to the following:
                    </p>
                    <ul style={{color:"DarkBlue" ,fontSize: "18px"}}>
                        <li>You have no reasonable expectation of privacy when you use this information system. This
                            includes any communication or data transiting or stored on this information system. At any
                            time, and for any lawful government purpose, the government may, without notice, monitor,
                            intercept, search and seize any communication or data transiting or stored on this
                            information system.</li>
                        <li>The government may disclose or use any communication or data transiting or stored on this
                            information system for any lawful government purpose, including but not limited to law
                            enforcement purposes.</li>
                        <li>You are NOT authorized to process information above the SECRET level on this information
                            system.</li>
                    </ul>

                    <hr/>
                </td>
                <td width="25%"></td>
            </tr>

        </table>
        
        </div>
        <br/>
        
        {!currentUser && (
              <div className="form-group" align="center" >
		          <Form  onSubmit={handleLogin} >
		              <button className="btn btn-primary btn-block" disabled={loading} >
		                {loading && (<span className="spinner-border spinner-border-sm"></span> )}
		                <span>I Accept</span>
		              </button>
	              </Form>
            </div>
            )
        }



        
          
            
      </div>
    );
}

export default EntryPoint;

