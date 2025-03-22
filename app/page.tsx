'use client'
import { useEffect, useState } from "react";
import OpenPage from "@/components/start/Open";
import ClosePage from "@/components/start/Close";

export default function Home() {
  const [isAvailable, setIsAvailable] = useState(false);
 
  useEffect(() => {
    const today = new Date();
    const dayOfWeek = today.getDay();
    if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
      setIsAvailable(true);
    } else {
      setIsAvailable(false);
    }
  }, [])
  
  
  return (
    <>
      {isAvailable? <OpenPage/>: <ClosePage/>}
    </>
  )
}
