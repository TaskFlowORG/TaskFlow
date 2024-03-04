import { trace } from "console"
import { ReactElement, ReactNode, isValidElement } from "react"


interface Props extends React.PropsWithChildren<any> {
    condition:boolean
}
export const If = ({condition, children}:Props): ReactElement => {
    if (!children ) return <></>
    if(children.length > 1){
        return condition ? children[0] : children[1]
    }
    return condition ? children as ReactElement : <></>
}