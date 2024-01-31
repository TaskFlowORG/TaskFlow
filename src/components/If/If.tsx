import { trace } from "console"
import { ReactElement, ReactNode, isValidElement } from "react"


interface Props{
    condition:boolean,
    children?: ReactElement[] | ReactElement | Element[]
}
export const If = ({condition, children}:Props): ReactElement => {
    if (!children ) return <></>
    if(children as ReactElement[] && (children as ReactElement[]).length > 1){
        return condition ? (children as ReactElement[])[0]:(children as ReactElement[])[1]
    }
    return condition ? children as ReactElement : <></>
}