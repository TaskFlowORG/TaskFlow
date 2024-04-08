import { Archive } from "@/models";

export function archiveToSrc(a?: Archive):string {
    console.log(a)
    try{
        const src = `data:${"imagem/jpeg"};base64,${a?.data.toString()}`
        return src
    }catch(e){
        return ""
    }
}