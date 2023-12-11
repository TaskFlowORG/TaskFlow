import React from "react";

export default function Loading() {
    return (
        <html>

        <body className=" items-center justify-center  bg-white flex h-screen w-screen">
            <video loop width={200} className=" animate-pulse" autoPlay muted>
                <source src="Assets/WhiteLoad.mp4" type="video/mp4" />
            </video>
        </body>
        </html>
    )


}