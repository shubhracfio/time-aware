import { Inter } from "next/font/google";
import "./globals.css";
// import Sidebar from "@/components/Sidebar/SidebarSSR";
import {Container} from '@mui/joy';
import NavbarSSR from  "@/components/Navbar/NavbarSSR";


const inter = Inter({ subsets: ["latin"] });

export const metadata = {
  title: "Time Aware",
  description: "Being time aware",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={inter.className}>
        <NavbarSSR />
        <Container maxWidth="xl" sx={{my:2, mt: 8}}>
          {children}
        </Container>
      </body>
    </html>
  );
}
