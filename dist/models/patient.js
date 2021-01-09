"use strict";
const mongoose = require("mongoose");
const Schema = mongoose.Schema;
// interface IPatient {
//   id: string,
//   fullName: string,
//   phone: string,
//   instagramUrl: string,
//   status: string
// }
const PatientSchema = new Schema({
    fullName: String,
    phone: String,
    instagramUrl: String,
    status: String
});
PatientSchema.virtual('appointments', {
    ref: 'Appointment',
    localField: '_id',
    foreignField: 'user',
    justOne: false
});
const Patients = mongoose.model('Patient', PatientSchema);
module.exports = Patients;
//# sourceMappingURL=patient.js.map