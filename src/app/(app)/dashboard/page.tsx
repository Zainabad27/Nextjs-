"use client"

import { useEffect, useState } from "react";
import CardComponent from "../../../components/CustomComponents/CardComponent"
import axios, { AxiosError } from "axios";
import { toast } from "sonner"

import { message } from ".././../../models/user.model"

import { useSession } from "next-auth/react";


const page = () => {


    const [Msg, setMsg] = useState<message[]>([]);

    const { data: session, status } = useSession();

    const handleDeletion = (id: string) => {
        console.log(Msg);
        setMsg(Msg.filter((SingleMsg) => SingleMsg.id !== id))
    }



    const get_messages = async () => {
        try {
            const res = await axios.post("/api/get-user-messages");

            if (res.data.messages) { setMsg(res.data.messages) }

            else {
                setMsg([])
            }


        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>
                // toast(axiosError.response?.data.message);
                toast("Invaid Username or Password.")


            }

        }
    }

    useEffect(() => {
        get_messages();


    }, [])

    return (
        <main>

            <div>
                <p className="text-center text-2xl font-bold text-black mb-4">Welcome, {session?.user.username}</p>
                <h1 className="text-4xl text-center font-semibold mb-2">Messages</h1>

                <div>
                    {Msg.map((Single_message) => (<CardComponent key={Single_message.id} message={Single_message} handleDeletion={handleDeletion} />))}
                </div>
            </div>





        </main>
    );
};

export default page;