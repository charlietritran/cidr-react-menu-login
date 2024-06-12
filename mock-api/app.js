const express = require("express");
const cors = require("cors");
const apiMocker = require("connect-api-mocker");

const port = 9100;
const app = express();

// CORS is enabled for all origins
app.use(cors());

app.use("/api", apiMocker("mock-api"));

console.log(`Mock API Server is up and running at: http://localhost:${port}`);
app.listen(port);
