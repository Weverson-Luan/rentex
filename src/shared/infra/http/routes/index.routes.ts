import { Router } from "express";
import { routesCategories } from "./categories.routes";
import { specification } from "./specifications.routes";
import { users } from "./users.routes";
import { authentication } from "./authentications.routes";

const router = Router();

router.use("/v1/categories", routesCategories);
router.use("/v1/specifications", specification);
router.use("/v1/users", users);
router.use("/v1/users", authentication);

export { router };
