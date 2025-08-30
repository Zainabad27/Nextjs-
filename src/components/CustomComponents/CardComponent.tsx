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

interface CardProp {
  message: message;
  handleDeletion: (_id: string) => void;

}


const CardComponent = ({ message, handleDeletion }: CardProp) => {


  const deleteMessage = async () => {

    try {

      const res = await axios.delete(`/api/delete-message?id=${message.id}`);


      handleDeletion(message.id);


      toast("Message Delete successfully.")
    } catch (error: unknown) {
      if (axios.isAxiosError(error)) {
        const axiosError = error as AxiosError<{ message: string }>

        toast(axiosError.response?.data.message) || toast("some server Error occured,Can't delete Message Rightnow")


      }
      else {
        console.log("some error occured during the submition of form.", error)
        toast("Message Delete unsuccessfully.")


      }

    }
  }

  return (
    <>
      <Card className="w-full max-w-sm">
        <CardHeader>
          <CardTitle>Message</CardTitle>
          <div >
            <AlertDialog>
              <AlertDialogTrigger asChild>
                <Button variant="destructive"><X className="w-3 h-3" /></Button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>Are you absolutely sure?</AlertDialogTitle>
                  <AlertDialogDescription>
                    This action cannot be undone. This will permanently delete your
                    account and remove your data from our servers.
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel>Cancel</AlertDialogCancel>
                  <AlertDialogAction onClick={deleteMessage}>Continue</AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>

          </div>
        </CardHeader>
        <CardContent>
          <p>
            {message.content}
          </p>
        </CardContent>

      </Card>

    </>
  );
};

export default CardComponent;
