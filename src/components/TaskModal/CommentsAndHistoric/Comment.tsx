import { User } from "@/models";
import { OtherUser } from "@/models/user/user/OtherUser";
import { useEffect, useRef, useState } from "react";
import { twMerge } from "tailwind-merge";
import { IconTrashBin } from "@/components/icons/Slidebarprojects/IconTrashBin";
import { IconSave } from "@/components/icons/Slidebarprojects/IconSave";
import { EditIcon } from "@/components/icons/PageOtpions/Edit";
import { IconPlus } from "@/components/icons/GeneralIcons/IconPlus";
import { useTranslation } from "react-i18next";

type CommentType = {
  sender: OtherUser;
  value: string;
  date: string;
  user: User;
  updatedAt?: string;
  commentId: number;
  updateComment: (commentId: number, updatedValue: string) => void;
  deleteComment: (commentId: number) => void;
};

export const Comment = ({
  value,
  sender,
  date,
  user,
  updatedAt,
  commentId,
  updateComment,
  deleteComment,
}: CommentType) => {
  const [options, setOptions] = useState(false);
  const [editing, setEditing] = useState(false);
  const [deleting, setDeleting] = useState(false);
  const [commentUpdate, setCommentUpdate] = useState("");
  const commentRef = useRef<any>(null);

  const { t } = useTranslation();
  const containerComment = twMerge(
    "flex flex-col gap-1 relative",
    sender.username == user?.username ? "items-end" : ""
  );
  const comment = twMerge(
    "font-montserrat focus:font-semibold self-center text-[16px]  outline-none text-[#343434] dark:text-[#f2f2f2]",
    sender.username == user.username ? "text-end" : ""
  );

  useEffect(() => {
    setCommentUpdate(value);
  }, []);

  useEffect(() => {
    if (editing) {
      commentRef.current?.focus();
    }
  }, [editing]);

  const dateFormat = (date: Date) => {
    const dia = String(date.getDate()).padStart(2, "0");
    const mes = String(date.getMonth() + 1).padStart(2, "0");
    const ano = date.getFullYear();
    return `${dia}/${mes}/${ano} - ${date.getHours()}:${date.getMinutes()}`;
  };

  return (
    <div
      onMouseOver={() =>
        user.username == sender.username && setOptions(!editing && !deleting)
      }
      onMouseLeave={() => setOptions(false)}
      className={containerComment}
    >
      <div className="flex gap-4">
        <p
          ref={commentRef}
          className={comment}
          contentEditable={editing}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              updateComment(commentId, commentRef.current.innerText);
              setEditing(false);
            }
          }}
          onChange={(e: any) => setCommentUpdate(commentRef.current.innerText)}
        >
          {commentUpdate}
        </p>
        {options && !editing && (
          <div className="flex  items-center gap-1 ">
            <div
              className="w-3 aspect-square stroke-black dark:stroke-white"
              onClick={() => {
                commentRef?.current?.focus();

                setEditing(true);
              }}
            >
              <EditIcon></EditIcon>
            </div>
            <div
              className="stroke-primary dark:stroke-secondary w-3 aspect-square"
              onClick={() => {
                setDeleting(true);
                setOptions(false);
                commentRef.current.innerText = t("delete-comment");
              }}
            >
              <IconTrashBin></IconTrashBin>
            </div>
          </div>
        )}
        {(editing || deleting) && (
          <div className="flex items-center gap-1">
            <div
              className="w-4 aspect-square"
              onClick={() => {
                setOptions(false);
                commentRef.current.innerText = value;
                setEditing(false);
                setDeleting(false);
              }}
            >
              <IconPlus></IconPlus>
            </div>
            <div
              className="w-3 aspect-square"
              onClick={() => {
                if (editing) {
                  updateComment(commentId, commentRef.current.innerText);
                } else {
                  deleteComment(commentId);
                }
                setEditing(false);
              }}
            >
              <IconSave></IconSave>
            </div>
          </div>
        )}
      </div>
      <div className="h-[2px] w-1/2 bg-[#D9D9D9]"></div>
      <div className="gap-2  flex items-center">
        {!(user.username == sender.username) && (
          <div className="h-[18px] aspect-square rounded-full bg-primary"></div>
        )}

        <p className="text-[12px] font-montserrat text-[#343434] dark:text-[#f2f2f2]">
          {updatedAt && t("edited") + " - "}
          {!(user.username == sender.username)
            ? sender?.username
            : t("you")} - {dateFormat(new Date(date))}
        </p>
      </div>
    </div>
  );
};
