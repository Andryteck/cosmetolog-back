import {validationResult} from "express-validator";

const {Patient} = require('../models');

function PatientController() {
}


const create = function (req, res) {
    const data = {
        fullName: req.body.fullName,
        phone: req.body.phone,
    };
    const errors = validationResult(req)

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

const remove = async function (req, res) {
    const id = req.params.id;
    try {
        await Patient.findOne({_id: id});
    } catch (e) {
        return res.status(404)
            .json({
                success: false,
                message: 'Patient_not_found',
            });
    }

    Patient.deleteOne({_id: id}, err => {
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
    const patientId = req.params.id;
    const data = {
        fullName: req.body.fullName,
        phone: req.body.phone,
    };
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: errors.array(),
        });
    }

    Patient.updateOne({_id: patientId},
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
                        message: 'Patient_not_found',
                    });
            }

            res.status(200)
                .json({
                    success: true,
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

const show = async function (req, res) {
    const id = req.params.id;
    try {
        const patient = await Patient.findById(id).populate('appointments').exec()
        
        if (patient) {
            res.json({
                    status: 'success',
                    data: {...patient.toJSON(), appointments: patient.appointments}
                }
            )
        } else {
           await  Promise.reject('patient_not_found')
        }

    } catch (e) {
        res.status(400).json({
            status: false,
            message: e,
        })
    }
}

PatientController.prototype = {
    create,
    all,
    remove,
    update,
    show
}

module.exports = PatientController;

