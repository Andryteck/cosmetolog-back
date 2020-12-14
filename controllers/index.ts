const PatientControllerConstructor = require('./patientController');
const AppointmentControllerConstructor = require('./appointmentController');

module.exports = {
  PatientCtrl: new PatientControllerConstructor(),
  AppointmentCtrl: new AppointmentControllerConstructor(),
};





