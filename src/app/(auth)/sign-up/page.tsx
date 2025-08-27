"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import Link from "next/link";
import { useState, useEffect } from "react"
import { useDebounceCallback } from "usehooks-ts"
import axios, { AxiosError } from "axios"
import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signup_schema } from "../../../schemas/signupschema"

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
import { Loader, Loader2 } from 'lucide-react';


import { useAppDispatch } from '../../../lib/hooks/ReducReactHooks'
import { setUsername, setEmail } from "../../../features/user-verification/userSlice"











const page = () => {
    const [username, setusername] = useState("");

    const [checkingusername, setcheckingusername] = useState(false);
    const [checkingusernameMSG, setcheckingusernameMSG] = useState('');

    const [IsSubmiting, setIsSubmiting] = useState(false);


    const debounced = useDebounceCallback(setusername, 500);
    const router = useRouter()

    const dispatch = useAppDispatch();



    const form = useForm<z.infer<typeof signup_schema>>({
        resolver: zodResolver(signup_schema),
        defaultValues: {
            username: "",
            email: "",
            password: "",
        },
    });


    const onSubmit = async (values: z.infer<typeof signup_schema>) => {
        setIsSubmiting(true);
        try {
            const res = await axios.post("/api/sign-up", values);
            if (res.data.success) {
                const username: string = values.username; //wanna set it into userSlice
                const email: string = values.email; //wanna set it to userSlice

                dispatch(setEmail(email));
                dispatch(setUsername(username));


                toast(res.data.message);
                router.replace("/api/verify-user");

            }
            else {
                toast("sign-up failed", { description: "mama", className: "bg-red-800" });

            }

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>
                toast(axiosError.response?.data.message)

            }
            else {
                console.log("some error occured during the submition of form.", error)

            }

        }
        finally {
            setIsSubmiting(false);
        }


    }


    useEffect(() => {
        const checkAvailableusername = async () => {
            if (username) {
                setcheckingusername(true);
                setcheckingusernameMSG('');

                try {
                    const res = await axios.get(`/api/username-available?username=${username}`);
                    const incomingMSG = res.data.message
                    setcheckingusernameMSG(incomingMSG);

                } catch (error: unknown) {
                    if (axios.isAxiosError(error)) {
                        const axiosError = error as AxiosError<{ message: string }>
                        const Msg: string = axiosError.response?.data.message as string
                        setcheckingusernameMSG(Msg)


                    }
                }
                finally {
                    setcheckingusername(false);
                    // setcheckingusernameMSG('');


                }


            }
        }

        checkAvailableusername();
    }, [username])


    return (
        <div className="flex items-center justify-center bg-gray-200 min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-white rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Join Mystery Message</h1>
                    <p className="mb-4">Sign up to start your anonymous adventure</p>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="username"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="username" {...field} onChange={(e) => {
                                                    field.onChange(e)
                                                    debounced(e.target.value);
                                                }
                                                } />
                                            </FormControl>
                                            {checkingusername && <Loader2 className="animate-spin" />}
                                            <p className={`text-sm ${checkingusernameMSG === "Username is available." ? 'text-green-500' : "text-red-500"}`}>
                                                {checkingusernameMSG}
                                            </p>
                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="email"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                        </FormItem>
                                    )}
                                />
                                <FormField
                                    control={form.control}
                                    name="password"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>password</FormLabel>
                                            <FormControl>
                                                <Input placeholder="password" type="password" {...field} />
                                            </FormControl>

                                            <FormMessage />
                                            <FormDescription>
                                                Please Enter your Details.
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                                <Button type="submit" disabled={IsSubmiting}>
                                    {
                                        IsSubmiting ? (
                                            <>
                                                <Loader className="animate-spin" />
                                            </>) :
                                            "Sign-up"
                                    }
                                </Button>
                            </form>
                        </Form>
                    </div>
                </div>
            </div>


        </div>
    )
}

export default page;