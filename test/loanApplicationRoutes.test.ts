
import request, { Response } from "supertest";
import app from "../src/app";

describe("Loan Application Routes", () => {

    describe("GET /api/v1/loans", () => {
        it("should return all loan applications", async () => {
            // Arrange - No request data needed

            // Act
            const response: Response =
                await request(app).get("/api/v1/loans");

            // Assert
            expect(response.status).toBe(200);
            expect(response.body.message).toBe("Loan applications retrieved");
            expect(response.body.count).toBe(4);
            expect(response.body.data).toHaveLength(4);
        });
    });

    describe("GET /api/v1/loans/:id", () => {
        it("should return a loan application by ID", async () => {
            // Arrange
            const loanId: number = 1;

            // Act
            const response: Response =
                await request(app).get(`/api/v1/loans/${loanId}`);

            // Assert
            expect(response.status).toBe(200);
            expect(response.body.data.id).toBe(1);
            expect(response.body.data.applicant).toBe("John Smith");
        });

        it("should return 404 if the loan does not exist", async () => {
            // Arrange
            const loanId: number = 999;

            // Act
            const response: Response =
                await request(app).get(`/api/v1/loans/${loanId}`);

            // Assert
            expect(response.status).toBe(404);
            expect(response.body.success).toBe(false);
            expect(response.body.error.code).toBe("LOAN_NOT_FOUND");
        });
    });
});