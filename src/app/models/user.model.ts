import mongoose, { Schema, Document } from "mongoose";


export interface message extends Document {
    content: {
        type: String,
        required: true
    }

}

const messageSchema: Schema<message> = new Schema({
    content: String,
}, { timestamps: true });


export interface user extends Document {
    username: string;
    email: string;
    password: string;
    verifycode: string;
    expiryverifycode: Date;
    isacceptingmessage: boolean;
    isverified: boolean;
    messages: message[]

}

const userschema: Schema<user> = new Schema({
    username: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        match: [/^[\w.-]+@[\w.-]+\.[a-zA-Z]{2,}$/, "Invalid Email was given by the user."]
    },
    password: {
        type: String,
        required: true,
        unique: true
    },
    verifycode: {
        type: String,
        required: true,
    },
    expiryverifycode: {
        type: Date,
        required: true,
    },
    isacceptingmessage: {
        type: Boolean,
        default: true,
    },
    isverified: {
        type: Boolean,
        required: true,
        default: false
    },
    messages: [messageSchema]
}, { timestamps: true });



const usermodel = (mongoose.models.User as mongoose.Model<user>) || (mongoose.model<user>("User", userschema));



export default usermodel;