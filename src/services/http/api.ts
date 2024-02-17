import { ChatGetDTO } from "@/model/chat/ChatGetDTO";
import { CommonPage } from "@/model/pages/CommonPage";
import { Page } from "@/model/pages/Page";
import { AxiosResponse } from "axios";


export { getData, getListData, putData, getListChat, getSingleChat, getPage, patchData, postTask, enviarMessage }


const axios = require("axios").default;


async function getData(table: string, paramether: number|string) {
  return (await axios.get("http://localhost:9999/" + table + "/" + paramether)).data;
}

async function getPage(table: string, paramether: number): Promise<CommonPage> {
  return (await axios.get("http://localhost:9999/" + table + "/" + paramether))
    .data;
}

async function getListData(table: string) {
  try {
    const response = await axios.get("http://localhost:9999/" + table);
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getListChat(type: string, userId: number) {
  try {
    const response = await axios.get(
      "http://localhost:9999/chat/" + type + "/" + userId
    );
    const array = [];
    for (let chat of response.data) {
      const id = chat.id;
      const name = chat.name;
      const picture = chat.picture;
      const messages = chat.messages;
      const quantitityUnvisualized: number = chat.quantitityUnvisualized;
      const lastMessage = chat.lastMessage;
      array.push(
        new ChatGetDTO(
          id,
          name,
          picture,
          messages,
          quantitityUnvisualized,
          lastMessage
        )
      );
    }
    return array;
  } catch (error) {
    throw error;
  }
}

async function getSingleChat(type: string, userId: number, idBusca: number) {
  try {
    const response = await axios.get(
      "http://localhost:9999/chat/" + type + "/" + userId
    );
    const info = [];
    for (let chat of response.data) {
      const id = chat.id;
      const name = chat.name;
      const picture = chat.picture;
      const messages = chat.messages;
      const quantitityUnvisualized: number = chat.quantitityUnvisualized;
      const lastMessage = chat.lastMessage;

      if (chat.id == idBusca) {
        info.push(
          new ChatGetDTO(
            id,
            name,
            picture,
            messages,
            quantitityUnvisualized,
            lastMessage
          )
        );
      }
    }
    console.log(info);

    return info;
  } catch (error) {
    throw error;
  }
}

async function enviarMessage() {
  const response = await axios.put("http://localhost:9999/chat", {
    "id": 1,
    "users": [
      {
        "id": 2
      }
    ],
    "messages": [
      {
        "id": 100,
        "value": "isso mesmooooooooo",
        "dateTime": "2017-01-13T17:09:42.411",
        "user": {
          "id": 1
        }
      },
    ],
    "type": "PRIVATE",
    "name": "sou eu denovo",
    "quantityUnvisualized": null
  });
  return response;

}

async function postData(table, object) {
  return await axios.post("http://localhost:9999/" + table, object);
}

async function postTask(userId, pageId) {
  const retorno = await axios.post(`http://localhost:9999/task/${pageId}/${userId}`);
  return await retorno.data;
}
async function putData(table, object) {
  console.log(object);
  return (await axios.put("http://localhost:9999/" + table, object)).data;
}

async function patchData(table, object) {
  return (await axios.patch("http://localhost:9999/" + table, object)).data;
}
async function deleteData(table, id) {
  return await axios.delete("http://localhost:9999/" + table + "/" + id);
}
