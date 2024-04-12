import { Archive } from "@/models";

export function archiveToSrc(a?: Archive):string {
    try{
        const src = `data:${"imagem/jpeg"};base64,${a?.data.toString()}`
        return src
    }catch(e){
        return "/Assets/noImage.png"
    }
}