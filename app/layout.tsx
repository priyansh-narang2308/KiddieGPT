import type { Metadata } from "next";
import { Nunito } from "next/font/google";
import "./globals.css";
import { ClerkProvider } from "@clerk/nextjs";
import Header from "./_components/header";
import { ToastContainer } from "react-toastify";
import Provider from "./provider";
import { Toaster } from "sonner";

const nunito = Nunito({
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "KiddieGPT",
  description: "An AI-Kids Story Generator",
  icons: {
    icon: "/wand.png",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider>
      <html lang="en" suppressHydrationWarning>
        <body className={nunito.className} suppressHydrationWarning={true}>
          <Provider>{children}</Provider>
          <ToastContainer
            position="top-right"
            autoClose={5000}
            hideProgressBar={false}
            newestOnTop={false}
            closeOnClick={false}
            rtl={false}
            pauseOnFocusLoss
            draggable
            pauseOnHover
            theme="dark"
          />
          <Toaster richColors position="top-center" />

          <Header />
        </body>
      </html>
    </ClerkProvider>
  );
}
