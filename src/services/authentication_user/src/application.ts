import cors from "cors";
import express, { Handler, Application as ExpApp } from "express";

//Import controllers
import { controllers } from "./controllers";
import { MetadataKeys } from "./utils/metadata.keys";
import { IRouter } from "./utils/decorators/handlers.decorator";

class Application {
  private readonly _instance: ExpApp;

  get instance(): ExpApp {
    return this._instance;
  }

  constructor() {
    this._instance = express();

    this._instance.use(cors());
    this._instance.use(express.json());

    this.registerRouters();
  }

  private registerRouters() {
    this._instance.get("/", (req, res) =>
      res.json({ message: "Welcome to DorcPay" })
    );

    const info: Array<{ api: string; handler: string }> = [];

    controllers.forEach((controllerClass) => {
      const controller: { [handleName: string]: Handler } =
        new controllerClass() as any;

      const basePath: string = Reflect.getMetadata(
        MetadataKeys.BASE_PATH,
        controllerClass
      );

      const routers: IRouter[] = Reflect.getMetadata(
        MetadataKeys.ROUTERS,
        controllerClass
      );

      const expRouter = express.Router();

      routers.forEach(({ method, middlewares, path, handlerName }) => {
        middlewares
          ? expRouter[method](
              path,
              middlewares,
              controller[String(handlerName)].bind(controller)
            )
          : expRouter[method](
              path,
              controller[String(handlerName)].bind(controller)
            );

        info.push({
          api: `${method.toLocaleUpperCase()} ${basePath + path}`,
          handler: `${controllerClass.name}.${String(handlerName)}`,
        });
      });

      this._instance.use(basePath, expRouter);
    });

    console.table(info);
  }
}

export default new Application();
