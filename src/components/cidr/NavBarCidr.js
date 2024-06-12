import React, { useState, useEffect, useSelector } from "react";
//import logo from '/images/cidr_logo.png';
import { Container, Nav, NavItem, Navbar, NavDropdown } from "react-bootstrap";
//import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import { BrowserRouter, Switch, Route, Link } from "react-router-dom";
import HomeCidr from "./Home";
import ApplicationSearch from "./search/ApplicationSearch";
import DocumentSearch from "./search/DocumentSearch";
import FlaggedSearches from "./search/FlaggedSearches";
import SavedSearches from "./search/SavedSearches";
import BulkSearches from "./search/BulkSearches";

import LHMReport from "./report/LHMReport";
import UserAcctReport from "./report/UserAcctReport";
import UserAcctSummaryReport from "./report/UserAcctSummaryReport";
import CidrUsageReport from "./report/CidrUsageReport";

import ManageUserAccts from "./admin/ManageUserAccts";
import ViewAuditLog from "./admin/ViewAuditLog";
import MonitorSolrServer from "./admin/MonitorSolrServer";

import LHMManagementDashboard from "./lhm/LHMManagementDashboard";
import ImportLHMBatch from "./lhm/ImportLHMBatch";
import ManageLHMBatches from "./lhm/ManageLHMBatches";
import ManageLHMDocuments from "./lhm/ManageLHMDocuments";

import ImportAFile from "./afile/ImportAFile";
import SearchAFile from "./afile/SearchAFile";

import ImportIVABFile from "./ivab//ImportIVABFile";
import SearchIVABFile from "./ivab//SearchIVABFile";

import CidrUserGuide from "./help/CidrUserGuide";
import LHMUserGuide from "./help/LHMUserGuide";
import CidrTraining from "./help/CidrTraining";

//Using react-icons library
import { BiHome } from "react-icons/bi";
import { BiSearch } from "react-icons/bi";

// SERVICES
import AuthService from "../../services/auth.service";

//Using fontawesome library
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome } from '@fortawesome/free-solid-svg-icons'
// import { library } from '@fortawesome/fontawesome-svg-core';
// library.add(faHome);

import store from "../.././store";
import { updateUser } from "../.././redux/actions/user";
import { selectUserData } from "../.././redux/selectors/userSelectors";

