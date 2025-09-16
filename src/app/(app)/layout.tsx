import "./global.css";


// import Navbar from '@/components/CustomComponents/Navbar';



import { SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar"
import { AppSidebar } from "@/components/ui/app-sidebar";



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
        <SidebarTrigger />
        {children}
          </SidebarProvider>

      </main>


  );
}
