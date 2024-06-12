import React from "react";

function LHMManagementDashboard() {
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
          <b>LHM Management Dashboard</b>
          <br />
          LHM batch count:0
        </div>
      </div>
      <div class="row"></div>
      <div class="row  ms-3 me-3 mt-2"></div>
    </div>
  );
}

export default LHMManagementDashboard;
