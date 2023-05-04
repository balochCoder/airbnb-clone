'use client'
import React, {useCallback, useState} from 'react';
import {SafeListing, SafeUser} from "@/app/types";
import {Container} from "@/app/components";
import Heading from "@/app/components/Heading";
import {useRouter} from "next/navigation";
import axios from "axios";
import toast from "react-hot-toast";
import Listing from "@/app/components/Listings/Listing";

interface PropertiesClientProps {
    listings: SafeListing[];
    currentUser?: SafeUser
}

const PropertiesClient: React.FC<PropertiesClientProps> = ({listings, currentUser}) => {
    const router = useRouter();

    const [deletingId, setDeletingId] = useState('');

    const onCancel = useCallback((id: string) => {
        setDeletingId(id);

        axios.delete(`/api/listings/${id}`)
            .then(() => {
                toast.success('Listing Deleted')
                router.refresh()
            })
            .catch((error) => {
                toast.error(error?.response?.data?.error)
            })
            .finally(() => {
                setDeletingId('')
            })
    }, [router]);
    return (
        <Container>
            <Heading title="Properties" subtitle="List of your properites"/>
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
                    listings.map((listing)=>(
                        <Listing
                            key={listing.id}
                            data={listing}
                            actionId={listing.id}
                            onAction={onCancel}
                            disabled={deletingId === listing.id}
                            actionLabel="Delete property"
                            currentUser={currentUser}
                        />
                    ))
                }
            </div>
        </Container>
    );
};

export default PropertiesClient;