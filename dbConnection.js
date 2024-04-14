import mongoose from "mongoose";

async function configureDB(){
    await mongoose.connect("mongodb://127.0.0.1:27017/niswey",{
    })
}

export default configureDB