"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const { groupBy, reduce } = require('lodash');
const dayjs = require('dayjs');
const ruLocale = require('dayjs/locale/ru');
const { Appointment } = require('../models');
const { Patient } = require('../models');
var customParseFormat = require('dayjs/plugin/customParseFormat');
dayjs.extend(customParseFormat);
const { delayedSms } = require('../utils/sms');
function AppointmentController() {
}
const create = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        let patient;
        const data = {
            user: req.body.user,
            procedure: req.body.procedure,
            preporation: req.body.preporation,
            price: req.body.price,
            date: req.body.date,
            time: req.body.time,
        };
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                message: errors.array(),
            });
        }
        try {
            patient = yield Patient.findOne({ _id: data.user });
        }
        catch (e) {
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
            const delayedTime = dayjs(`${data.date
                .split('.')
                .reverse()
                .join('-')}${data.time}`)
                .subtract(3, 'hour')
                .format('YYYY-MM-DDHHmm');
            delayedSms({
                number: patient.phone,
                text: `Сегодня в ${data.time} у Вас процедура у косметолога.`,
                time: delayedTime
            }).then(({ data }) => {
                console.log(data);
            }).catch((err) => {
                console.log(err);
            });
            res.status(201)
                .json({
                success: true,
                data: doc,
            });
        });
    });
};
const remove = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield Appointment.findOne({ _id: id });
        }
        catch (e) {
            return res.status(404)
                .json({
                success: false,
                message: 'Appointment_not_found',
            });
        }
        Appointment.deleteOne({ _id: id }, (err) => {
            if (err) {
                return res.status(500)
                    .json({
                    success: false,
                    message: err,
                });
            }
        });
        res.json({
            status: 'success',
        });
    });
};
const update = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const appointmentId = req.params.id;
        const data = {
            procedure: req.body.procedure,
            preporation: req.body.preporation,
            price: req.body.price,
            date: req.body.date,
            time: req.body.time
        };
        const errors = express_validator_1.validationResult(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                message: errors.array(),
            });
        }
        try {
            const updateAppointment = yield Appointment.findByIdAndUpdate(appointmentId, data, { new: true });
            if (updateAppointment) {
                res.status(200)
                    .json({
                    success: true,
                    data: updateAppointment,
                });
            }
            else {
                res.status(404)
                    .json({
                    success: false,
                    message: 'Appointment_not_found',
                });
            }
        }
        catch (err) {
            res.status(500)
                .json({
                success: false,
                message: err,
            });
        }
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
            items: reduce(groupBy(docs, 'date'), (result, value, key) => {
                result = [...result, {
                        title: dayjs(key)
                            .locale(ruLocale)
                            .format(`D MMMM (dddd)`),
                        data: value.sort((a, b) => {
                            const date1 = b.date + 'T' + b.time;
                            const date2 = a.date + 'T' + a.time;
                            return new Date(date2).getTime() - new Date(date1).getTime();
                        })
                    }
                ];
                return result.sort((a, b) => {
                    return new Date(a.data[0].date).getTime() - new Date(b.data[0].date).getTime();
                });
            }, []),
        });
    });
};
const getAppointments = function (req, res) {
    Appointment.find({})
        .populate('user')
        .exec(function (err, docs) {
        if (err) {
            return req.status(500)
                .json({
                status: 'error',
                message: err,
            });
        }
        res.json({
            status: 'success',
            data: groupBy(docs, 'date'),
        });
    });
};
AppointmentController.prototype = {
    create,
    all,
    remove,
    update,
    getAppointments,
};
module.exports = AppointmentController;
//# sourceMappingURL=appointmentController.js.map