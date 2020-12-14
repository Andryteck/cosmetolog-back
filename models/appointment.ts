import * as mongoose from 'mongoose';

const {Schema} = mongoose;

const AppointmentSchema = new Schema(
    {
        user: {type: Schema.Types.ObjectId, ref: 'Patient'},
        procedure: String,
        preporation: String,
        price: Number,
        date: String,
        time: String,
    },
    {
        timestamps: true,    },
);

const Appointment = mongoose.model('Appointment', AppointmentSchema);

module.exports = Appointment;
