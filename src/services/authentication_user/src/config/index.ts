import { AppDataSource } from "./data-source";
import { User } from "./entity/User";
import logger from "../utils/logger";

const connect = AppDataSource.initialize()
  .then(async () => {
    logger.info("Data source has been initialized");
  })
  .catch((error) => logger.error(`Error initializing datasource : ${error}`));

export { connect, User };
