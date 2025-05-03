import mongoose from "mongoose";

const userSchema = new mongoose.Schema({

    firstName : {
        type: String,
        required : true
    },
    lastName : {
        type: String
    },
    email : {
        type: String,
        required: true,
        unique: true
    }
},{timestamps: true})

const Users = new mongoose.model("user", userSchema);

export {Users};