import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
import { getEmployee } from "../controllers/employeesControllers.js";

router.route("/").get(protect, getEmployee);

export default router;
