import React from 'react'
import { unstable_noStore as noStore } from 'next/cache';
import CabinCard from "@/app/_components/CabinCard";
import { getCabins } from '@/app/_lib/data-service';

export default async function CabinList({
    filter
}) {

    // noStore()

    const cabins = await getCabins()

    let displayedCabins

    if (filter === 'all') {
        displayedCabins = cabins
    }
    else if (filter === 'small') {
        displayedCabins = cabins.filter(
            cabin => cabin.max_capacity <= 3
        )
    }
    else if (filter === 'medium') {
        displayedCabins = cabins.filter(
            cabin => cabin.max_capacity >= 3 && cabins.max_capacity <= 6
        )
    }
    else if (filter === 'large') {
        displayedCabins = cabins.filter(
            cabin => cabin.max_capacity >= 6 && cabin.max_capacity <= 9
        )
    }
    else if (filter === 'very-large') {
        displayedCabins = cabins.filter(
            cabin => cabin.max_capacity >=9 && cabin.max_capacity <= 12
        )
    }
    else if (filter === 'very-very-large') {
        displayedCabins = cabins.filter(
            cabin => cabin.max_capacity >= 12
        )
    }

    if (!displayedCabins.length) return null
    return (
        <div 
            className="
                grid 
                sm:grid-cols-1 
                md:grid-cols-2 
                gap-8 lg:gap-12 
                xl:gap-14">
            {displayedCabins.map((cabin) => (
            <CabinCard cabin={cabin} key={cabin.id} />
            ))}
        </div>
    )
}
