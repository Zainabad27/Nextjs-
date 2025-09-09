"use client"

import React, { useState } from 'react';

import { useForm } from "react-hook-form"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"

import * as z from "zod"


import { message_schema } from "../../../../schemas/messageschema"
import { zodResolver } from '@hookform/resolvers/zod';


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
    content: string
}

const page = ({ params }: PageProps) => {
    const { username } = React.use(params);

    const [SuggestMsg, setSuggestMsg] = useState<SuggestionMessages[]>([]);
    const [IsSendingMsg, setIsSendingMsg] = useState(false);

    const get_suggested_messages = async () => {


    }


    const onSubmit = async (values: z.infer<typeof message_schema>) => {

        setIsSendingMsg(true);
        // if (!values.content) return;
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
            console.log("This is the error bro", axiosError.response?.data.message)
            toast(axiosError.response?.data.message || "Some error occured while sending the message.");


        }
        finally {
            setIsSendingMsg(false);
        }

    }





    const form = useForm<z.infer<typeof message_schema>>({
        resolver: zodResolver(message_schema),
        defaultValues: {
            content: "",
        },
    });





    return (
        <div className='mb-5 p-5 items-center'>
            <h1 className="text-4xl font-bold text-center mb-6">
                Send your anonymous messages here
            </h1>
            <Form {...form} >
                <form onSubmit={form.handleSubmit(onSubmit)}>
                    <FormField
                        control={form.control}
                        name="content"
                        render={({ field }) => (
                            <FormItem>
                                {/* <FormLabel>Paste Your Verification Code</FormLabel> */}
                                <FormControl>
                                    <Input  {...field} onChange={(e) => {
                                        field.onChange(e)
                                    }
                                    } />
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
    );
};

export default page;