import React from "react";

import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";

import "bootstrap/dist/css/bootstrap.css";
import "react-bootstrap-table-next/dist/react-bootstrap-table2.min.css";
import BootstrapTable from "react-bootstrap-table-next";

function ApplicationSearch(props) {
  const validationSchema = Yup.object().shape({
    //firstname: Yup.string().required("First Name is required"),
    //lastname: Yup.string().required("Last Name is required"),
    //birthdate: Yup.string().required("Birth Date is required"),
    //gender: Yup.string().required("Gender is required"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(validationSchema),
  });

  /**
   * Process Search
   */
  const processSearch = async (data) => {
    console.log("On-Search is called- data: " + data);
    console.log(JSON.stringify(data, null, 2));
  };

  return (
    <div>
      <div class="row mt-2">
        <div class="col-sm-1 ">
          <img
            src={"/images/cidr_logo.png"}
            className="App-logo"
            alt="logo"
            height="45vmin"
          />
        </div>
        <div class="col-sm-9 ">
          <form onSubmit={handleSubmit(processSearch)}>
            <div class="container">
              <div class="row ">
                <div class="col">
                  <div class="row border border-dark">
                    <label class="col-sm-4 col-form-label border border-dark">
                      First Name
                    </label>

                    <div class="col-sm-7 border border-dark">
                      <input
                        class="w-75"
                        name="firstname"
                        type="text"
                        {...register("firstname")}
                      />
                    </div>
                  </div>
                </div>

                <div class="col">
                  <div class="row">
                    <label class="col-sm-2 col-form-label">Middle Name</label>
                    <div class="col-sm-10">
                      <input
                        class="w-50"
                        name="middlename"
                        type="text"
                        {...register("middlename")}
                      />
                    </div>
                  </div>
                </div>

                <div class="col">
                  <div class="row">
                    <label class="col-sm-2 col-form-label">Last Name</label>
                    <div class="col-sm-10">
                      <input
                        class="w-50"
                        name="lastname"
                        type="text"
                        {...register("lastname")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div class="row">
                {/** //////////////////// */}
                {/** Second Row */}
                {/** //////////////////// */}
                <div class="col">
                  <div class="row">
                    <label class="col-sm-2 col-form-label">Street</label>
                    <div class="col-sm-10">
                      <input
                        class="w-50"
                        name="street"
                        type="text"
                        {...register("street")}
                      />
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="row">
                    <label class="col-sm-2 col-form-label">City</label>
                    <div class="col-sm-10">
                      <input
                        class="w-50"
                        name="city"
                        type="text"
                        {...register("city")}
                      />
                    </div>
                  </div>
                </div>
                <div class="col">
                  <div class="row">
                    <label class="col-sm-2 col-form-label">State</label>
                    <div class="col-sm-10">
                      <input
                        class="w-50"
                        name="state"
                        type="text"
                        {...register("street")}
                      />
                    </div>
                  </div>
                </div>
              </div>
              <div className="row">
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">
                    Filed1 Filed1 Filed1
                  </label>
                  <div class="col-sm-10">
                    <input name="field1" type="text" {...register("field1")} />
                  </div>
                </div>
                <div class="mb-3 row">
                  <label class="col-sm-2 col-form-label">Filed2</label>
                  <div class="col-sm-10">
                    <input name="field2" type="text" {...register("field2")} />
                  </div>
                </div>
              </div>

              {/** //////////////////// */}
              {/** Final Row */}
              {/** //////////////////// */}
              <div className="row mt-2">
                <div class="col-sm">
                  <button type="submit" className="btn btn-primary">
                    Search
                  </button>
                  <button
                    type="button"
                    onClick={() =>
                      reset({
                        firstname: "",
                        lastname: "",
                        middlename: "",
                        street: "",
                        city: "",
                        state: "",
                      })
                    }
                    className="btn btn-warning float-right"
                  >
                    Reset
                  </button>
                </div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
                <div class="col"></div>
              </div>
            </div>
          </form>
        </div>
      </div>
      <div class="row"></div>
      <div class="row  ms-3 me-3 mt-2"></div>
    </div>
  );
}

export default ApplicationSearch;
