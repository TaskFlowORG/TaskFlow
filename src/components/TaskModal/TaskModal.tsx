"use client";

import { useState } from "react";
import { CenterModal } from "../Modal";
import { Comment } from "./index";
import axios from "axios";
import { Message, TaskOrdered } from "@/models";
import { User } from "@/models/user/user/User";
import { taskService } from "@/services";
import { Message } from "@/models/chat/message/Message";

type isOpenBro = {
  isOpen: boolean;
  setIsOpen: (boolean: boolean) => void;
  task: TaskOrdered;
  user: User;
};

export const TaskModal = ({ setIsOpen, isOpen, task, user }: isOpenBro) => {
  const [input, setInput] = useState("");
  // const [url, setUrl] = useState("");
  // async function findImage() {
  //   let bah = await (await axios.get("http://localhost:9999/aws/1")).data;
  //   setUrl(bah);
  // }

  async function sendComment() {
    let comment: Message = {
      sender: user,
      value: input,
    };
    task.task.comments.push(comment);
    await taskService.upDate(task.task);
    setInput("");
  }
  return (
    <CenterModal
      stylesTailwind={"w-[1306px] shadow-blur-10 p-12"}
      condition={isOpen}
      setCondition={setIsOpen}
    >
      <div className="flex gap-[102px]  w-full h-full">
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
              <div className="flex flex-col gap-6 max-h-[442px] overflow-auto pr-8 bah">
                {task?.task.comments.map((comment, index) => {
                  return (
                    <Comment
                      user={user}
                      sender={comment.sender}
                      value={comment.value}
                      date={comment.dateCreate!.toString()}
                      key={index}
                    ></Comment>
                  );
                })}
              </div>
              <div className="flex gap-6">
                <input
                  type="text"
                  value={input}
                  className="text-[14px] border-[#d7d7d7] border-[1px] shadow-comment bg-[#f2f2f2] flex-1 font-montserrat px-3 py-[10px] rounded-lg"
                  placeholder="Escreva o comentário"
                  onChange={(e) => setInput(e.target.value)}
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
        <div className=" w-[2px] min-h-full bg-[#F2F2F2]"></div>
        <div className="w-full max-w-[547px]">
          <div className="flex flex-col gap-5 max-h-[450px] overflow-auto bah bg-black w-full">
            {task?.task.properties.map((prop) => {
              return (
                <div key={prop.id} className="bg-white flex flex-col">
                  {JSON.stringify(prop.property.name)}
                  <div className="flex gap-8 w-full">
                    <span>C</span>
                    <div className="flex-1 flex justify-between bg-purple-400">
                      <div className="flex gap-8">
                        <span>I</span>
                        <p className="font-montserrat text-[16px]">
                          {prop.property.name}
                        </p>
                      </div>
                      <div className="bg-red-600 flex-1 flex justify-end">
                        a
                      </div>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      <button onClick={() => setIsOpen(false)}>X</button>
    </CenterModal>
  );
};
