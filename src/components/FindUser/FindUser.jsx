"use client"
import { useEffect, useState } from "react"

export const FindUser = () =>{
    const [users, setUSer] = useState([]);

    useEffect(() =>{
        setUSer([
            {
                nome : "Heloísa",
            },
            {
                nome : "Maria"
            }
        ])
    }, [])
    
    return(
        <div>
            {
                // users && users.map(u => (
                // ))
            }

        </div>
    )
}