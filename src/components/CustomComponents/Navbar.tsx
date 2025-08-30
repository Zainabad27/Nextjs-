"use client"
import { useSession } from "next-auth/react";
import { User } from "next-auth";
import { signOut } from "next-auth/react";
import { useState } from "react";

import { useRouter } from "next/navigation"

import { Button } from "@/components/ui/button"




const Navbar = () => {
	const router = useRouter()

	const { data: session, status } = useSession();


	const [LoggedIn, setLoggedIn] = useState(false);
	setLoggedIn(status === "authenticated")

	const handleSignIn = () => {
		router.replace("/sign-in");
	}

	return (
		<nav className="p-4 md:p-6 shadow-md">
			<div className="container mx-auto flex flex-col md:flex-row justify-between items-center">

				<div className="flex flex-wrap items-center gap-2 md:flex-row">
					<Button className="w-full md:w-auto">
						{LoggedIn ?
							(
								<div className="w-full md:w-auto" onClick={() => signOut()}>
									Logout
								</div>
							) :
							(

								<div className="w-full md:w-auto" onClick={handleSignIn}>Login</div>

							)}
					</Button>
				</div>
			</div>

		</nav>
	);
};

export default Navbar;
