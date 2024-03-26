"use client";

import { useState } from "react";
import { CenterModal } from "../Modal";
import { Comment } from "./index";
import axios from "axios";
import { Message, TaskOrdered } from "@/models";
import { UserGet } from "@/models/user/user/UserGetDTO";
import { taskService } from "@/services";
import { MessageGet } from "@/models/chat/message/MessageGetDTO";

type isOpenBro = {
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
  task: TaskOrdered;
  user: UserGet;
};

export const TaskModal = ({ setIsOpen, isOpen, task, user }: isOpenBro) => {
  const [input, setInput] = useState("")
  // const [url, setUrl] = useState("");
  // async function findImage() {
  //   let bah = await (await axios.get("http://localhost:9999/aws/1")).data;
  //   setUrl(bah);
  // }

  async function sendComment() {
    let comment:Partial<MessageGet> = {
      sender:user,
      value:input,
    }
    // task.task.comments.push(comment)

    await taskService.upDate(task.task);
  }
  return (
    <CenterModal
      stylesTailwind={"w-[800px] shadow-blur-10 p-12"}
      condition={isOpen}
      setCondition={setIsOpen}
    >
      <div className="flex justify-between w-full h-full">
        <div className="flex flex-col gap-12 w-[453px]">
          <h3 className="h3 whitespace-nowrap">
            {task?.task.name ?? "Sem nome"}
          </h3>
          <div className="flex flex-col w-full gap-6">
            <div className="flex gap-0 w-full">
              <button className="w-full  flex items-center gap-4  px-4 py-1 bg-primary rounded-t-lg">
                <div className="w-4 h-4 rounded-full bg-white"></div>
                <p className="h4 text-white ">Comentários</p>
              </button>
              <button className="w-full flex items-center gap-4 border-2  px-4 py-1 bg-white rounded-r-lg">
                <div className="w-4 h-4 rounded-full bg-white"></div>
                <p className="h4 text-[#343434] ">Histórico</p>
              </button>
            </div>
            <div className=" flex flex-col gap-6">
              {task?.task.comments.map((comment, index) => {
                return (
                  <Comment
                    user={user}
                    sender={comment.sender}
                    value={comment.value}
                    date={comment.dateCreate.toString()}
                    key={index}
                  ></Comment>
                );
              })}
              <div className="flex gap-6">
                <input
                  type="text"
                  className="text-[14px] border-[#d7d7d7] border-[1px] shadow-comment bg-[#f2f2f2] flex-1 font-montserrat px-3 py-[10px] rounded-lg"
                  placeholder="Escreva o comentário"
                  onChange={(e)=> setInput(e.target.value)}
                />
                <div
                  className="h-full items-center flex justify-center aspect-square rounded-lg bg-primary"
                  onClick={sendComment}
                >
                  <img src="/send.svg" alt="" />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      <button onClick={() => setIsOpen(false)}>X</button>
    </CenterModal>
  );
};
