"use client"

import { useCallback, useEffect, useState } from "react";
import CardComponent from "../../../components/CustomComponents/CardComponent"
import axios, { AxiosError } from "axios";
import { toast } from "sonner"
import { Switch } from "@/components/ui/switch"


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
    const [isSwitchLoading, setisSwitchLoading] = useState(false);
    const [isLoading, setisLoading] = useState(false);
    const [complete_Url, setcomplete_Url] = useState("");
    const [acceptmessage, setacceptmessage] = useState(false);


    const { data: session } = useSession();



    const form = useForm({
        resolver: zodResolver(acceptmessage_schema)
    });



    const handleDeletion = (id: string) => {
        // console.log("Deleting message from the frontend before::::::",Msg);
        setMsg(Msg.filter((SingleMsg) => SingleMsg._id !== id))
        // console.log("Deleting message from the frontend after ::::::",Msg);



        
    }



    const get_messages = useCallback(async (refresh: boolean = false) => {
        setisLoading(true);
        try {
            const res = await axios.post("/api/get-user-messages");

            if (res.data.messages) { setMsg(res.data.messages) }

            else {
                setMsg([])
            }

            // console.log("This got ran bro...", res.data.message);

            if (refresh) {
                toast("Showing latest Messages.");
            }

            toast("Message fetched successfully.")




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
            console.log("this is MSG status bro....", MSG_status)
            // setValue("acceptmessage", MSG_status)
            setacceptmessage(MSG_status)



        } catch (error) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>
                console.log(axiosError.response?.data.message);
                toast("Error Occured while fetching the message status from Server.")

            }
        }
        finally {
            setisSwitchLoading(false)
        }
    }, [session])
  

    useEffect(() => {
        if (!session || !session.user) return;
        const baseUrl = `${window.location.protocol}//${window.location.host}`;

        setcomplete_Url(`${baseUrl}/u/${session?.user.username}`)
        get_messages();
        get_message_status();


    }, [session])

    const change_message_status = async (checked: boolean) => {
        try {
            setacceptmessage((prev) => !prev)
            console.log("The value that u are looking bro", checked)
            const res = await axios.post("/api/change-message-status", {
                messagestatus: checked
            });


            toast("Status Changed Successfully.");

        } catch (error) {
            setacceptmessage((prev) => !prev)
            const axiosError = error as AxiosError<{ message: string }>
            // toast(axiosError.response?.data.message);
            toast(axiosError.response?.data.message || "Error Occured while fetching the message status from Server.")




        }
    }




    const copyToClipboard = () => {

        window.navigator.clipboard.writeText(complete_Url);

        toast("Url copied to clipboard.");
    }

    return (
        <div className="my-8 mx-4 md:mx-8 lg:mx-auto p-6 bg-white rounded w-full max-w-6xl">
            <h1 className="text-4xl font-bold mb-4">User Dashboard</h1>

            <div className="mb-4">
                <h2 className="text-lg font-semibold mb-2">Copy Your Unique Link</h2>{' '}
                <div className="flex items-center border border-gray-200 rounded-xl p-3 shadow-md bg-white">
                    <input
                        type="text"
                        value={complete_Url}
                        readOnly
                        className="input input-bordered w-full p-2 mr-2"
                    />
                    <Button className="cursor-pointer" onClick={copyToClipboard}>Copy</Button>
                </div>
            </div>

            <div className="mb-4">
                <Switch className="cursor-pointer"
                    checked={acceptmessage}
                    onCheckedChange={change_message_status}

                />
                <span className="ml-2">
                    Accept Messages: {acceptmessage ? 'On' : 'Off'}
                </span>
            </div>
            <Separator />

            <Button
                className="mt-4 cursor-pointer"
                variant="outline"
                onClick={(e) => {
                    e.preventDefault();
                    get_messages();
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
                    //@ts-ignore
                    Msg.map((Single_message) => (<CardComponent key={Single_message._id} message={Single_message} handleDeletion={handleDeletion} />))
                ) : (
                    <p>No messages to display.</p>
                )}
            </div>
        </div>
    );

};

export default page;