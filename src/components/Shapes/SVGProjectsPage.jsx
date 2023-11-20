"use client";

import { useState } from "react";

export const SVGProjectsPage = () => {
    const [primary, setPrimary] = useState("#EF4996");
    const [secondary, setSecondary] = useState("#FE7A08");
    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="1094" height="928" viewBox="0 0 1094 928" fill="none" className='fixed z-[-1] w-min h-screen top-0 right-0'>
            <path d="M1094 0H0.757812L92.9545 143.177C128.03 197.648 135.036 265.579 111.816 326.062C82.2259 403.138 102.2 490.455 162.356 547.002L242.305 622.154L291.693 676.226C354.66 745.164 366.087 846.802 320 928H1094V0Z" fill="url(#paint0_linear_1020_10304)" />
            <defs>
                <linearGradient id="paint0_linear_1020_10304" x1="1013.91" y1="28.9999" x2="1.08041" y2="1427.39" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0208333" stopColor={primary} />
                    <stop offset="0.304639" stopColor="#F04FB0" />
                    <stop offset="0.947917" stopColor={secondary} />
                </linearGradient>
            </defs>
        </svg>
    )
}