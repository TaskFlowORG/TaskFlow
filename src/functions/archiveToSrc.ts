import { Archive } from "@/models";

export function archiveToSrc(a?: Archive):string {
    if(!a) return "/Assets/noImage.png"
    if(!a.data) return "/Assets/noImage.png"
    try{
        const src = `data:${a.type};base64,${a?.data.toString()}`
        return src
    }catch(e){
        return "/Assets/noImage.png"
    }
}