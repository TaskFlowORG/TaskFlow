export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen w-screen flex flex-col ">
        <div className="bg-zinc-300 h-20"></div>
        {children}
      </body>
    </html>
  )
}
