"use client"

import { useTheme } from "next-themes"
import { useState, useEffect } from "react"
import { isNull } from "util"


const ThemeSwitcher = () => {
    const { theme, setTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return null
    }

    return (
        // <div className="dark:bg-black">

        //     <img src="moon.svg" className="dark:hidden" alt="" onClick={() => setTheme("dark")} />
        //     <img src="sun.svg" className="hidden dark:flex" alt="" onClick={() => setTheme("light")} />
        // </div>
        <></>
    )
}

export default ThemeSwitcher