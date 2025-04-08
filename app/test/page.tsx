'use client'

import { createRoom } from "@/apiHandler/room"
import matching from "@/utils/matching"
import { useEffect } from "react"

export default function Page() {
    useEffect(() => {
        matching();    
    },[])
    return <a target="_blank" href="http://localhost:3000/match/cancel/match" > tq</a>
}