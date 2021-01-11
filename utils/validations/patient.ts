import {check} from 'express-validator';

const validationPatient = {
    create: [
        check('fullName').isLength({min: 3}),
        check('phone').isLength({min: 12}),
        check('instagramUrl').isLength({min: 3}),
    ]

}

module.exports = validationPatient