function NavBarCidr(props) {
  console.log(props);

  const searchTitle = (
    <span>
      <BiSearch />
      Search
    </span>
  );
  const [showCidrAdminBoard, setShowCidrAdminBoard] = useState(false);
  const [showLhmAdminBoard, setShowLhmAdminBoard] = useState(false);
  const [currentUser, setCurrentUser] = useState(undefined);

  // Similar to componentDidMount and componentDidUpdate:
  useEffect(() => {
    const user = AuthService.getCurrentUser();
    setCurrentUser(JSON.parse(user));
    const jUser = JSON.parse(user);
    setShowCidrAdminBoard(
      jUser.roles ? jUser.roles.includes("ROLE_CIDR_ADMIN") : false
    );
    setShowLhmAdminBoard(
      jUser.roles ? jUser.roles.includes("ROLE_LHM_ADMIN") : false
    );
  }, []); // Add empty array to force it run only one time.  no repeat after render

  function logOut() {
    AuthService.logout();
    setCurrentUser(undefined);
    setShowCidrAdminBoard(false);
    setShowLhmAdminBoard(false);
  }

  return (
    <BrowserRouter>
      <div className="App">
        <div>
          <Navbar bg="light" variant="info" expand="lg">
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                  {/* <FontAwesomeIcon icon={faHome}/> */}
                  <span>
                    <BiHome />
                    Home
                  </span>
                </Nav.Link>

                <NavDropdown title={searchTitle} id="search-nav-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/applicationSearch"}
                  >
                    Application Search
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/documentSearch"}
                  >
                    Document Search
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/flaggedSearches"}
                  >
                    Flagged Searches
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/savedSearches"}
                  >
                    Saved Searches
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/bulkSearches"}
                  >
                    Bulk Searches
                  </NavDropdown.Item>

                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Report" id="report-nav-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/report/lhmReport"}
                  >
                    LHM Report
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/report/userAcctReport"}
                  >
                    User Account Report
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/report/userAcctSummaryReport"}
                  >
                    User Account Summary Report
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/report/cidrUsageReport"}
                  >
                    CIDR Usage Report
                  </NavDropdown.Item>
                </NavDropdown>

                {showCidrAdminBoard ? (
                  <NavDropdown title="Admin" id="admin-nav-dropdown">
                    <NavDropdown.Item
                      as={Link}
                      to={"/cidr-react-menu-login/admin/manageUserAccts"}
                    >
                      Manage User Accounts
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to={"/cidr-react-menu-login/admin/viewAuditLog"}
                    >
                      View Audit Log
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to={"/cidr-react-menu-login/admin/MonitorSolrServer"}
                    >
                      Monitor Solr Servers
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  ""
                )}

                {showLhmAdminBoard ? (
                  <NavDropdown title="LHM" id="lhm-nav-dropdown">
                    <NavDropdown.Item
                      as={Link}
                      to={"/cidr-react-menu-login/lhm/lhmManagementDashboard"}
                    >
                      LHM Management Dashboard
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to={"/cidr-react-menu-login/lhm/importLHMBatch"}
                    >
                      Import LHM Batch
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to={"/cidr-react-menu-login/lhm/manageLHMBatches"}
                    >
                      Manage LHM Batches
                    </NavDropdown.Item>
                    <NavDropdown.Item
                      as={Link}
                      to={"/cidr-react-menu-login/lhm/manageLHMDocuments"}
                    >
                      Manage LHM Documents
                    </NavDropdown.Item>
                  </NavDropdown>
                ) : (
                  ""
                )}

                <NavDropdown title="A-File" id="afile-nav-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/afile/importAFile"}
                  >
                    Import A-File
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/afile/searchAFile"}
                  >
                    Search A-File
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="IVAB" id="ivab-nav-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/ivab/importIVABFile"}
                  >
                    Import IVAB File
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/ivab/searchIVABFile"}
                  >
                    Search IVAB File
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Help" id="help-nav-dropdown">
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/help/cidrUserGuide"}
                  >
                    CIDR User Guide
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/help/lhmUserGuide"}
                  >
                    LHM User Guide
                  </NavDropdown.Item>
                  <NavDropdown.Item
                    as={Link}
                    to={"/cidr-react-menu-login/help/cidrTraining"}
                  >
                    CIDR Training
                  </NavDropdown.Item>
                </NavDropdown>
              </Nav>
            </Navbar.Collapse>

            <Navbar.Collapse className="justify-content-end">
              <Navbar.Text>
                <div>
                  Signed in as:{" "}
                  <b>{currentUser ? currentUser.username : "No User"}</b>|
                  <a href="/cidr-react-menu-login/home" onClick={logOut}>
                    LogOut
                  </a>
                </div>
                <div>Last Logged on: {new Date().toLocaleString()}</div>
              </Navbar.Text>
            </Navbar.Collapse>
          </Navbar>
        </div>
        <div>
          <Switch>
            <Route exact path="/" component={HomeCidr} />

            <Route
              path="/cidr-react-menu-login/applicationSearch"
              component={ApplicationSearch}
            />
            <Route
              path="/cidr-react-menu-login/documentSearch"
              component={DocumentSearch}
            />
            <Route
              path="/cidr-react-menu-login/flaggedSearches"
              component={FlaggedSearches}
            />
            <Route
              path="/cidr-react-menu-login/savedSearches"
              component={SavedSearches}
            />
            <Route
              path="/cidr-react-menu-login/bulkSearches"
              component={BulkSearches}
            />

            <Route
              path="/cidr-react-menu-login/report/lhmReport"
              component={LHMReport}
            />
            <Route
              path="/cidr-react-menu-login/report/userAcctReport"
              component={UserAcctReport}
            />
            <Route
              path="/cidr-react-menu-login/report/userAcctSummaryReport"
              component={UserAcctSummaryReport}
            />
            <Route
              path="/cidr-react-menu-login/report/cidrUsageReport"
              component={CidrUsageReport}
            />

            <Route
              path="/cidr-react-menu-login/admin/manageUserAccts"
              component={ManageUserAccts}
            />
            <Route
              path="/cidr-react-menu-login/admin/viewAuditLog"
              component={ViewAuditLog}
            />
            <Route
              path="/cidr-react-menu-login/admin/MonitorSolrServer"
              component={MonitorSolrServer}
            />

            <Route
              path="/cidr-react-menu-login/lhm/lhmManagementDashboard"
              component={LHMManagementDashboard}
            />
            <Route
              path="/cidr-react-menu-login/lhm/importLHMBatch"
              component={ImportLHMBatch}
            />
            <Route
              path="/cidr-react-menu-login/lhm/manageLHMBatches"
              component={ManageLHMBatches}
            />
            <Route
              path="/cidr-react-menu-login/lhm/manageLHMDocuments"
              component={ManageLHMDocuments}
            />

            <Route
              path="/cidr-react-menu-login/afile/importAFile"
              component={ImportAFile}
            />
            <Route
              path="/cidr-react-menu-login/afile/searchAFile"
              component={SearchAFile}
            />

            <Route
              path="/cidr-react-menu-login/ivab/importIVABFile"
              component={ImportIVABFile}
            />
            <Route
              path="/cidr-react-menu-login/ivab/searchIVABFile"
              component={SearchIVABFile}
            />

            <Route
              path="/cidr-react-menu-login/help/cidrUserGuide"
              component={CidrUserGuide}
            />
            <Route
              path="/cidr-react-menu-login/help/lhmUserGuide"
              component={LHMUserGuide}
            />
            <Route
              path="/cidr-react-menu-login/help/cidrTraining"
              component={CidrTraining}
            />
          </Switch>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default NavBarCidr;
