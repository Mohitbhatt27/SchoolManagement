const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const swaggerSpec = require("./swagger");
const swaggerUi = require("swagger-ui-express");
const { PORT } = require("./src/config/server.config");
const sequelize = require("./src/config/db.config");
const APIrouter = require("./src/routes/api.router");

const app = express();

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.text());
app.use(bodyParser.urlencoded({ extended: true }));
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));

// Health check route
app.get("/", (req, res) => {
  res.json({
    message: "API is up and running! Please visit /api-docs to test the API.",
  });
});

app.use("/api", APIrouter);

sequelize
  .sync()
  .then(() => {
    console.log("Database & tables created!");
  })
  .catch((err) => console.error("Unable to connect to the database:", err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
