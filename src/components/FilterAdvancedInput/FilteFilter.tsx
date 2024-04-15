import { useState } from "react";

interface Props {
  id: number;
  name: string;
  value: string[];
  isInModal?: boolean;
}

export const FileFilter = ({}: Props) => {
  const [file, setFile] = useState<File | null>(null);

  const handleFileChange = (event: any) => {
    // Obtém o arquivo do evento
    const selectedFile = event.target.files[0];

    // Atualiza o estado com o arquivo selecionado
    setFile(selectedFile);
  };

  return (
    <div className="flex items-center justify-end gap-8  pr-1 w-full">
      {file && (
        <>
          <div className="flex gap-2">
            <span>i</span>
            <p>{file && file.name}</p>
          </div>
          <button className="py-1 truncate px-2 bg-primary dark:bg-secondary rounded-lg relative  text-white">
            0
            <input
              onChange={handleFileChange}
              type="file"
              className="opacity-0 w-8 absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
            />
          </button>
        </>
      )}

      {!file && (
        <button className="py-1 truncate  flex  px-2 bg-primary dark:bg-secondary rounded-lg relative  text-white">
          Browse files
          <input
            onChange={handleFileChange}
            type="file"
            className="opacity-0 w-full absolute top-1/2 left-1/2 -translate-y-1/2 -translate-x-1/2"
          />
        </button>
      )}
    </div>
  );
};
