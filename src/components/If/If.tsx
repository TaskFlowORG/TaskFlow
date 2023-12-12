import { ReactElement, ReactNode } from "react"


interface Props{
    condition:Boolean,
    children?: ReactElement[]
}
export const If = ({condition, children}:Props): ReactElement => {
    if (!children ) return <></>
    if(children.length > 1){
        return condition ? children[0]:children[1]
    }
    return condition && children[0]
}