import { Archive } from "@/models";
import { archiveToSrc } from "./archiveToSrc";

export const archiveToDownload = (archive: Archive) => {
  const byteCharacters = archiveToSrc(archive);
  
  return byteCharacters;
  const byteNumbers = new Array(byteCharacters.length);
  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }
  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], {
    type: archive.type,
  });
  
  return window.URL.createObjectURL(blob);
};

// changeUrlOfArchive(response: Message) {
//   if (response.file instanceof Blob) {
//     response.file = this.convertBlobToFile(response.file, response.contentMessage! as string);
//     return window.URL.createObjectURL(response.file);
//   } else {
//     const byteCharacters = atob(response.file.file);
//     const byteNumbers = new Array(byteCharacters.length);
//     for (let i = 0; i < byteCharacters.length; i++) {
//       byteNumbers[i] = byteCharacters.charCodeAt(i);
//     }
//     const byteArray = new Uint8Array(byteNumbers);
//     const blob = new Blob([byteArray], { type: 'application/pdf' });
//     return window.URL.createObjectURL(blob);
//   }
// }
