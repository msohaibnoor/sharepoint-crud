import express from "express";
const router = express.Router();
import {
  getSalaries,
  addSalaryRecord,
  deleteSalaryRecord,
  updateSalaryRecord,
} from "../controllers/salaryControllers.js";

router
  .route("/")
  .get(getSalaries)
  .post(addSalaryRecord)
  .delete(deleteSalaryRecord)
  .put(updateSalaryRecord);

export default router;
