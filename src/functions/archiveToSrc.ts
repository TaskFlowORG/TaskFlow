import { Archive } from "@/models";

export function archiveToSrc(a: Archive):string {
    return `data:image/png;base64,${btoa(String.fromCharCode.apply(null, a.data))}`
}