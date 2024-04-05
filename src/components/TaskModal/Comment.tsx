import { User } from "@/models";
import { OtherUser } from "@/models/user/user/OtherUser";
import { User } from "@/models/user/user/User";
import { twMerge } from "tailwind-merge";

type CommentType = {
  sender: OtherUser;
  value: string;
  date: string;
  user: User;
};

export const Comment = ({ value, sender, date, user }: CommentType) => {
  const containerComment = twMerge(
    "flex flex-col gap-1",
    sender.username == user?.username ? "items-end" : ""
  );
  const comment = twMerge(
    "font-montserrat text-[16px]  text-[#343434]",
    sender.username == user.username ? "text-end" : ""
  );
  function formatarHorario(data: string): string {
    // Convertendo a string de data para o tipo Date
    const dataObj = new Date(data);

    // Obtendo as partes da hora
    const horas = pad(dataObj.getHours());
    const minutos = pad(dataObj.getMinutes());

    // Concatenando as partes da hora em uma string
    const horarioFormatado = `${horas}:${minutos}`;

    return horarioFormatado;
  }

  // Função auxiliar para adicionar um zero à esquerda se for necessário
  function pad(n: number): string {
    return n < 10 ? "0" + n : n.toString();
  }

  return (
    <div className={containerComment}>
      <p className={comment}>{value}</p>
      <div className="h-[2px] w-1/2 bg-[#D9D9D9]"></div>
      <div className="gap-2 flex items-center">
        {!(user.username == sender.username) && (
          <div className="h-[18px] aspect-square rounded-full bg-primary"></div>
        )}

        <p className="text-[12px] font-montserrat text-[#343434]">
          {!(user.username == sender.username) ? sender?.username : "Você"} -{" "}
          {formatarHorario(date)}
        </p>
      </div>
    </div>
  );
};
