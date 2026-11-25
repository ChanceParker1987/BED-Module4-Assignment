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

/**
 * POST /api/v1/loans
 * Creates a new loan application
 */
router.post(
    "/",
    loanApplicationController.createLoanApplication
);

/**
 * PUT /api/v1/loans/:id
 * Updates an existing loan application
 */
router.put(
    "/:id",
    loanApplicationController.updateLoanApplication
);

export default router;
