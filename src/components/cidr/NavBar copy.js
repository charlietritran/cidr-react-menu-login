import React from "react"; 
import logo from '../cidr_logo.png';
import { Container, Nav, Navbar, NavDropdown } from 'react-bootstrap';
import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import Home from './Home';
import ApplicationSearch from './ApplicationSearch';
import DocumentSearch from "./DocumentSearch";
import FlaggedSearches from "./FlaggedSearches";
import SavedSearches from "./SavedSearches";
import BulkSearches from "./BulkSearches";
import LHMReport from "./LHMReport";
import UserAcctReport from "./UserAcctReport";
import UserAcctSummaryReport from "./UserAcctSummaryReport";
import CidrUsageReport from "./CidrUsageReport";
import ManageUserAccts from "./ManageUserAccts";
import ViewAuditLog from "./ViewAuditLog";
import MonitorSolrServer from "./MonitorSolrServer";
import LHMManagementDashboard from "./LHMManagementDashboard";
import ImportLHMBatch from "./ImportLHMBatch";
import ManageLHMBatches from "./ManageLHMBatches";
import ManageLHMDocuments from "./ManageLHMDocuments";
import ImportAFile from "./ImportAFile";
import SearchAFile from "./SearchAFile";
import ImportIVABFile from "./ImportIVABFile";
import SearchIVABFile from "./SearchIVABFile";
import CidrUserGuide from "./CidrUserGuide";
import LHMUserGuide from "./LHMUserGuide";
import CidrTraining from "./CidrTraining";

//Using react-icons library
import{BiHome} from 'react-icons/bi';
import{BiSearch} from 'react-icons/bi';

//Using fontawesome library
// import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
// import { faHome } from '@fortawesome/free-solid-svg-icons'
// import { library } from '@fortawesome/fontawesome-svg-core';
// library.add(faHome);


