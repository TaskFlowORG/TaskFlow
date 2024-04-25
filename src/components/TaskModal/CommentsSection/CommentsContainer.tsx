import { ReactNode } from "react"

type Props = {
children:ReactNode
}

export const CommentsContainer =  ({children}:Props) => {
  return (
    <div className="flex flex-col gap-12 w-[453px]">
      {children}
      </div>
  )
}