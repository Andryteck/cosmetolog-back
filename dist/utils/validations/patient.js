"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validationPatient = {
    create: [
        (0, express_validator_1.check)('fullName').isLength({ min: 3 }),
        (0, express_validator_1.check)('phone').isLength({ min: 12 }),
        (0, express_validator_1.check)('instagramUrl').isLength({ min: 0 }),
    ]
};
module.exports = validationPatient;
//# sourceMappingURL=patient.js.map