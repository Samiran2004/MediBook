import mongoose from "mongoose";

const DoctorSchema = mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    phonenumber: {
        type: Number,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
    },
    profilepic: {
        type: String,
        required: false
    },
    specialization: {
        type: [String],
        enum: [
            "General Physician",
            "Cardiology",
            "Dermatology",
            "Endocrinology",
            "Gastroenterology",
            "Hematology",
            "Neurology",
            "Nephrology",
            "Oncology",
            "Ophthalmology",
            "Orthopedics",
            "Otolaryngology (ENT)",
            "Pediatrics",
            "Psychiatry",
            "Pulmonology",
            "Radiology",
            "Rheumatology",
            "Surgery",
            "Urology",
            "Gynecology",
            "Dentistry",
            "Anesthesiology",
        ],
        required: true
    },
    registrationId: {
        type: String,
        required: true,
        unique: true
    },
    isVerified: {
        type: Boolean,
        default: false
    }
});

const Doctor = mongoose.model('Doctor', DoctorSchema);

export default Doctor;