function NavBar(props){
  console.log(props);
  const searchTitle = (<span><BiSearch />Search</span>);
  return(
    <BrowserRouter>
      <div className="App">
        <Navbar bg="light"  variant="light" expand="lg">
          <Container fluid>
            <Navbar.Brand>
              <img src={logo} className="App-logo" alt="logo" height="35vmin"/>
            </Navbar.Brand>
            <Navbar.Toggle aria-controls="basic-navbar-nav" />
            <Navbar.Collapse id="basic-navbar-nav">
              <Nav className="me-auto">
                <Nav.Link as={Link} to="/">
                    {/* <FontAwesomeIcon icon={faHome}/> */}
                    <span><BiHome />Home</span>
                </Nav.Link>
                
                
                {/* <NavDropdown title={searchTitle} id="search-nav-dropdown">
                  <NavDropdown.Item as={Link} to="/applicationSearch">Application Search</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/documentSearch">Document Search</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/flaggedSearches">Flagged Searches</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/savedSearches">Saved Searches</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="/bulkSearches">Bulk Searches</NavDropdown.Item>
                  
                  <NavDropdown.Divider />
                  <NavDropdown.Item href="#action/3.4">
                    Separated link
                  </NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="Report" id="report-nav-dropdown">
                  <NavDropdown.Item as={Link} to="report/lhmReport">LHM Report</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="report/userAcctReport">User Account Report</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="report/userAcctSummaryReport">User Account Summary Report</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="report/cidrUsageReport">CIDR Usage Report</NavDropdown.Item>                              
                </NavDropdown>

                <NavDropdown title="Admin" id="admin-nav-dropdown">
                  <NavDropdown.Item as={Link} to="admin/manageUserAccts">Manage User Accounts</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="admin/viewAuditLog">View Audit Log</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="admin/MonitorSolrServer">Monitor Solr Servers</NavDropdown.Item>                                          
                </NavDropdown>

                <NavDropdown title="LHM" id="lhm-nav-dropdown">
                  <NavDropdown.Item as={Link} to="lhm/lhmManagementDashboard">LHM Management Dashboard</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="lhm/importLHMBatch">Import LHM Batch</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="lhm/manageLHMBatches">Manage LHM Batches</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="lhm/manageLHMDocuments">Manage LHM Documents</NavDropdown.Item>
                </NavDropdown>

                <NavDropdown title="A-File" id="afile-nav-dropdown">
                  <NavDropdown.Item as={Link} to="afile/importAFile">Import A-File</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="afile/searchAFile">Search A-File</NavDropdown.Item>                  
                </NavDropdown>
                
                
                <NavDropdown title="IVAB" id="ivab-nav-dropdown">
                    <NavDropdown.Item as={Link} to="ivab/importIVABFile">Import IVAB File</NavDropdown.Item>
                    <NavDropdown.Item as={Link} to="ivab/searchIVABFile">Search IVAB File</NavDropdown.Item>
                </NavDropdown>                
                
                <NavDropdown title="Help" id="help-nav-dropdown">
                  <NavDropdown.Item as={Link} to="help/cidrUserGuide">CIDR User Guide</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="help/lhmUserGuide">LHM User Guide</NavDropdown.Item>
                  <NavDropdown.Item as={Link} to="help/cidrTraining">CIDR Training</NavDropdown.Item>               
                </NavDropdown> */}

              </Nav>
            </Navbar.Collapse>
            <Navbar.Collapse className="justify-content-end">
                <Navbar.Text>
                    <div>
                        Signed in as: <a href="#login">{props.loginUser}</a>
                    </div>
                    <div>
                        Last Logged on: {new Date().toLocaleString()}
                    </div>                    
                </Navbar.Text>
            </Navbar.Collapse>
          </Container>
        </Navbar>
        <div>
          <Routes>            
            <Route path='/' element={<Home />}></Route>
            <Route path='/applicationSearch' element={<ApplicationSearch />}></Route>
            <Route path='/documentSearch' element={<DocumentSearch />}></Route>
            <Route path='/flaggedSearches' element={<FlaggedSearches />}></Route>
            <Route path='/savedSearches' element={<SavedSearches />}></Route>
            <Route path='/bulkSearches' element={<BulkSearches />}></Route>

            <Route path="report">
                <Route path="lhmReport" element={<LHMReport/>} />
                <Route path="userAcctReport" element={<UserAcctReport/>} />
                <Route path="userAcctSummaryReport" element={<UserAcctSummaryReport/>} />
                <Route path="cidrUsageReport" element={<CidrUsageReport/>} />
            </Route>

            <Route path="admin">
                <Route path="manageUserAccts" element={<ManageUserAccts/>} />
                <Route path="viewAuditLog" element={<ViewAuditLog/>} />
                <Route path="MonitorSolrServer" element={<MonitorSolrServer/>} />                
            </Route>

            <Route path="lhm">
                <Route path="lhmManagementDashboard" element={<LHMManagementDashboard/>} />
                <Route path="importLHMBatch" element={<ImportLHMBatch/>} />
                <Route path="manageLHMBatches" element={<ManageLHMBatches/>} />
                <Route path="manageLHMDocuments" element={<ManageLHMDocuments/>} />                
            </Route>       
            
            <Route path="afile">
                <Route path="importAFile" element={<ImportAFile/>} />
                <Route path="searchAFile" element={<SearchAFile/>} />                              
            </Route>

            <Route path="ivab">
                <Route path="importIVABFile" element={<ImportIVABFile/>} />
                <Route path="searchIVABFile" element={<SearchIVABFile/>} />                              
            </Route>

            <Route path="help">
                <Route path="cidrUserGuide" element={<CidrUserGuide/>} />
                <Route path="lhmUserGuide" element={<LHMUserGuide/>} />
                <Route path="cidrTraining" element={<CidrTraining/>} />                
            </Route>

          </Routes>
        </div>
      </div>
    </BrowserRouter>
  )
}

export default NavBar;
