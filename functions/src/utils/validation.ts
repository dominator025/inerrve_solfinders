// ============================================================
// Input Validation Helpers
// ============================================================

/**
 * Checks that all required fields exist and are non-empty strings.
 * Returns an array of missing field names.
 */
export function validateRequiredFields(
    data: Record<string, unknown>,
    requiredFields: string[]
): string[] {
    const missing: string[] = [];
    for (const field of requiredFields) {
        const value = data[field];
        if (value === undefined || value === null || value === "") {
            missing.push(field);
        }
    }
    return missing;
}

/**
 * Validates that a value is a positive number.
 */
export function isPositiveNumber(value: unknown): boolean {
    return typeof value === "number" && value > 0;
}

/**
 * Validates that a value is a non-empty array.
 */
export function isNonEmptyArray(value: unknown): boolean {
    return Array.isArray(value) && value.length > 0;
}

/**
 * Sanitizes a string by trimming whitespace and limiting length.
 */
export function sanitizeString(value: string, maxLength = 5000): string {
    return value.trim().slice(0, maxLength);
}
