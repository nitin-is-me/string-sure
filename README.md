# string-sure

A simple yet powerful validation library for JavaScript strings. This library provides methods to validate email format and various string rules, including character requirements, length constraints, and specific content checks.

## Installation

You can install the `string-sure` package via npm:
```
npm install string-sure
```

## Usage

### Importing the Validator
```
const { Validator } = require("string-sure");
```


### Email Validation

To validate an email address, use the `validateEmail` method:
```
const isValidEmail = Validator.validateEmail('example@example.com');
console.log(isValidEmail); // true or false
```

### String Validation

To validate a string according to specified rules, use the `validateString` method:
```
const rules = {
    minLength: 5,
    maxLength: 20,
    uppercase: {
        minLength: 1,
        maxLength: 5
    },
    lowercase: {
        minLength: 1,
        maxLength: 5
    },
    specialChars: {
        allowed: ["@", "&", "_", "!"],
        compulsory: ["@", "_"]
    },
    number: {
        minLength: 3,
        maxLength: 5
    }
};

const isValidString = Validator.validateString('Wow@_123', rules);
console.log(isValidString); // true

```
## Logging Validation Results

You can control the logging of validation results using the `logging` parameter in the `validateString` method. Set it to `true` to enable logging:
```
console.log(Validator.validateString("Wow@_123", rules, true)); // Logs validation results
console.log(Validator.validateString("Wow@_123", rules)); // No logs

```

## Validation Rules

The `validateString` method accepts the following rules:

- **minLength**: Minimum length of the string (if omitted, minimum length will be 0).
- **maxLength**: Maximum length of the string (if omitted, maximum length will be Infinity).
- **uppercase**: 
  - `minLength`: Minimum number of uppercase letters.
  - `maxLength`: Maximum number of uppercase letters.
- **lowercase**: 
  - `minLength`: Minimum number of lowercase letters.
  - `maxLength`: Maximum number of lowercase letters.
- **specialChars**: 
  - `allowed`: Array of allowed special characters.
  - `compulsory`: Array of compulsory special characters that must be present in the string. This array must be a subset of `allowed` array.
  - `minLength`: Minimum number of characters.
  - `maxLength`: Maximum number of characters.
- **number**: 
  - `minLength`: Minimum number of digits.
  - `maxLength`: Maximum number of digits.

## Examples

Here are some example cases for validating strings:
```
console.log(Validator.validateString("Wow@_123", rules)); // true
console.log(Validator.validateString("Wow@123", rules)); // false (missing compulsory special character)
console.log(Validator.validateString("WOW@_123", rules)); // false (missing lowercase)
console.log(Validator.validateString("Wow", rules)); // false (too short)

```

## Contributing

Contributions are welcome! Please open an issue or submit a pull request for any enhancements or bug fixes.

## License

This project is licensed under the MIT License.

## Contact

For any questions or feedback, please contact me on [email](mailto:nitinjha2609@gmail.com)