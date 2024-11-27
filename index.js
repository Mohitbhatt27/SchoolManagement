const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const { PORT } = require("./src/config/server.config");
const APIrouter = require("./src/routes/api.router");

app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));

app.use("/api", APIrouter);

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
