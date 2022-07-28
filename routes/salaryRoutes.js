import express from "express";
const router = express.Router();
import { getSalaries } from "../controllers/salaryControllers.js";

router.route("/").get(getSalaries);

export default router;
