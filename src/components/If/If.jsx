export const If = ({condition, children})=>{
    if(children.length > 1){
        return condition ? children[0]:children[1]
    }
    return condition && children
}