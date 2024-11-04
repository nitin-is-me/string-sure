"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Validator = void 0;
/**
 * Validator class for validating strings and emails.
 */
class Validator {
    /**
     * Validates an email address format.
     *
     * @param email - The email address to validate.
     * @returns true if the email format is valid, false otherwise.
     */
    static validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }
    /**
     * Validates a string against specified rules.
     *
     * @param value - The string value to validate.
     * @param rules - An object defining the validation rules.
     * @param logging - Optional flag to enable logging of validation steps.
     * @returns true if the string is valid according to the rules, false otherwise.
     */
    static validateString(value, rules = {}, logging = false) {
        let isValid = true;
        // Default rules
        rules.minLength = rules.minLength || 0;
        rules.maxLength = rules.maxLength || Infinity;
        // Check overall length
        const lengthValid = value.length >= rules.minLength && value.length <= rules.maxLength;
        if (logging) {
            console.log("Overall length valid:", lengthValid);
        }
        isValid = isValid && lengthValid;
        // Check uppercase
        if (rules.uppercase) {
            const uppercaseCount = (value.match(/[A-Z]/g) || []).length;
            const uppercaseValid = uppercaseCount >= (rules.uppercase.minLength || 0) &&
                uppercaseCount <= (rules.uppercase.maxLength || Infinity);
            if (logging) {
                console.log("Uppercase valid:", uppercaseValid);
            }
            isValid = isValid && uppercaseValid;
        }
        // Check lowercase
        if (rules.lowercase) {
            const lowercaseCount = (value.match(/[a-z]/g) || []).length;
            const lowercaseValid = lowercaseCount >= (rules.lowercase.minLength || 0) &&
                lowercaseCount <= (rules.lowercase.maxLength || Infinity);
            if (logging) {
                console.log("Lowercase valid:", lowercaseValid);
            }
            isValid = isValid && lowercaseValid;
        }
        // Check special characters
        if (rules.specialChars) {
            const { allowed = [], compulsory = [], minLength = 0, maxLength = Infinity } = rules.specialChars;
            // Check for compulsory special characters if compulsory array is defined
            const compulsoryValid = compulsory.length === 0 || compulsory.every(char => value.includes(char));
            isValid = isValid && compulsoryValid;
            // Check total count of compulsory special characters
            const compulsoryCount = compulsory.filter(char => value.includes(char)).length;
            const compulsoryLengthValid = compulsoryCount >= minLength && compulsoryCount <= maxLength;
            isValid = isValid && compulsoryLengthValid;
            // Check that all special characters are in the allowed list
            const specialChars = [...value].filter(char => !/[a-zA-Z0-9]/.test(char));
            const allAllowedValid = specialChars.every(char => allowed.includes(char));
            isValid = isValid && allAllowedValid;
            // Check total count of allowed special characters
            const allowedCount = specialChars.filter(char => allowed.includes(char)).length;
            const allowedLengthValid = allowedCount >= minLength && allowedCount <= maxLength;
            isValid = isValid && allowedLengthValid;
            // Log only the validity of the compulsory and allowed special characters checks
            if (logging) {
                console.log("Compulsory special characters valid:", compulsoryValid);
                console.log("Allowed special characters valid:", allAllowedValid);
            }
        }
        // Check for numbers
        if (rules.number) {
            const numberCount = (value.match(/[0-9]/g) || []).length;
            const numberValid = numberCount >= (rules.number.minLength || 0) &&
                numberCount <= (rules.number.maxLength || Infinity);
            if (logging) {
                console.log("Numbers valid:", numberValid);
            }
            isValid = isValid && numberValid;
        }
        return isValid;
    }
}
exports.Validator = Validator;
