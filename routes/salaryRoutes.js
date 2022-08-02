import express from "express";
import { protect } from "../middlewares/authMiddleware.js";

const router = express.Router();
import {
  getSalaries,
  addSalaryRecord,
  deleteSalaryRecord,
  updateSalaryRecord,
} from "../controllers/salaryControllers.js";

router
  .route("/")
  .get(protect, getSalaries)
  .post(addSalaryRecord)
  .delete(deleteSalaryRecord)
  .put(updateSalaryRecord);

export default router;
