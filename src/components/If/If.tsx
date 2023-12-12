import { trace } from "console"
import { ReactElement, ReactNode, isValidElement } from "react"


interface Props{
    condition:Boolean,
    children?: ReactNode[] | ReactNode
}
export const If = ({condition, children}:Props): ReactNode => {
    if (!children ) return <></>
    if(children as ReactNode[] && (children as ReactNode[]).length > 1){
        return condition ? (children as ReactNode[])[0]:(children as ReactElement[])[1]
    }
    return condition && children as ReactNode 
}