import React, { useState, useEffect } from "react";

// SERVICES
import SearchService from "../../../services/search.service";
import AppService from "../../../services/app.service";

// REDUX
import { selectClassifications } from "../../../redux/selectors/appSelectors";
import store from "../../../store";

// VALIDATIONS
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

// TABLES
import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";
import paginationFactory from "react-bootstrap-table2-paginator";

// CONTROLS
import Accordion from "react-bootstrap/Accordion";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { useForm } from "react-hook-form";
import Form from "react-bootstrap/Form";
import RangeSlider from "react-bootstrap-range-slider";

// ICONS
import { Flag, Trash, PenFill, Search } from "react-bootstrap-icons";

/** //////////////////////////////////////////////////////////////
 * Function to handle applicant search
 *
 * @param {*} props
 * @returns
 *
 * ///////////////////////////////////////////////////////////////
 */
function SavedSearches(props) {
  const [resultSearches, setResultSearches] = useState([]);

  useEffect(() => {
    SearchService.getSavedSearches().then(
      (data) => {
        if (data) {
          console.log("SAVED SEARCHES:" + data);
          setResultSearches(data);
        }
      },
      (error) => {
        alert(error.message);
      }
    );
  }, []);

  const selectRow = {
    mode: "checkbox",
    clickToSelect: true,
    classes: "selection-row",
  };

  /**
   * Process Search
   */
  const handleSearch = () => {
    console.log("Search is clicked!");

    //TODO: call rest srv to POST
  };

  const handleEdit = () => {
    alert("Edit is clicked");
  };

  const handleFlag = () => {
    alert("Flage is clicked");
  };

  const handleDelete = () => {
    alert("Delete is clicked");
  };

  // Columns
  // Search Name	Description	Status	Download	Created Date	Updated Date
  const columns = [
    {
      dataField: "name",
      text: "Search Name",
      sort: true,
    },
    {
      dataField: "created_date",
      text: "Created Date (mm/dd/yyyy)",
      sort: true,
    },
    {
      dataField: "updated_date",
      text: "Updated Date (mm/dd/yyyy)",
      sort: true,
    },

    {
      dataField: "comment",
      text: "Comment",
      sort: true,
    },

    {
      dataField: "action",
      text: "Action",
      formatter: (cellContent, row) => {
        return (
          <div>
            <div>
              <Button
                type="submit"
                onClick={() => handleSearch(row.id, row.name)}
              >
                <Search />
              </Button>{" "}
              <Button
                type="submit"
                onClick={() => handleEdit(row.id, row.name)}
              >
                <PenFill />
              </Button>{" "}
              <Button
                type="submit"
                onClick={() => handleFlag(row.id, row.name)}
              >
                <Flag />
              </Button>
            </div>
          </div>
        );
      },
    },
  ];

  const pagination = paginationFactory({
    page: 1,
    sizePerPage: 5,
    lastPageText: ">>",
    firstPageText: "<<",
    nextPageText: ">",
    prePageText: "<",
    showTotal: true,
    alwaysShowAllBtns: true,
    onPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
    onSizePerPageChange: function (page, sizePerPage) {
      console.log("page", page);
      console.log("sizePerPage", sizePerPage);
    },
  });

  return (
    <div>
      <div class="row mt-2 px-md-2">
        <div class="col-sm-1  ">
          <img
            src={"/images/cidr_logo.png"}
            className="App-logo"
            alt="logo"
            height="45vmin"
          />
        </div>

        <div class="col-sm-6 ">
          <div class="row ">
            <label class="col-sm-5 fs-5">
              <strong>Saved Searches</strong>
            </label>
          </div>
          <div class="row ">
            <label class="col-sm-5  fs-12">
              You have {resultSearches.length} saved searches
            </label>
          </div>
        </div>
      </div>
      <div class="row mt-4 px-md-4">
        <div class="col-lg border border-info px-md-0">
          {/** ///////////////////////// */}
          {/** SEARCH TABLE */}
          {/** ///////////////////////// */}
          <div class="col-lg-16 px-md-2">
            <BootstrapTable
              bootstrap4
              keyField="name"
              caption=""
              data={resultSearches}
              columns={columns}
              headerClasses="header-class"
              noDataIndication="No records found."
              striped
              hover
              condensed
              pagination={pagination}
              selectRow={selectRow}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default SavedSearches;
