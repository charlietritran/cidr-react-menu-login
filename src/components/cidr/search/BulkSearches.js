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
import { ArrowRight, Trash, Pen, Search } from "react-bootstrap-icons";

// Columns
// Search Name	Description	Status	Download	Created Date	Updated Date
const columns = [
  {
    dataField: "search_name",
    text: "Search Name",
    sort: true,
  },
  {
    dataField: "description",
    text: "Description",
    sort: true,
  },
  {
    dataField: "status",
    text: "Status",
    sort: true,
  },
  {
    dataField: "download",
    text: "Download",
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

/** //////////////////////////////////////////////////////////////
 * Function to handle applicant search
 *
 * @param {*} props
 * @returns
 *
 * ///////////////////////////////////////////////////////////////
 */
function BulkSearches(props) {
  const [resultSearches, setResultSearches] = useState([]);

  useEffect(() => {}, []);

  // INFO: https://react-hook-form.com/docs/useform/setvalue
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({});

  /**
   * Process Search
   */
  const handleSave = async (data) => {
    console.log("Save is clicked- data: " + data);

    //TODO: call rest srv to POST
  };

  const handleDone = () => {
    alert("Done is clicked");
  };

  // QUERY SECTION
  const handleAddQueryFields = () => {
    alert("Add Query Fields is clicked");
  };

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

        <div class="col-sm-11 border border-info px-md-0">dsfasdfsd</div>
      </div>
      <div class="row mt-4 px-md-2">
        <div class="col-sm-11 border border-info px-md-0">
          {/** ///////////////////////// */}
          {/** SEARCH FILTER FORM */}
          {/** ///////////////////////// */}
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>Bulk Search Detail</Accordion.Header>
              <Accordion.Body>
                <form onSubmit={handleSubmit(handleSave)} border border-dark>
                  <div class="container">
                    {/** //////////////////// */}
                    {/** FIRST, MID, LAST */}
                    {/** //////////////////// */}
                    <div class="row ">
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            Search Name
                          </label>

                          <div class="col-sm-6 ">
                            <input
                              class="w-100"
                              name="searchName"
                              type="text"
                              {...register("searchName")}
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            Search Description
                          </label>

                          <div class="col-sm-6 ">
                            <input
                              class="w-100"
                              name="searchDescription"
                              type="text"
                              {...register("searchDescription")}
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-4 "></div>
                    </div>

                    {/** //////////////////// */}
                    {/** ACTIONS Row */}
                    {/** //////////////////// */}
                    <div className="row mt-2 px-md-2">
                      <div class="row ">
                        <div class="col-lg">
                          <Button
                            type="submit"
                            className="btn btn-primary  btn-sm"
                          >
                            Save
                          </Button>{" "}
                          <Button
                            onClick={() => {
                              handleDone();
                            }}
                            className="btn btn-primary  btn-sm"
                          >
                            Done
                          </Button>{" "}
                        </div>
                      </div>
                    </div>
                  </div>
                </form>
              </Accordion.Body>
            </Accordion.Item>
          </Accordion>

          {/** ///////////////////////// */}
          {/** QUERY ADD ONE */}
          {/** ///////////////////////// */}
          <div class="col-sm-11 px-md-2 mt-2">
            <div class="input-group mb-3">
              <Button
                className="btn btn-primary  btn-sm"
                onClick={() => {
                  handleAddQueryFields();
                }}
              >
                Add Fields
              </Button>
              <span class="input-group-text">Query</span>
              <input
                type="text"
                class="form-control"
                placeholder=""
                aria-label="NONE"
              />
            </div>
          </div>
          {/** ///////////////////////// */}
          {/** SEARCH TABLE */}
          {/** ///////////////////////// */}
          <div class="col-sm-11 px-md-2">
            <BootstrapTable
              bootstrap4
              keyField="search_name"
              caption=""
              data={resultSearches}
              columns={columns}
              headerClasses="header-class"
              noDataIndication="No records found."
              striped
              hover
              condensed
              pagination={pagination}
            />
          </div>
        </div>
      </div>
    </div>
  );
}

export default BulkSearches;
