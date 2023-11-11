export default function Layout({ children }) {
  return (
    <html lang="en">
      <body className="h-screen flex flex-col gap-24">
        <div className="bg-zinc-300 h-20"></div>
        {children}
      </body>
    </html>
  )
}
