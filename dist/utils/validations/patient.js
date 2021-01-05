"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validationPatient = {
    create: [
        express_validator_1.check('fullName').isLength({ min: 3 }),
        express_validator_1.check('phone').isLength({ min: 12 }),
        express_validator_1.check('instagramUrl').isLength({ min: 27 }),
    ]
};
module.exports = validationPatient;
//# sourceMappingURL=patient.js.map