"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const express = require('express');
const app = express();
const cors = require('cors');
// import * as dotenv from "dotenv";
const { PatientCtrl } = require('./controllers');
const { AppointmentCtrl } = require('./controllers');
const { patientValidation, appointmentValidation } = require('./utils/validations');
const uri = `mongodb+srv://Andrei:772316Andrew@cluster0.rua4d.gcp.mongodb.net/svetaapp?retryWrites=true&w=majority`;
// dotenv.config();
// @TODO сделать удаление пациента в приеме
// @TODO сделать название препарата для каждого пациента и возможность его редактировать
mongoose_1.default.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
    useCreateIndex: true,
})
    .then(() => {
    console.log("Nya-MongoDB connected successfully");
    app.use(cors());
    app.use(express.json());
    app.get('/patients', PatientCtrl.all);
    app.get('/patients/:id', PatientCtrl.show);
    app.post('/patients', patientValidation.create, PatientCtrl.create);
    app.delete('/patients/:id', PatientCtrl.remove);
    app.patch('/patients/:id', patientValidation.create, PatientCtrl.update);
    app.get('/appointments', AppointmentCtrl.all);
    app.post('/appointments', appointmentValidation.create, AppointmentCtrl.create);
    app.delete('/appointments/:id', AppointmentCtrl.remove);
    app.patch('/appointments/:id', appointmentValidation.update, AppointmentCtrl.update);
    mongoose_1.default.connection.on('error', err => console.log(`Connection error: ${err}`));
    mongoose_1.default.connection.once('open', () => console.log(`Connection to BD`));
    app.listen(process.env.PORT, (err) => {
        err ? console.log(err) : console.log('Server started!');
    });
})
    .catch(e => console.log("Nya-MongoDB connection error: ", Object.assign({}, e)));
process.on("unhandledRejection", (reason, p) => {
    console.log("Nya-unhandledRejection: ", reason, p);
});
//# sourceMappingURL=index.js.map