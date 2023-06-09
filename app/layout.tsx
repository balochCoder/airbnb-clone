import React from "react";
import {Nunito} from "next/font/google";

import './globals.css'
import Navbar from "@/app/components/Navbar/Navbar";
import {ClientOnly, RegisterModal} from "@/app/components";
import ToasterProvider from "@/app/providers/ToasterProvider";
import LoginModal from "@/app/components/Modals/LoginModal";
import getCurrentUser from "@/app/actions/getCurrentUser";
import RentModal from "@/app/components/Modals/RentModal";
import SearchModal from "@/app/components/Modals/SearchModal";

export const metadata = {
    title: 'Airbnb',
    description: 'Airbnb Clone',
}

const font = Nunito({
    subsets: ["latin"]
})

export default async function RootLayout({
                                             children,
                                         }: {
    children: React.ReactNode
}) {
    const currentUser = await getCurrentUser();
    return (
        <html lang="en">
        <body className={font.className}>
        <ClientOnly>
            <ToasterProvider/>
            <RentModal/>
            <SearchModal/>
            <RegisterModal/>
            <LoginModal/>

            <Navbar currentUser={currentUser}/>
        </ClientOnly>
       <div
       className="pb-20 pt-28"
       > {children}</div>
        </body>
        </html>
    )
}
