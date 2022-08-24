//Impoet configs
import "dotenv/config";

// import express module
import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

//Import routes
import { user } from "./route";

//Initialize express app
const app = express();
app.use(cors());
app.use(bodyParser.json());

//Set routes
app.use("/api/users", user);

//Set port
const port = process.env.PORT || 8080;

// Main app
async function Main() {
  //Connect to database

  //Start server
  app.listen(port, () => {
    console.log("Running on Port: " + port);
  });
}

Main();
