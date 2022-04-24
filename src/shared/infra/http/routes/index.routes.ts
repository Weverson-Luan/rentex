import { Router } from "express";
import { car } from "./cars.routes";
import { routesCategories } from "./categories.routes";
import { specification } from "./specifications.routes";
import { users } from "./users.routes";
import { authentication } from "./authentications.routes";
import { rentalsRoutes } from "./rentals.routes";
import { passwordRoutes } from "./password.routes";


const router = Router();

router.use("/v1/categories", routesCategories);
router.use("/v1/cars", car);
router.use("/v1/specifications", specification);
router.use("/v1/users", users);
router.use("/v1/rentals", rentalsRoutes);
router.use("/v1/password", passwordRoutes);
router.use("/v1/users", authentication);

export { router };
