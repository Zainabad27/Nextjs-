"use client"
import { ChevronUp, Home, Inbox, Settings, User2 } from "lucide-react";
import Link from "next/link"

import { signOut } from "next-auth/react";
import {
    Sidebar,
    SidebarContent,
    SidebarGroup,
    SidebarGroupContent,
    SidebarGroupLabel,
    SidebarMenu,
    SidebarMenuButton,
    SidebarMenuItem,
    SidebarFooter
} from "@/components/ui/sidebar"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@radix-ui/react-dropdown-menu";

// Menu items.
const items = [
    {
        title: "Home",
        url: "/",
        icon: Home,
    },
    {
        title: "Dashboard",
        url: "/dashboard",
        icon: Inbox,
    },

   
]

export function AppSidebar() {
    return (
        <Sidebar>
            <SidebarContent>
                <SidebarGroup>
                    <SidebarGroupLabel>Mystery Message</SidebarGroupLabel>
                    <SidebarGroupContent>
                        <SidebarMenu>
                            {items.map((item) => (
                                <SidebarMenuItem key={item.title}>
                                    <SidebarMenuButton asChild>
                                        <Link href={item.url}>
                                            <item.icon />
                                            <span>{item.title}</span>
                                        </Link>
                                    </SidebarMenuButton>
                                </SidebarMenuItem>
                            ))}



                        </SidebarMenu>
                    </SidebarGroupContent>
                </SidebarGroup>
            </SidebarContent>
            <SidebarFooter>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton>
                            <Settings /> Settings


                            <ChevronUp className="ml-auto" />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <div className=" hover:border-gray-400 border">
                        <DropdownMenuContent
                        side="top"
                        className="w-[--radix-popper-anchor-width]"
                    >
                        <div className="pl-8">
                            <DropdownMenuItem>
                                <button className="cursor-pointer w-full rounded px-3 py-1 hover:border-gray-400">
                                    <Link href={"/account"}>Account</Link>
                                </button>
                            </DropdownMenuItem>
                            <DropdownMenuItem>
                                <button onClick={() => signOut()} className="cursor-pointer w-full rounded px-3 py-1 hover:border-gray-400">
                                    Sign out
                                </button>
                            </DropdownMenuItem>
                        </div>


                    </DropdownMenuContent>
                    </div>
                </DropdownMenu>
            </SidebarFooter>
        </Sidebar>
    )
}