import { Router } from "express";
import * as loanApplicationController from "../controllers/loanApplicationController";

const router = Router();

// "/api/v1/loans" prefixes all below routes

/**
 * GET /api/v1/loans
 * Retrieves all loan applications
 */
router.get(
    "/",
    loanApplicationController.getAllLoanApplications
);

/**
 * GET /api/v1/loans/:id
 * Retrieves a loan application by ID
 */
router.get(
    "/:id",
    loanApplicationController.getLoanApplicationById
);

export default router;
