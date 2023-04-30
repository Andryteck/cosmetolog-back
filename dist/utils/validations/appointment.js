"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validationAppointment = {
    create: [
        (0, express_validator_1.check)('price').isInt({ min: 0, max: 100000 }),
        (0, express_validator_1.check)('procedure').isLength({ min: 3, max: 40 }),
        (0, express_validator_1.check)('preporation').isLength({ min: 3, max: 40 }),
        (0, express_validator_1.check)('date').isLength({ min: 5, max: 15 }),
        (0, express_validator_1.check)('time').isLength({ min: 3, max: 50 }),
        (0, express_validator_1.check)('user').isLength({ min: 3, max: 50 }),
    ],
    update: [
        (0, express_validator_1.check)('procedure').isLength({ min: 3, max: 40 }),
        (0, express_validator_1.check)('preporation').isLength({ min: 3, max: 40 }),
        (0, express_validator_1.check)('price').isInt({ min: 0, max: 100000 }),
        (0, express_validator_1.check)('date').isLength({ min: 5, max: 15 }),
        (0, express_validator_1.check)('time').isLength({ min: 3, max: 50 }),
    ]
};
module.exports = validationAppointment;
//# sourceMappingURL=appointment.js.map