import "./global.css";


import Navbar from '@/components/CustomComponents/Navbar';





export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (

    <main>
      <Navbar />
      {children}

    </main>


  );
}
