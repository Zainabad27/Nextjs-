import mongoose from "mongoose";

type connectionobject = {
    isconneted?: number;
};


const connection: connectionobject = {};


async function DB_CONNECTION():Promise<void> {
    if (connection.isconneted) {
        // console.log("DB is already connected");
        return;
    };


    try {
        const db = await mongoose.connect(process.env.DB_URI || "");

     

        connection.isconneted= db.connections[0].readyState;


        console.log("DB Connected successfully.");

    } catch (error) {
        console.log("DB connection failed", error)
        process.exit(1)
    }
};


export default DB_CONNECTION;