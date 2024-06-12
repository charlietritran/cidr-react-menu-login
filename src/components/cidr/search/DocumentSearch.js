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
// Data Source	A Number	Received Date	Name	DOB	Country of Birth	Classification
const columns = [
  {
    dataField: "ds",
    text: "Data Source",
    sort: true,
  },
  {
    dataField: "a_number",
    text: "A Number",
    sort: true,
  },
  {
    dataField: "recieved_date",
    text: "A Received Date (mm/dd/yyyy)",
    sort: true,
  },
  {
    dataField: "name",
    text: "Name",
    sort: true,
  },
  {
    dataField: "dob",
    text: "DOB (mm/dd/yyyy)",
    sort: true,
  },
  {
    dataField: "countryOfBirth",
    text: "Country of Birth",
    sort: true,
  },
  {
    dataField: "classification",
    text: "Classification",
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
function DocumentSearch(props) {
  const [documentSearches, setDocumentSearches] = useState([]);

  const [slideValue, setSlideValue] = useState(0);

  useEffect(() => {}, []);

  // FORMS
  const validationSchema = Yup.object().shape({
    //firstname: Yup.string().required("First Name is required"),
    //lastname: Yup.string().required("Last Name is required"),
    //birthdate: Yup.string().required("Birth Date is required"),
    //gender: Yup.string().required("Gender is required"),
  });

  // INFO: https://react-hook-form.com/docs/useform/setvalue
  const {
    register,
    handleSubmit,
    reset,
    setValue,
    getValues,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  /**
   * Process Search
   */
  const handleSearch = async (data) => {
    console.log("On-Search is called- data: " + data);
    console.log(JSON.stringify(data, null, 2));
    SearchService.getDocuments().then(
      (data) => {
        if (data) {
          console.log("DOCUMENT SEARCHES:" + data);
          setDocumentSearches(data);
        }
      },
      (error) => {
        alert(error.message);
      }
    );
  };

  const populateOptionList = () => {
    return selectClassifications(store.getState()).map((item, i) => (
      <option value={item.key}>{item.name}</option>
    ));
  };

  const handleSaveSearch = () => {
    alert("Save Search is clicked");
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

        <div class="col-sm-11 border border-info px-md-0">
          {/** ///////////////////////// */}
          {/** SEARCH FILTER FORM */}
          {/** ///////////////////////// */}
          <Accordion defaultActiveKey="0">
            <Accordion.Item eventKey="0">
              <Accordion.Header>LHM Document Search</Accordion.Header>
              <Accordion.Body>
                <form onSubmit={handleSubmit(handleSearch)} border border-dark>
                  <div class="container">
                    {/** //////////////////// */}
                    {/** FIRST, MID, LAST */}
                    {/** //////////////////// */}
                    <div class="row ">
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            A Number
                          </label>

                          <div class="col-sm-6 ">
                            <input
                              class="w-100"
                              name="aNumber"
                              type="text"
                              {...register("aNumber")}
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            First Name
                          </label>

                          <div class="col-sm-6 ">
                            <input
                              class="w-100"
                              name="firstName"
                              type="text"
                              {...register("firstName")}
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            Last Name
                          </label>

                          <div class="col-sm-6 ">
                            <input
                              class="w-100"
                              name="lastName"
                              type="text"
                              {...register("lastName")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/** //////////////////// */}
                    {/** DOB, DOB FROM, DOB TO */}
                    {/** //////////////////// */}
                    <div class="row">
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">DOB </label>

                          <div class="col-sm-6 ">
                            <input
                              name="dob"
                              type="date"
                              defaultValue={new Date()
                                .toISOString()
                                .slice(0, 10)}
                              {...register("dob")}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            DOB From
                          </label>

                          <div class="col-sm-6 ">
                            <input
                              name="dobFrom"
                              type="date"
                              defaultValue={new Date()
                                .toISOString()
                                .slice(0, 10)}
                              {...register("dobFrom")}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">DOB To</label>

                          <div class="col-sm-6 ">
                            <input
                              name="dobTo"
                              type="date"
                              defaultValue={new Date()
                                .toISOString()
                                .slice(0, 10)}
                              {...register("dobTo")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/** //////////////////// */}
                    {/** ZIP, COUNTRY, GENDER */}
                    {/** //////////////////// */}
                    <div class="row">
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            Address{" "}
                          </label>

                          <div class="col-sm-6 ">
                            <input
                              class="w-100"
                              name="address"
                              type="text"
                              {...register("address")}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            Country of Birth
                          </label>

                          <div class="col-sm-6 ">
                            <div class="col-sm-6 ">
                              <input
                                class="w-100"
                                name="countryOfBirth"
                                type="text"
                                {...register("countryOfBirth")}
                              />
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            Classification
                          </label>

                          <div class="col-sm-6 ">
                            <select
                              className="form-select"
                              name="classification"
                              {...register("classification")}
                            >
                              <option selected>Select a value ...!</option>
                              {populateOptionList()}
                            </select>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/** //////////////////// */}
                    {/** DATA SOURCE, FUZZY SEARCH */}
                    {/** //////////////////// */}
                    <div class="row ">
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            Data Source
                          </label>

                          <div class="col-sm-6 ">
                            <div class="row">
                              <div class="col">
                                <div class="form-check">
                                  <input
                                    class="form-check-input "
                                    type="checkbox"
                                    value=""
                                    id="lhm_checkbox"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="lhm_checkbox"
                                  >
                                    LHM
                                  </label>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            Fuzzy Search
                          </label>

                          <div class="col-sm-6  ">
                            <div class="form-check">
                              <input
                                class="form-check-input"
                                type="checkbox"
                                value=""
                                id="similarity_checkbox"
                              />
                              <label
                                class="form-check-label"
                                for="similarity_checkbox"
                              >
                                Similarity {": "} {slideValue}
                              </label>
                            </div>
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-2 ">
                        <div class="row ">
                          <RangeSlider
                            value={slideValue}
                            onChange={(changeEvent) =>
                              setSlideValue(changeEvent.target.value)
                            }
                            size={"sm"}
                          />
                        </div>
                      </div>
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
                            Search
                          </Button>{" "}
                          <Button
                            onClick={() => {
                              reset({
                                firstname: "",
                                lastname: "",
                                a_number: "",
                                address: "",
                                classification: "",
                                country: "",
                              });
                              setDocumentSearches([]);
                            }}
                            className="btn btn-primary  btn-sm"
                          >
                            Clear
                          </Button>{" "}
                          <Button
                            onClick={() => {
                              handleSaveSearch();
                            }}
                            className="btn btn-primary  btn-sm"
                          >
                            Save Search
                          </Button>{" "}
                        </div>
                        <label class="col-sm-5 col-form-label ">
                          Note: use * for wild card search. at least one field
                          must be set.
                        </label>
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
              keyField="receipt_number"
              caption=""
              data={documentSearches}
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

export default DocumentSearch;
