
import '../globals.css'

export default function RootLayout({ children }) {

  const theme = "light"
  return (
    <>
      <div className="p-12 py-8 pb-0 flex justify-between w-full items-center">
        <img src="Icon.svg" alt="" />
        <div className="flex gap-6">
          <img src="moon.svg" alt="" />
          <img src="language.svg" alt="" />
        </div>
      </div>
      {children}
    </>
  )
}
