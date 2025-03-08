import mongoose, {Schema} from "mongoose";

const contactSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,  // Changed from Number to String to handle phone formats better
        required: true
    },
    email: {
        type: String,
        required: true
    }
},
{
    timestamps: true,
});

const Contact = mongoose.models.Contact || mongoose.model("Contact", contactSchema);

export default Contact;