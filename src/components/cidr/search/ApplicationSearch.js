import React, { useState, useEffect } from "react";

// SERVICES
import SearchService from "../../../services/search.service";
import AppService from "../../../services/app.service";

// REDUX
import {
  selectCountries,
  selectStates,
  selectApplicantTypes,
  selectFormNumbers,
} from "../../../redux/selectors/appSelectors";
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
const columns = [
  {
    dataField: "ds",
    text: "DS",
    sort: true,
  },
  {
    dataField: "receipt_number",
    text: "Receipt Number",
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
    dataField: "address",
    text: "Address",
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
function ApplicationSearch(props) {
  const [applicantSearches, setApplicantSearches] = useState([]);

  const [showSelectionDialog, setShowSelectionDialog] = useState(false);
  const [targetFieldForSelectionDialog, setTargetFieldForSelectionDialog] =
    useState("");
  const [
    targetFieldNameForSelectionDialog,
    setTargetFieldNameForSelectionDialog,
  ] = useState("");

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
    SearchService.getApplicants().then(
      (data) => {
        if (data) {
          console.log("APPLICANT SEARCHES:" + data);
          setApplicantSearches(data);
        }
      },
      (error) => {
        alert(error.message);
      }
    );
  };

  const handleSaveSearch = () => {
    alert("Save Search is clicked");
  };

  const handleFlagSearch = () => {
    alert("Flag Search is clicked");
  };

  // SELECTION DIALOG
  const handleSelectionDialog = async () => {
    handleShowSelectionDialog();
  };
  const handleCloseSelectionDialog = () => setShowSelectionDialog(false);
  const handleShowSelectionDialog = () => setShowSelectionDialog(true);
  const handleSelectChangeForSelectionDialog = (e) => {
    setValue(targetFieldForSelectionDialog, e.target.value);
  };

  /**
   * Populate option list for popup
   *
   * @returns
   */
  const populateOptionList = () => {
    if (
      targetFieldForSelectionDialog === "country" ||
      targetFieldForSelectionDialog === "countryOfBirth" ||
      targetFieldForSelectionDialog === "countryOfResidence"
    ) {
      return selectCountries(store.getState()).map((item, i) => (
        <option value={item.key}>{item.name}</option>
      ));
    } else if (targetFieldForSelectionDialog === "state") {
      return selectStates(store.getState()).map((item, i) => (
        <option value={item.key}>{item.name}</option>
      ));
    } else if (targetFieldForSelectionDialog === "applicantType") {
      //alert(" APPLICANT TYPE IN IF:" + selectApplicantTypes(store.getState()));
      return selectApplicantTypes(store.getState()).map((item, i) => (
        <option value={item.key}>{item.name}</option>
      ));
    } else if (targetFieldForSelectionDialog === "formNumber") {
      return selectFormNumbers(store.getState()).map((item, i) => (
        <option value={item.key}>{item.name}</option>
      ));
    }
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
              <Accordion.Header>Applicant Search</Accordion.Header>
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
                            Middle Name
                          </label>

                          <div class="col-sm-6 ">
                            <input
                              class="w-100"
                              name="middleName"
                              type="text"
                              {...register("middleName")}
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
                    {/** STREET, CITY, STATE */}
                    {/** //////////////////// */}
                    <div class="row">
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">Street</label>

                          <div class="col-sm-6 ">
                            <input
                              class="w-100"
                              name="street"
                              type="text"
                              {...register("street")}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">City</label>

                          <div class="col-sm-6 ">
                            <input
                              class="w-100"
                              name="city"
                              type="text"
                              {...register("city")}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            State (Prov.)
                          </label>

                          <div class="col-sm-6 ">
                            <div class="input-group">
                              <input
                                class="w-75"
                                name="state"
                                type="text"
                                {...register("state")}
                              />
                              <span
                                class=" btn btn-primary  btn-sm"
                                onClick={() => {
                                  setTargetFieldForSelectionDialog("state");
                                  handleSelectionDialog();
                                }}
                              >
                                <Search />
                              </span>
                            </div>
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
                            Zip (Postal Code){" "}
                          </label>

                          <div class="col-sm-6 ">
                            <input
                              class="w-100"
                              name="zip"
                              type="text"
                              {...register("zip")}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            Country
                          </label>

                          <div class="col-sm-6 ">
                            <div class="input-group">
                              <input
                                class="w-75"
                                name="country"
                                type="text"
                                {...register("country")}
                              />
                              <span
                                class=" btn btn-primary  btn-sm"
                                onClick={() => {
                                  setTargetFieldForSelectionDialog("country");
                                  handleSelectionDialog();
                                }}
                              >
                                <Search />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">Gender</label>

                          <div class="col-sm-6 ">
                            <select
                              className="form-select"
                              name="gender"
                              {...register("gender")}
                            >
                              <option value="Male">Male</option>
                              <option value="Female">Female</option>
                            </select>
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
                    {/** DOE, DOE FROM, DOE TO */}
                    {/** //////////////////// */}
                    <div class="row">
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">DOE </label>

                          <div class="col-sm-6 ">
                            <input
                              name="doe"
                              type="date"
                              defaultValue={new Date()
                                .toISOString()
                                .slice(0, 10)}
                              {...register("doe")}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            DOE From
                          </label>

                          <div class="col-sm-6 ">
                            <input
                              name="doeFrom"
                              type="date"
                              defaultValue={new Date()
                                .toISOString()
                                .slice(0, 10)}
                              {...register("doeFrom")}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">DOE To</label>

                          <div class="col-sm-6 ">
                            <input
                              name="doeTo"
                              type="date"
                              defaultValue={new Date()
                                .toISOString()
                                .slice(0, 10)}
                              {...register("doeTo")}
                            />
                          </div>
                        </div>
                      </div>
                    </div>

                    {/** //////////////////// */}
                    {/** A/T NUMBER, COUNTRY OF BIRTH, COUNTRY OF RESIDENCE */}
                    {/** //////////////////// */}
                    <div class="row ">
                      <div class="col-sm-4">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            A/T Number{" "}
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
                            Country of Birth
                          </label>

                          <div class="col-sm-6 ">
                            <div class="input-group">
                              <input
                                class="w-75"
                                name="countryOfBirth"
                                type="text"
                                {...register("countryOfBirth")}
                              />
                              <span
                                class=" btn btn-primary  btn-sm"
                                onClick={() => {
                                  setTargetFieldForSelectionDialog(
                                    "countryOfBirth"
                                  );
                                  handleSelectionDialog();
                                }}
                              >
                                <Search />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            Country of Residence
                          </label>

                          <div class="col-sm-6 ">
                            <div class="input-group">
                              <input
                                class="w-75"
                                name="countryOfResidence"
                                type="text"
                                {...register("countryOfResidence")}
                              />
                              <span
                                class=" btn btn-primary  btn-sm"
                                onClick={() => {
                                  setTargetFieldForSelectionDialog(
                                    "countryOfResidence"
                                  );
                                  handleSelectionDialog();
                                }}
                              >
                                <Search />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/** //////////////////// */}
                    {/** RECEIPT NUMBER, APPLICANT TYPE, FORM NUMBER */}
                    {/** //////////////////// */}
                    <div class="row">
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            Receipt Number{" "}
                          </label>

                          <div class="col-sm-6 ">
                            <input
                              class="w-100"
                              name="receiptNumber"
                              type="text"
                              {...register("receiptNumber")}
                            />
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            Applicant Type
                          </label>

                          <div class="col-sm-6 ">
                            <div class="input-group">
                              <input
                                class="w-75"
                                name="applicantType"
                                type="text"
                                {...register("applicantType")}
                              />
                              <span
                                class=" btn btn-primary  btn-sm"
                                onClick={() => {
                                  setTargetFieldForSelectionDialog(
                                    "applicantType"
                                  );
                                  handleSelectionDialog();
                                }}
                              >
                                <Search />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            Form Number
                          </label>

                          <div class="col-sm-6 ">
                            <div class="input-group">
                              <input
                                class="w-75"
                                name="formNumber"
                                type="text"
                                {...register("formNumber")}
                              />
                              <span
                                class=" btn btn-primary  btn-sm"
                                onClick={() => {
                                  setTargetFieldForSelectionDialog(
                                    "formNumber"
                                  );
                                  handleSelectionDialog();
                                }}
                              >
                                <Search />
                              </span>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>

                    {/** //////////////////// */}
                    {/** PICS ID, FIRM NAME */}
                    {/** //////////////////// */}
                    <div class="row ">
                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            PICS ID
                          </label>

                          <div class="col-sm-6 ">
                            <input
                              class="w-100"
                              name="picsId"
                              type="text"
                              {...register("picsId")}
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-4 ">
                        <div class="row ">
                          <label class="col-sm-5 col-form-label ">
                            Firm Name
                          </label>

                          <div class="col-sm-6 ">
                            <input
                              class="w-100"
                              name="firmName"
                              type="text"
                              {...register("firmName")}
                            />
                          </div>
                        </div>
                      </div>

                      <div class="col-sm-4 ">
                        <div class="row "></div>
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
                              <div class="col">
                                <div class="form-check">
                                  <input
                                    class="form-check-input"
                                    type="checkbox"
                                    value=""
                                    id="c3_checkbox"
                                  />
                                  <label
                                    class="form-check-label"
                                    for="c3_checkbox"
                                  >
                                    C3
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
                                id="similarityChk"
                              />
                              <label
                                class="form-check-label"
                                for="similarityChk"
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
                              firstName: "",
                              lastName: "",
                              middleName: "",
                              street: "",
                              city: "",
                              state: "",
                              country: "",
                              // default more fields here
                            });
                            setApplicantSearches([]);
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
                        <Button
                          onClick={() => {
                            handleFlagSearch();
                          }}
                          className="btn btn-primary  btn-sm"
                        >
                          Flag Search
                        </Button>{" "}
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
              data={applicantSearches}
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

      {/** /////////////////////// */}
      {/** SELECTION DIALOGS - DYNAMICALLY POPULATE LIST MATCHING WITH FIELD CALLING */}
      {/** /////////////////////// */}
      <Modal show={showSelectionDialog} onHide={handleCloseSelectionDialog}>
        <Modal.Header closeButton>
          <Modal.Title>
            {targetFieldForSelectionDialog.charAt(0).toUpperCase() +
              targetFieldForSelectionDialog.slice(1)}{" "}
            List
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <div className="form-group w-auto">
            <Form.Select onChange={handleSelectChangeForSelectionDialog}>
              <option selected>Select a value ...!</option>
              {populateOptionList()}
            </Form.Select>
          </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleCloseSelectionDialog}>
            Close
          </Button>
          <Button variant="primary" onClick={handleCloseSelectionDialog}>
            OK
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
}

export default ApplicationSearch;
