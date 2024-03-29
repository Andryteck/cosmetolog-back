import mongoose from 'mongoose'

const express = require('express');
const app = express();
const cors = require('cors');
import 'dotenv/config'

const {PatientCtrl} = require('./controllers');
const {AppointmentCtrl} = require('./controllers');
const {patientValidation, appointmentValidation} = require('./utils/validations');


const uri = process.env.mongoURI || "";

// @TODO сделать удаление пациента в приеме
// @TODO сделать название препарата для каждого пациента и возможность его редактировать
// @TODO поменять patch на put в changeAppointment

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
        console.log("Nya-MongoDB connected successfully");
        app.use(cors())
        app.use(express.json())

        app.get('/patients', PatientCtrl.all);
        app.get('/patients/:id', PatientCtrl.show);
        app.post('/patients', patientValidation.create, PatientCtrl.create);
        app.delete('/patients/:id', PatientCtrl.remove);
        app.patch('/patients/:id', patientValidation.create, PatientCtrl.update);

        app.get('/appointments', AppointmentCtrl.all);
        app.get('/schedule/:date', AppointmentCtrl.getByDay);
        app.post('/appointments', appointmentValidation.create, AppointmentCtrl.create);
        app.delete('/appointments/:id', AppointmentCtrl.remove);
        app.patch('/appointments/:id', appointmentValidation.update, AppointmentCtrl.update);

        mongoose.connection.on('error', err => console.log(`Connection error: ${err}`))
        mongoose.connection.once('open', () => console.log(`Connection to BD`))

        app.listen(process.env.PORT || 6666, (err:any) => {
            err ? console.log(err) : console.log('Server started!');
        });
    })
    .catch(e => console.log("Nya-MongoDB connection error: ", {...e}));

process.on("unhandledRejection", (reason, p) => {
    console.log("Nya-unhandledRejection: ", reason, p);
});


