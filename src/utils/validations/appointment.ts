import {check, validationResult} from 'express-validator';

const validationAppointment = {
    create: [
        check('price').isInt({min: 0, max: 100000}),
        check('procedure').isLength({min: 3, max: 40}),
        check('preporation').isLength({min: 3, max: 40}),
        check('date').isLength({min: 5, max: 15}),
        check('time').isLength({min: 3, max: 50}),
        check('user').isLength({min: 3, max: 50}),
    ],
    update: [
        check('procedure').isLength({min: 3, max: 40}),
        check('preporation').isLength({min: 3, max: 40}),
        check('price').isInt({min: 0, max: 100000}),
        check('date').isLength({min: 5, max: 15}),
        check('time').isLength({min: 3, max: 50}),
    ]
}

module.exports = validationAppointment
