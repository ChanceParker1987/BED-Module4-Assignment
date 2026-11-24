
import { Router } from "express";
import * as loanApplicationController from "../controllers/loanApplicationController";

const router = Router();

router.get(
    "/",
    loanApplicationController.getAllLoanApplications
);

export default router;
