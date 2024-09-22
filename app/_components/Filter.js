"use client"

import { usePathname, useSearchParams, useRouter } from 'next/navigation'

import React from 'react'



export default function Filter
() {
    console.log("Filter Section Log")
    const searchParams =  useSearchParams()
    const router = useRouter()
    const pathname = usePathname()

    const activeFilter = searchParams.get('capacity') ?? "all"

    console.log(`useSearhParams ${useSearchParams()}`)
    console.log(`pathname ${pathname}`)

    function handleFilter(filter) {
        const params = new URLSearchParams(searchParams)

        params.set("capacity", filter)
        router.replace(`${pathname}?${params.toString()}`, {scroll: false})
    }

  return (
    <div
        className={`
            border-primary-800  flex
        `}
    >
    
 
    <ButtonFilter
            filter={"all"}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
        >
             All Cabin
        </ButtonFilter>

        <ButtonFilter
            filter={"small"}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
        >
             1&mdash;3 Guest
        </ButtonFilter>
        <ButtonFilter
            filter={"medium"}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
        >
             3&mdash;6 Guest
        </ButtonFilter>
        <ButtonFilter
            filter={"large"}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
        >
             6&mdash;9 Guest
        </ButtonFilter>
        <ButtonFilter
            filter={"very-large"}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
        >
             9&mdash;12 Guest
        </ButtonFilter>
        <ButtonFilter
            filter={"very-very-large"}
            handleFilter={handleFilter}
            activeFilter={activeFilter}
        >
             more than 12 Guest
        </ButtonFilter>

    </div>
  )
}


function ButtonFilter({
    filter, handleFilter, activeFilter, children    
}) {
   return (
    <button className={`
    px-5 py-2 hover:bg-primary-700 ${filter === activeFilter ? 
        'bg-primary-700 text-primary-50' : '' }
    `}
    onClick={() => handleFilter(filter)}
    >
        {children}
    </button>
   )
}


