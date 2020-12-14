import {validationResult} from "express-validator";
const {groupBy, reduce} = require('lodash')
const dayjs = require('dayjs')
const ruLocale = require('dayjs/locale/ru')

const {Appointment} = require('../models');
const {Patient} = require('../models');

// const {delayedSms} = require('../utils/sms')

function AppointmentController() {
}


const create = async function (req, res) {
    let patient;
    const data = {
        user: req.body.user,
        procedure: req.body.procedure,
        preporation: req.body.preporation,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time,
    };
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: errors.array(),
        });
    }

    try {
        patient = await Patient.findOne({_id: data.user});
    } catch (e) {
        return res.status(404)
            .json({
                success: false,
                message: 'Patient_not_found',
            });
    }

    Appointment.create(data, function (err, doc) {
        if (err) {
            return res.status(500)
                .json({
                    success: false,
                    message: err,
                });
        }

        // const delayedTime = dayjs(`${data.date
        //     .split('.')
        //     .reverse()
        //     .join('-')}${data.time}`)
        //     .subtract(2, 'hour')
        //     .format('YYYY-MM-DDHHmm')

        // delayedSms({
        //         number: patient.phone,
        //         text: `Сегодня в ${data.time} у Вас процедура.`,
        //         time: delayedTime
        //     }
        // ).then(({data}) => {
        //     console.log(data)
        // }).catch((err) => {
        //     console.log(err)
        // });

        res.status(201)
            .json({
                success: true,
                data: doc,
            });
    });

};

const remove = async function (req, res) {
    const id = req.params.id;
    try {
        await Appointment.findOne({_id: id});
    } catch (e) {
        return res.status(404)
            .json({
                success: false,
                message: 'Appointment_not_found',
            });
    }

    Appointment.deleteOne({_id: id}, err => {
        if (err) {
            return res.status(500)
                .json({
                    success: false,
                    message: err,
                });
        }
    })
    res.json({
        status: 'success',
    })
};

const update = async function (req, res) {
    const appointmentId = req.params.id;
    const data = {
        bodyNumber: req.body.bodyNumber,
        price: req.body.price,
        date: req.body.date,
        time: req.body.time,
    };
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: errors.array(),
        });
    }

    Appointment.updateOne({_id: appointmentId},
        {$set: data},
        function (err, doc) {
            if (err) {
                return res.status(500)
                    .json({
                        success: false,
                        message: err,
                    });
            }
            if (!doc) {
                return res.status(404)
                    .json({
                        success: false,
                        message: 'Appointment_not_found',
                    });
            }

            res.status(200)
                .json({
                    success: true,
                    data: doc,
                });
        });

};

const all = function (req, res) {
    Appointment.find({})
        .populate('user')
        .exec(function (err, docs) {
            if (err) {
                return req.status(500)
                    .json({
                        status: false,
                        message: err,
                    });
            }
        
            res.json({
                status: 'success',
                items: reduce(
                    groupBy(docs, 'date'), 
                    (result, value, key) => {
                        result = [...result, {title: dayjs(key)
                            .locale(ruLocale)
                            .format('D MMMM'), data: value}]
                    return result
                }, []),
        });
    });
};

  

AppointmentController.prototype = {
    create,
    all,
    remove,
    update,

}

module.exports = AppointmentController;

