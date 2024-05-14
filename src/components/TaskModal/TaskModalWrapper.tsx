import { ReactComponentElement, ReactNode } from "react"
type Props = {
  children:ReactNode
}
export const TaskModalWrapper = ({children}:Props) => {
  return (
    <div className="w-full 400:w-full px-8 400:px-0   pt-10   h-[85%]   lg:h-min">
      {children}
    </div>
  )
}