"use client"
import {
  Card,
  CardAction,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card"

import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

import { toast } from "sonner"


import axios, { AxiosError } from "axios"

import { Button } from "@/components/ui/button"
import { message } from "../../models/user.model"
import { X } from "lucide-react"
import { useState } from "react"

interface CardProp {
  message: message;
  handleDeletion: (_id: string) => void;

}


const CardComponent = ({ message, handleDeletion }: CardProp) => {
  const [isHovered, setIsHovered] = useState(false);


  const deleteMessage = async () => {

    try {
      //@ts-ignore
      handleDeletion(message._id);



      const res = await axios.delete(`/api/delete-message?id=${message._id}`);


      toast("Message Delete successfully.")
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>

        toast(axiosError.response?.data.message || "some server Error occured,Can't delete Message Rightnow")


      }
      else {
        console.log("some error occured during the submition of form.", error)
        toast("Message Delete unsuccessfully.")


      }

    }
  }

  return (

    <>
      <Card className="w-full max-w-sm shadow-md rounded-xl">
        <CardHeader className="flex flex-row items-center justify-between space-y-0">
          <CardTitle className="text-2xl font-bold">Message</CardTitle>
          <AlertDialog>
            <AlertDialogTrigger asChild>
              <Button
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
                variant={isHovered ? `destructive` : `default`}
                size="icon"
                className="h-8 w-8 rounded-full cursor-pointer"
              >
                <X className="h-4 w-4 cursor-pointer" />
              </Button>
            </AlertDialogTrigger>
            <AlertDialogContent>
              <AlertDialogHeader>
                <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                <AlertDialogDescription>
                  This action cannot be undone. This will permanently delete your
                  message and remove the data from our servers.
                </AlertDialogDescription>
              </AlertDialogHeader>
              <AlertDialogFooter>
                <AlertDialogCancel className="cursor-pointer">Cancel</AlertDialogCancel>
                <AlertDialogAction className="cursor-pointer  " onClick={deleteMessage}>
                  Continue
                </AlertDialogAction>
              </AlertDialogFooter>
            </AlertDialogContent>
          </AlertDialog>
        </CardHeader>

        <CardContent>
          <p className="text-base text-gray-800">{message.content}</p>
        </CardContent>
      </Card>
    </>



  );
};

export default CardComponent;
