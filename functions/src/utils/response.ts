// ============================================================
// Standardized API Response Helpers
// ============================================================

import { Response } from "firebase-functions/v2/https";

interface ApiResponse {
    success: boolean;
    data?: unknown;
    message: string;
    error?: string;
}

export function successResponse(
    res: Response,
    data: unknown,
    message: string,
    statusCode = 200
): void {
    const response: ApiResponse = {
        success: true,
        data,
        message,
    };
    res.status(statusCode).json(response);
}

export function errorResponse(
    res: Response,
    message: string,
    statusCode = 400,
    error?: string
): void {
    const response: ApiResponse = {
        success: false,
        message,
        error: error || message,
    };
    res.status(statusCode).json(response);
}
