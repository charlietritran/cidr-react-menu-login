import React, { useState, useEffect } from "react";

function ManageUserAccts() {
  useEffect(() => {}, []);

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
        <div class="col-sm-6 ">
          <b>Manage User Accounts</b>
          <br />
          Welcome!
        </div>
      </div>
      <div class="row"></div>
      <div class="row  ms-3 me-3 mt-2"></div>
    </div>
  );
}

export default ManageUserAccts;
