import React from 'react';
import {ClientOnly} from "@/app/components";
import EmptyState from "@/app/components/EmptyState";
import getFavorites from "@/app/actions/getFavorites";
import getCurrentUser from "@/app/actions/getCurrentUser";
import FavoritesClient from "@/app/favorites/FavoritesClient";
const FavoritesPage = async () => {
    const favorites = await getFavorites();
    const currentUser = await getCurrentUser();

    if (favorites.length === 0) {
        return (
            <ClientOnly>
                <EmptyState title="No favorites found" subtitle="Looks like you have no favorite listings"/>

            </ClientOnly>
        );
    }

    return (
        <ClientOnly>
            <FavoritesClient
                favorites={favorites}
                currentUser={currentUser}
            />
        </ClientOnly>
    )
};

export default FavoritesPage;