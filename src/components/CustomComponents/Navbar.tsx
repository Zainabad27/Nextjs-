"use client"
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"
import { Images } from "@/constants/imagesLink";



const Navbar = () => {
	const router = useRouter()

	const { data: session, status } = useSession();


	const LoggedIn = (status === "authenticated")


	const handleSignIn = () => {
		router.replace("/sign-in");
	}

	return (
		<nav className="p-4 mb-2 md:p-6 shadow-md">
			<div className="container mx-auto flex justify-between items-center">

				{/* Left side content (e.g., logo) */}
				<img src={Images.MysteryMessageLogo} alt="Logo" className="h-12 w-auto mr-4" />
				<div className="text-xl font-bold">Mystery Message</div>

				{/* Right side login/logout */}
				<div className="ml-auto">
					<Button className="cursor-pointer">
						{LoggedIn ? (
							<div onClick={() => signOut()}>Logout</div>
						) : (
							<div onClick={handleSignIn}>Login</div>
						)}
					</Button>
				</div>

			</div>
		</nav>

	);
};

export default Navbar;
