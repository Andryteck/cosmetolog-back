import {validationResult} from "express-validator";

const {Patient} = require('../models');

function PatientController() {
}


const create = function (req:any, res:any) {
    const data = {
        fullName: req.body.fullName,
        phone: req.body.phone,
        instagramUrl: req.body.instagramUrl,
        status: 'надежный клиент'
    };
    const errors = validationResult(req)

    if (!errors.isEmpty()) {
        return res.status(422).json({
            success: false,
            message: errors.array(),
        });
    }
    Patient.create(data, function (err:any, doc:any) {
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

const remove = async function (req:any, res:any) {
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

    Patient.deleteOne({_id: id}, (err:any) => {
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
    const patientId = req.params.id;
    const data = {
        fullName: req.body.fullName,
        phone: req.body.phone,
        instagramUrl: req.body.instagramUrl,
        status: req.body.status
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
                        message: 'Patient_not_found',
                    });
            }

            res.status(200)
                .json({
                    success: true,
                });
        });

};

const all = function (req:any, res:any) {
    Patient.find({}, function (err:any, docs:any) {
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

const show = async function (req:any, res:any) {
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

