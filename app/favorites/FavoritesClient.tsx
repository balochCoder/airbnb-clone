'use client'
import React from 'react';
import {SafeListing, SafeUser} from "@/app/types";
import {Container} from "@/app/components";
import Heading from "@/app/components/Heading";
import Listing from "@/app/components/Listings/Listing";
interface FavoritesClientProps {
    favorites: SafeListing[];
    currentUser?: SafeUser | null
}
const FavoritesClient: React.FC<FavoritesClientProps> = ({favorites,currentUser}) => {
    return (
        <Container>
            <Heading title="Favorites" subtitle="List all places you have favorited!"/>
            <div className="
            mt-10
            grid
            grid-cols-1
            sm:grid-cols-2
            md:grid-cols-3
            lg:grid-cols-4
            xl:grid-cols-5
            2xl:grid-cols-6
            gap-8
            ">
                {
                    favorites.map((favorite)=>(
                        <Listing
                            key={favorite.id}
                            data={favorite}
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    );
};

export default FavoritesClient;