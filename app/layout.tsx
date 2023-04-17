import React from "react";
import {Nunito} from "next/font/google";

import './globals.css'
import Navbar from "@/app/components/Navbar/Navbar";
import {ClientOnly, RegisterModal} from "@/app/components";
import ToasterProvider from "@/app/providers/ToasterProvider";

export const metadata = {
    title: 'Airbnb',
    description: 'Airbnb Clone',
}

const font = Nunito({
    subsets: ["latin"]
})

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
        <body className={font.className}>
        <ClientOnly>
            <ToasterProvider/>
            <RegisterModal/>
            <Navbar/>
        </ClientOnly>
        {children}
        </body>
        </html>
    )
}
