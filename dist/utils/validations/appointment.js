"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const validationAppointment = {
    create: [
        express_validator_1.check('price').isInt({ min: 0, max: 100000 }),
        express_validator_1.check('procedure').isLength({ min: 3, max: 40 }),
        express_validator_1.check('preporation').isLength({ min: 3, max: 40 }),
        express_validator_1.check('date').isLength({ min: 5, max: 15 }),
        express_validator_1.check('time').isLength({ min: 3, max: 50 }),
        express_validator_1.check('user').isLength({ min: 3, max: 50 }),
    ],
    update: [
        express_validator_1.check('procedure').isLength({ min: 3, max: 40 }),
        express_validator_1.check('preporation').isLength({ min: 3, max: 40 }),
        express_validator_1.check('price').isInt({ min: 0, max: 100000 }),
        express_validator_1.check('date').isLength({ min: 5, max: 15 }),
        express_validator_1.check('time').isLength({ min: 3, max: 50 }),
    ]
};
module.exports = validationAppointment;
//# sourceMappingURL=appointment.js.map