import "./global.css";


import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/CustomComponents/app-sidebar";



export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    
    <main>
        {/* <Navbar /> */}
         <SidebarProvider>
        <AppSidebar />
        <SidebarTrigger className="cursor-pointer" />
        {children}
          </SidebarProvider>

      </main>


  );
}
