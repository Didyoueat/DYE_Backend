import { Router } from "express";
import swaggerUI from "swagger-ui-express";
import YAML from "yamljs";
import appDir from "app-root-path";

const version1_0_0 = YAML.load(appDir.path + "/src/swagger/version1_0_0.yaml");
const version1_1_0 = YAML.load(appDir.path + "/src/swagger/version1_1_0.yaml");

export const path: string = "/docs";
export const router: Router = Router();

router.use("/1/0/0", swaggerUI.serve, swaggerUI.setup(version1_0_0));
router.use("/1/1/0", swaggerUI.serve, swaggerUI.setup(version1_1_0));
