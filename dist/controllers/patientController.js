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
const { Patient } = require('../models');
function PatientController() {
}
const create = function (req, res) {
    const data = {
        fullName: req.body.fullName,
        phone: req.body.phone,
        instagramUrl: req.body.instagramUrl,
        status: 'надежный клиент'
    };
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: errors.array(),
        });
    }
    Patient.create(data, function (err, doc) {
        if (err) {
            return res.status(500)
                .json({
                success: false,
                message: err,
            });
        }
        res.status(201)
            .json({
            success: true,
            data: doc,
        });
    });
};
const remove = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            yield Patient.findOne({ _id: id });
        }
        catch (e) {
            return res.status(404)
                .json({
                success: false,
                message: 'Patient_not_found',
            });
        }
        Patient.deleteOne({ _id: id }, (err) => {
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
        const patientId = req.params.id;
        const data = {
            fullName: req.body.fullName,
            phone: req.body.phone,
            instagramUrl: req.body.instagramUrl,
            status: req.body.status
        };
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({
                success: false,
                message: errors.array(),
            });
        }
        Patient.updateOne({ _id: patientId }, { $set: data }, function (err, doc) {
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
                    message: 'Patient_not_found',
                });
            }
            res.status(200)
                .json({
                success: true,
            });
        });
    });
};
const all = function (req, res) {
    Patient.find({}, function (err, docs) {
        if (err) {
            return req.status(500)
                .json({
                status: false,
                message: err,
            });
        }
        res.json({
            status: true,
            data: docs,
        });
    });
};
const show = function (req, res) {
    return __awaiter(this, void 0, void 0, function* () {
        const id = req.params.id;
        try {
            const patient = yield Patient.findById(id).populate('appointments').exec();
            if (patient) {
                res.json({
                    status: 'success',
                    data: Object.assign(Object.assign({}, patient.toJSON()), { appointments: patient.appointments })
                });
            }
            else {
                yield Promise.reject('patient_not_found');
            }
        }
        catch (e) {
            res.status(400).json({
                status: false,
                message: e,
            });
        }
    });
};
PatientController.prototype = {
    create,
    all,
    remove,
    update,
    show
};
module.exports = PatientController;
//# sourceMappingURL=patientController.js.map