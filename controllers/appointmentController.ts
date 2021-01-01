import {validationResult} from "express-validator";
const {groupBy, reduce} = require('lodash')
const dayjs = require('dayjs')
const ruLocale = require('dayjs/locale/ru')

const {Appointment} = require('../models');
const {Patient} = require('../models');

// const {delayedSms} = require('../utils/sms')

function AppointmentController() {
}


const create = async function (req:any, res:any) {
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

    Appointment.create(data, function (err:any, doc:any) {
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

const remove = async function (req:any, res:any) {
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

    Appointment.deleteOne({_id: id}, (err:any) => {
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

const update = async function (req:any, res:any) {
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
        function (err:any, doc:any) {
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

const all = function (req:any, res:any) {
    Appointment.find({})
        .populate('user')
        .exec(function (err:any, docs:any) {
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
                    (result:any, value:any, key:any) => {
                        result = [...result, {title: dayjs(key)
                            .locale(ruLocale)
                            .format('D MMMM'), data: value.sort((a: any, b: any)=> {
                                const date1 = b.date+'T'+b.time
                                const date2 = a.date+'T'+a.time
                                return new Date(date2).getTime() - new Date(date1).getTime() 
                            })
                            }
                            ]
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


