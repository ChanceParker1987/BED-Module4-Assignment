
import { Request, Response, NextFunction } from "express";
import * as loanApplicationService from "../services/loanApplicationService";
import { LoanApplication } from "../models/loanApplicationModel";

/**
 * Retrieves all loan applications
 */
export const getAllLoanApplications = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const loans: LoanApplication[] =
            await loanApplicationService.getAllLoanApplications();

        res.status(200).json({
            status: "success",
            data: loans,
            message: "Loan applications successfully retrieved"
        });
    } catch (error: unknown) {
        next(error);
    }
};
