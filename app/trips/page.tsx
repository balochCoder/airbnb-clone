import React from 'react';
import EmptyState from "@/app/components/EmptyState";
import {ClientOnly} from "@/app/components";

import getCurrentUser from "@/app/actions/getCurrentUser";
import getReservations from "@/app/actions/getReservations";
import TripsClient from "@/app/trips/TripsClient";



const TripsPage = async () => {
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
        userId:currentUser.id
    });

    if (reservations.length === 0){
        return (
            <ClientOnly>
                <EmptyState
                    title="No trips found"
                    subtitle="Look like you haven't reserved any trips"
                />
            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <TripsClient
                reservations={reservations}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
};

export default TripsPage;