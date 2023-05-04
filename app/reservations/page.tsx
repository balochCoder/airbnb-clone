
import React from 'react';

import EmptyState from "@/app/components/EmptyState";
import {ClientOnly} from "@/app/components";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import ReservationsClient from "@/app/reservations/ReservationsClient";


const ReservationsPage = async () => {
    const currentUser = await getCurrentUser();

    if (!currentUser) {
        return (
            <ClientOnly>
                <EmptyState
                    title="Unauthorized"
                    subtitle="Please login"
                />
            </ClientOnly>
        );

    }

    const reservations = await getReservations({
        authorId:currentUser.id
    })


    if (reservations.length === 0){
        return (
            <ClientOnly>
                <EmptyState
                    title="No reservations found"
                    subtitle="Look like you have no reservations in your property"
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <ReservationsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )

};

export default ReservationsPage;
