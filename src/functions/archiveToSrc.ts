import { Archive } from "@/models";

export function archiveToSrc(a: Archive):string {
    try{
        return `data:image/png;base64,${btoa(String.fromCharCode.apply(null, a.data))}`
    }catch(e){
        return ""
    }
}