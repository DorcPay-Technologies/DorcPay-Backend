import "dotenv/config";
import "reflect-metadata";

import * as http from "http";

import application from "./application";

//import middlewares
import logger from "./utils/logger";
import { connect } from "./config";

// Create Http Server
const server = http.createServer(application.instance);

//Set server port
const port = process.env.PORT || 8081;

async function main() {
  try {
    //Initialize data source
    await connect;

    //Start http server
    server.listen(port, () =>
      logger.info(`Server is listening on port : ${port}`)
    );
  } catch (err) {
    logger.error("Error starting server", err);
  }
}

main();
