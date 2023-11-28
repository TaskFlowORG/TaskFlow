

export default function RootLayout({ children }) {

    const theme = "light"
    return (
    <html lang="en">
        <body className="w-screen h-screen bg-white flex flex-col items-center justify-center">
            {children}
        </body>

    </html >

    )
}
