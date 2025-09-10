"use client"

import React, { useEffect, useState } from 'react';

import { useForm } from "react-hook-form"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"

import * as z from "zod"

import { Separator } from "@/components/ui/separator";


import { message_schema } from "../../../../schemas/messageschema"
import { zodResolver } from '@hookform/resolvers/zod';


import ClickableBox from "@/components/CustomComponents/ClickableBox"


import {
    Form,
    FormField,
    FormControl,
    FormItem,
    FormLabel,
    FormDescription,
    FormMessage

} from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Loader2 } from 'lucide-react';



interface PageProps {
    params: Promise<{ username: string }>;

}

interface SuggestionMessages {
    MsgId: number;
    content: string
}

const page = ({ params }: PageProps) => {
    const { username } = React.use(params);

    const [SuggestMsg, setSuggestMsg] = useState<SuggestionMessages[]>([]);
    const [IsSendingMsg, setIsSendingMsg] = useState(false);

    const get_suggested_messages = async () => {
        try {
            const res = await axios.get("/api/get-suggested-message");
            const msgarry: SuggestionMessages[] = res.data.messages
            const slicedarry = msgarry.slice(0, 6) // to show only 4 messages
            setSuggestMsg(slicedarry)
            toast("Suggested messages fetched successfully.")

        } catch (error) {


            const axiosError = error as AxiosError<{ message: string }>
            toast(axiosError.response?.data.message || "Some error occured while fetching the suggested messages.");

        }


    }

    const FillInput = (MsgId: number) => {
        const ClickedMsg = SuggestMsg.filter((SingleMsg) => (SingleMsg.MsgId === MsgId));
        form.setValue("content", ClickedMsg[0].content);

    }


    const onSubmit = async (values: z.infer<typeof message_schema>) => {

        setIsSendingMsg(true);
        try {
            const res = await axios.post(`/api/message-user?username=${username}`, {
                content: values.content
            })
            if (res.data.success) {
                toast("Message Sent Successfully.");

            }
            else {
                toast(res.data.message || "Some error occured while sending the message.")
            }



        } catch (error: unknown) {

            const axiosError = error as AxiosError<{ message: string }>
            toast(axiosError.response?.data.message || "Some error occured while sending the message.");


        }
        finally {
            setIsSendingMsg(false);
            // form.setValue("content", "");

        }

    }

    useEffect(() => {
        get_suggested_messages();
    }, [])





    const form = useForm<z.infer<typeof message_schema>>({
        resolver: zodResolver(message_schema),
        defaultValues: {
            content: "",
        },
    });





    return (
        <div>
            <div className='mb-2 p-5 items-center'>
                <h1 className="text-4xl font-bold text-center mb-6">
                    Send your anonymous messages here
                </h1>
                <Form {...form} >
                    <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-col items-center">
                        <FormField
                            control={form.control}
                            name="content"
                            render={({ field }) => (
                                <FormItem className="w-full p-4">
                                    <FormControl>
                                        <Input placeholder='Type your message here'  {...field} onChange={(e) => {
                                            field.onChange(e)
                                        }
                                        } className="h-14 text-lg px-4" />
                                    </FormControl>
                                    <FormMessage />
                                    <FormDescription className="mb-5">
                                        Send Message to {username}
                                    </FormDescription>
                                </FormItem>
                            )}
                        />
                        <Button type="submit" disabled={IsSendingMsg}>
                            {
                                IsSendingMsg ? (
                                    <>
                                        <Loader2 className="animate-spin" />
                                    </>) :
                                    "Send"
                            }
                        </Button>
                    </form>
                </Form>

            </div>
            <Separator />
            <div className='text-center items-center p-4 mb-4'>
                <h1 className='text-4xl font-bold text-shadow-black'>Suggested Messages</h1>
            </div >
            <div className='mt-4 grid grid-cols-1 md:grid-cols-2 gap-6'>
                {SuggestMsg.map((SingleMsg) => (<ClickableBox key={SingleMsg.MsgId} message={SingleMsg} handleClick={FillInput} />))}

            </div>

        </div>

    );
};

export default page;