"use client"

import { zodResolver } from "@hookform/resolvers/zod"
import { useForm } from "react-hook-form"
import * as z from "zod"
import { useState } from "react"


import { toast } from "sonner"
import { useRouter } from "next/navigation"
import { signin_schema } from "../../../schemas/signinschema"

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


import { signIn } from "next-auth/react"
import { message } from "@/models/user.model";





const page = () => {

    const [IsSubmiting, setIsSubmiting] = useState(false);



    const router = useRouter()





    const form = useForm<z.infer<typeof signin_schema>>({
        resolver: zodResolver(signin_schema),
        defaultValues: {
            identifier: "",
            password: "",
        },
    });

    const toSignup = () => {
        router.replace("/sign-up")
    }
    const onSubmit = async (data: z.infer<typeof signin_schema>) => {
        setIsSubmiting(true);

        const res = await signIn("credentials", {
            identifier: data.identifier,
            password: data.password,
            redirect: false
        });
        console.log("result of sign in ", res);

        if (res?.error) {
            setIsSubmiting(false);
            toast("Invaid Username or Password.")
        }
        else {
            setIsSubmiting(false);
            toast("Login successful.");
            router.replace("/dashboard");

        }




    }




    const usermessage: message = {
        content: "My name is zain ",
        createdAt: new Date()
    } as message;


    return (
        <div className="flex items-center justify-center min-h-screen bg-pink-300 dark:bg-gray-900">
            <div className="w-full max-w-md p-8 space-y-8 bg-pink-100 dark:bg-gray-800 rounded-lg shadow-md">
                <div className="text-center">
                    <h1 className="text-4xl font-extrabold tracking-tight lg:text-5xl mb-6">Join Mystery Message</h1>
                    <p className="mb-4">Login to start your anonymous adventure</p>
                    <div>
                        <Form {...form}>
                            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
                                <FormField
                                    control={form.control}
                                    name="identifier"
                                    render={({ field }) => (
                                        <FormItem>
                                            <FormLabel>Email/Username</FormLabel>
                                            <FormControl>
                                                <Input placeholder="Email/Username" {...field} />
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
                                                Please Enter your Credentials.
                                            </FormDescription>
                                        </FormItem>
                                    )}
                                />
                                <Button className="cursor-pointer" type="submit" disabled={IsSubmiting}>
                                    {
                                        IsSubmiting ? (
                                            <>
                                                <Loader2 className="animate-spin" />
                                            </>) :
                                            "Login"
                                    }
                                </Button>



                            </form>
                        </Form>
                        <div>
                            <p>Doesn't have an account?<span className="text-blue-600 cursor-pointer"><button className="cursor-pointer" onClick={toSignup}>Sign-up</button></span></p>
                        </div>
                    </div>
                </div>
            </div>


        </div>

    )
}

export default page;