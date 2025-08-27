"use client"

import React from "react";
import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useAppSelector } from '../../../lib/hooks/ReducReactHooks'
import { useState } from "react"
import { verification_schema } from "../../../schemas/verifyschema"
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
import axios, { AxiosError } from "axios"
import { toast } from "sonner";



const page = () => {
    // bro to wirte this page i want username,email, and the code i'll just take input in this page so i need email and username.

    const [isVerifying, setisVerifying] = useState(false);
    const [Code, setCode] = useState("");

    const username = useAppSelector((state) => state.User.username)
    const email = useAppSelector((state) => state.User.email);


    const form = useForm<z.infer<typeof verification_schema>>({
        resolver: zodResolver(verification_schema),
        defaultValues: {
            code: ""
        }
    })


    const onSubmit = async (values: z.infer<typeof verification_schema>) => {
        setisVerifying(true);
        console.log("email is here :",email)
        let code = values?.code
        try {
            if (code) {
                const res = await axios.post("/api/verify-user", {
                    username,
                    code,
                });
                if (res.data.success) {
                    toast("User verified successfully.")
                }
                else {
                    toast("User verification Failed.", {
                        description: res.data.message || "Some server Error occured."
                    })
                }
            }

        } catch (error: unknown) {
            if (axios.isAxiosError(error)) {
                const axiosError = error as AxiosError<{ message: string }>
                toast(axiosError.response?.data.message)

            }
            else {
                console.log("Error while sending the verification request to the API.", error)
            }

        }
        finally {
            setisVerifying(false);
        }


    }

    return (
        <div className="flex items-center justify-center bg-pink-300 min-h-screen">
            <div className="w-full max-w-md p-8 space-y-8 bg-pink-100 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-bold text-black mb-4">Verification</h1>
                    <Form {...form} >
                        <form onSubmit={form.handleSubmit(onSubmit)}>
                            <FormField
                                control={form.control}
                                name="code"
                                render={({ field }) => (
                                    <FormItem>
                                        <FormLabel>Paste Your Verification Code</FormLabel>
                                        <FormControl>
                                            <Input placeholder="Code" {...field} onChange={(e) => {
                                                field.onChange(e)
                                            }
                                            } />
                                        </FormControl>
                                        <FormMessage />
                                        <FormDescription>
                                            <p className="mb-5">Paste Your Code that is sent on {email}</p>
                                        </FormDescription>
                                    </FormItem>
                                )}
                            />
                            <Button type="submit" disabled={isVerifying}>
                                {
                                    isVerifying ? (
                                        <>
                                            <Loader2 className="animate-spin" />
                                        </>) :
                                        "Verify"
                                }
                            </Button>
                        </form>
                    </Form>
                </div>
            </div>

        </div>
    );
};

export default page;