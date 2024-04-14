import mongoose from "mongoose";

const contactSchema = new mongoose.Schema({
    name : String,
    lastName : String,
    phone : String
})

const Contact = mongoose.model('contacts', contactSchema)

export default Contact