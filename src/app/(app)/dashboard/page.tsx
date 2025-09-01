"use client"

import { useCallback, useEffect, useState } from "react";
import CardComponent from "../../../components/CustomComponents/CardComponent"
import axios, { AxiosError } from "axios";
import { toast } from "sonner"

import { message } from ".././../../models/user.model"

import { acceptmessage_schema } from "@/schemas/acceptmessageschema";

import { useForm } from "react-hook-form";

import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/button";
import { Loader2, RefreshCcw } from "lucide-react";
import { Separator } from "@/components/ui/separator"


const page = () => {


    const [Msg, setMsg] = useState<message[]>([]);
    const [acceptingMSG, setacceptingMSG] = useState(false);
    const [isSwitchLoading, setisSwitchLoading] = useState(false);
    const [isLoading, setisLoading] = useState(false);

    const { data: session } = useSession();



    const form = useForm({
        resolver: zodResolver(acceptmessage_schema)
    });

    const { register, watch, setValue } = form;

    const acceptmessages = watch("acceptmessage")

    const handleDeletion = (id: string) => {
        console.log(Msg);
        setMsg(Msg.filter((SingleMsg) => SingleMsg.id !== id))
    }



    const get_messages = useCallback(async (refresh: boolean = false) => {
        setisLoading(true);
        try {
            const res = await axios.post("/api/get-user-messages");

            if (res.data.messages) { setMsg(res.data.messages) }

            else {
                setMsg([])
            }

            if (refresh) {
                toast("Showing latest Messages.");
            }




        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>
                toast(axiosError.response?.data.message || "Error Occured while fetching the message from Server.");
                // toast("Error Occured while fetching the message from Server.")


            }

        }
        finally {
            setisLoading(false)
        }

    }, [])


    const get_message_status = useCallback(async () => {
        setisSwitchLoading(true)
        const userid = session?.user._id
        try {
            const res = await axios.get(`/api/get-message-status?id=${userid}`);

            const MSG_status = res.data.isacceptingmessage;
            setValue("acceptmessage", MSG_status)



        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>
                // toast(axiosError.response?.data.message);
                toast("Error Occured while fetching the message status from Server.")

            }
        }
        finally {
            setisSwitchLoading(false)
        }
    }, [setValue])

    useEffect(() => {
        if (!session || !session.user) return;
        get_messages();
        get_message_status();


    }, [session, setValue, isSwitchLoading, acceptingMSG])

    const change_message_status = async () => {
        try {
            const res = await axios.post("/api/change-message-status", {
                messagestatus: !acceptingMSG
            });
            setValue("acceptmessage", !acceptingMSG)

            toast("Status Changed Successfully.");

        } catch (error) {

            const axiosError = error as AxiosError<{ message: string }>
            // toast(axiosError.response?.data.message);
            toast(axiosError.response?.data.message || "Error Occured while fetching the message status from Server.")




        }
    }


    const baseUrl = `${window.location.protocol}//${window.location.host}`;

    const complete_Url = `${baseUrl}/u/${session?.user.username}`

    const copyToClipboard = () => {
        window.navigator.clipboard.writeText(complete_Url);

        toast("Url copied to clipboard.");
    }

    return (
        <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
            <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
                <div className="flex items-center">
                    <input
                        type="text"
                        value={complete_Url}
                        disabled
                        className="input input-bordered w-full p-2 mr-2"
                    />
                    <Button onClick={copyToClipboard}>Copy</Button>
                </div>
            </div>

            <div className="mb-4">
                <switch
                    {...register('acceptmessage')}
                    checked={acceptingMSG}
                    onCheckedChange={change_message_status}
                    disabled={isSwitchLoading}
                />
                <span className="ml-2">
                    Accept Messages: {acceptingMSG ? 'On' : 'Off'}
                </span>
            </div>
            <Separator />

            <Button
                className="mt-4"
                variant="outline"
                onClick={(e) => {
                    e.preventDefault();
                    //fetchMessages(true);
                }}
            >
                {isLoading ? (
                    <Loader2 className="h-4 w-4 animate-spin" />
                ) : (
                    <RefreshCcw className="h-4 w-4" />
                )}
            </Button>
            <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-6">
                {Msg.length > 0 ? (
                    Msg.map((Single_message) => (<CardComponent key={Single_message.id} message={Single_message} handleDeletion={handleDeletion} />))
                ) : (
                    <p>No messages to display.</p>
                )}
            </div>
        </div>
    );

};

export default page;