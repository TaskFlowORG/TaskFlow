"use client";

import { ThemeProvider } from 'next-themes'
import React from 'react';
import { useEffect, useState } from 'react';

export default function Providers({ children } : { children: React.ReactNode}) {

    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        setMounted(true)
    }, [])

    if (!mounted) {
        return <>{children}</>
    }
    return (
        <ThemeProvider defaultTheme='light' attribute='class' >{children}</ThemeProvider>
    )
}