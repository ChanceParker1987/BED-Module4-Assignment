
import { LoanApplication } from "../models/loanApplicationModel";
import { ServiceError } from "../errors/errors";
import { HTTP_STATUS } from "../../../constants/httpConstants";

const loanApplications: LoanApplication[] = [
    {
        id: 1,
        applicant: "John Smith",
        amount: 50000,
        status: "pending",
        createdAt: "2025-01-10T10:00:00.000Z",
    },
    {
        id: 2,
        applicant: "Sarah Johnson",
        amount: 150000,
        status: "under_review",
        createdAt: "2025-01-08T10:00:00.000Z",
    },
    {
        id: 3,
        applicant: "Michael Chen",
        amount: 500000,
        status: "pending",
        createdAt: "2025-01-05T10:00:00.000Z",
    },
    {
        id: 4,
        applicant: "Emily Williams",
        amount: 1000000,
        status: "flagged",
        createdAt: "2025-01-03T10:00:00.000Z",
    },
];

// ID to assign to the next new loan application
let nextLoanId: number = 5;

/**
 * Retrieves all loan applications from storage
 * @returns Array of all loan applications
 */
export const getAllLoanApplications = async (): Promise<LoanApplication[]> => {
    return loanApplications;
};

/**
 * Retrieves a single loan application by ID
 * @param id - The ID of the loan application to retrieve
 * @returns The loan application if found
 */
export const getLoanApplicationById = (
    id: number
): LoanApplication => {
    const loan = loanApplications.find((loan) => loan.id === id);

    if (!loan) {
        throw new ServiceError(
            "Loan application not found",
            "LOAN_NOT_FOUND",
            HTTP_STATUS.NOT_FOUND
        );
    }

    return loan;
};

/**
 * Creates a new loan application
 * @param loanData - The data for the new loan application (applicant and amount)
 * @returns The created loan application with generated ID
 */
export const createLoanApplication = async (loanData: {
    applicant: string;
    amount: number;
}): Promise<LoanApplication> => {
    const newLoan: LoanApplication = {
        id: nextLoanId,
        applicant: loanData.applicant,
        amount: loanData.amount,
        status: "pending",
        createdAt: new Date().toISOString()
    };

    loanApplications.push(newLoan);
    nextLoanId++;

    return newLoan;
};

/**
 * Updates an existing loan application
 * @param id - The ID of the loan application to update
 * @param loanData - The fields to update
 * @returns The updated loan application
 * @throws Error if loan application with given ID is not found
 */
export const updateLoanApplication = async (
    id: number,
    loanData: {
        applicant?: string;
        amount?: number;
        status?: string;
    }
): Promise<LoanApplication> => {
    // check if the loan application exists before updating
    const loan: LoanApplication = getLoanApplicationById(id);

    // only update fields that were provided
    if (loanData.applicant !== undefined) {
        loan.applicant = loanData.applicant;
    }

    if (loanData.amount !== undefined) {
        loan.amount = loanData.amount;
    }

    if (loanData.status !== undefined) {
        loan.status = loanData.status;
    }

    return loan;
};

