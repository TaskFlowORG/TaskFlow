"use client"

import { useState } from "react";

export const SVGGroupPage = () => {
    const [primary, setPrimary] = useState("#FF973D")
    const [secondary, setSecondary] = useState("#FF973D")

    return (
        <svg xmlns="http://www.w3.org/2000/svg" width="888" height="668" viewBox="0 0 888 668" className="absolute bottom-0" fill="none">
            <path d="M-706.135 373.509C-656.648 133.69 -430.357 -27.2026 -187.589 4.82331L9.26703 30.7925C85.8267 40.8922 155.648 79.8244 204.483 139.645C231.9 173.229 266.2 200.542 305.07 219.743L395.32 264.326C498.473 315.281 566.621 417.382 574.108 532.19C574.108 596.135 609.655 654.779 666.346 684.36L845.896 778.051C888.216 800.134 900.351 855.065 871.273 892.921C859.158 908.693 841.397 919.15 821.728 922.092L753.626 932.278C741.512 934.09 729.28 935 717.032 935H-248.679C-544.6 935 -765.939 663.324 -706.135 373.509Z" fill="url(#paint0_linear_1041_17911)" />
            <defs>
                <linearGradient id="paint0_linear_1041_17911" x1="798.868" y1="-21.1563" x2="-87.465" y2="1819.58" gradientUnits="userSpaceOnUse">
                    <stop offset="0.0208333" stop-color={primary} />
                    <stop offset="0.614583" stop-color="#EF4996" />
                    <stop offset="0.947917" stop-color={secondary} />
                </linearGradient>
            </defs>
        </svg>
    )
}