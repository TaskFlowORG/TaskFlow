"use client";

import { useState } from "react";

export const SVGInitialPage = () => {
  const [primary, setPrimary] = useState("#EF4996");
  const [secondary, setSecondary] = useState("#FE7A08");
  return (
      <svg xmlns="http://www.w3.org/2000/svg" width="1584" height="930" viewBox="0 0 1584 930" fill="none" className='fixed z-[-1] w-min h-screen top-0 right-0'>
        <path d="M1583.5 -5.00019L890.499 -5.00019L830.805 12.0632C629.962 69.4743 482.252 240.474 454.648 447.53C413.562 651.09 272.802 820.313 80.128 897.782L-1.21524e-05 930L1133 930L1149.87 886.379C1173.95 824.132 1220.82 773.388 1280.97 744.464C1338.45 716.82 1383.91 669.197 1408.85 610.489L1475.71 453.098C1494.52 408.812 1508.82 362.743 1518.4 315.589L1583.5 -5.00019Z" fill="url(#paint0_linear_1020_10332)" />
        <defs>
          <linearGradient id="paint0_linear_1020_10332" x1="1712.67" y1="174.261" x2="-583.686" y2="-14.391" gradientUnits="userSpaceOnUse">
            <stop offset="0.0208333" stopColor={primary} />
            <stop offset="0.304639" stopColor="#F04FB0" />
            <stop offset="0.947917" stopColor={secondary} />
          </linearGradient>
        </defs>
      </svg>
      )
}