
import { Request, Response, NextFunction } from "express";
import * as loanApplicationService from "../services/loanApplicationService";
import { LoanApplication } from "../models/loanApplicationModel";
import { HTTP_STATUS } from "../../../constants/httpConstants";

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
            message: "Loan applications retrieved",
            count: loans.length,
            data: loans
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests and responses to retrieve a loan application by ID
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const getLoanApplicationById = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        const id: number = Number(req.params.id);

        const loan: LoanApplication =
            await loanApplicationService.getLoanApplicationById(id);

        res.status(HTTP_STATUS.OK).json({
            message: "Loan application retrieved",
            data: loan
        });
    } catch (error: unknown) {
        next(error);
    }
};

/**
 * Manages requests, responses, and validation to create a Loan Application
 * @param req - The express Request
 * @param res - The express Response
 * @param next - The express middleware chaining function
 */
export const createLoanApplication = async (
    req: Request,
    res: Response,
    next: NextFunction
): Promise<void> => {
    try {
        // Extract only the fields we want (destructuring)
        const { applicant, amount } = req.body;

        const newLoan: LoanApplication =
            await loanApplicationService.createLoanApplication({
                applicant,
                amount
            });

        res.status(HTTP_STATUS.CREATED).json({
            message: "Loan application created",
            data: newLoan
        });
    } catch (error: unknown) {
        next(error);
    }
};
