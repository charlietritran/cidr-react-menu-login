import React, { useState, useEffect } from "react";
import BootstrapTable from "react-bootstrap-table-next";
import HomeService from "../../services/home.service";

// Columns
const columns = [
  {
    dataField: "name",
    text: "Search Name",
    sort: true,
  },
  {
    dataField: "created_date",
    text: "Created Date",
    sort: true,
  },
  {
    dataField: "updated_date",
    text: "Updated Date",
    sort: true,
  },
];

/** //////////////////////////////////////////////////////////////
 * Function to handle home page
 *
 * @param {*} props
 * @returns
 *
 * ///////////////////////////////////////////////////////////////
 */

function Home() {
  const [savedSearches, setSavedSearches] = useState([]);
  const [flaggedSearches, setFlaggedSearches] = useState([]);

  useEffect(() => {
    HomeService.getSavedSearches().then(
      (data) => {
        if (data) {
          console.log("SAVED SEARCHES:" + data);
          setSavedSearches(data);
        }
      },
      (error) => {
        alert(error.message);
      }
    );
    HomeService.getFlaggedSearches().then(
      (data) => {
        if (data) {
          console.log("FLAGGED SEARCHES:" + data);
          setFlaggedSearches(data);
        }
      },
      (error) => {
        alert(error.message);
      }
    );
  }, []);

  return (
    <div>
      <div class="row mt-2">
        <div class="col-sm-1  px-md-4">
          <img
            src={"/images/cidr_logo.png"}
            className="App-logo"
            alt="logo"
            height="45vmin"
          />
        </div>
        <div class="col-sm-6 ">
          <b>CIDR Search</b>
          <br />
          Welcome!
        </div>
      </div>
      <div class="row"></div>
      <div class="row  ms-3 me-3 mt-2">
        <div class="col-sm-6 ">
          <BootstrapTable
            bootstrap4
            keyField="name"
            caption="Saved Searches"
            data={savedSearches}
            columns={columns}
            headerClasses="header-class"
            striped
            hover
            condensed
            noDataIndication="No records found."
          />
        </div>
        <div class="col-sm-6">
          <BootstrapTable
            bootstrap4
            keyField="name"
            caption="Flagged Searches"
            data={flaggedSearches}
            columns={columns}
            headerClasses="header-class"
            striped
            hover
            condensed
            noDataIndication="No records found."
          />
        </div>
      </div>
    </div>
  );
}

export default Home;
