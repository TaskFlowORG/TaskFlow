
import './globals.css'



export const metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen">
        <div className='bg-yellow-600 h-20'></div>
        {children}
        </body>
    </html>
  )
}
