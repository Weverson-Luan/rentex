import { Router } from "express";
import { routesCategories } from "./categories.routes";
import { specification } from "./specifications.routes";

const router = Router();

router.use("/v1/categories", routesCategories);
router.use("/v1/specifications", specification);

export { router };
