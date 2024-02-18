
import { Chat, OrderedPage } from "@/models";
import { AxiosResponse } from "axios";


export { getData, getListData, putData, getListChat, getSingleChat, getPage, patchData, postTask, enviarMessage }


const axios = require("axios").default;


async function getData(table: string, paramether: number|string) {
  return (await axios.get("http://localhost:9999/" + table + "/" + paramether)).data;
}

async function getPage(table: string, paramether: number): Promise<OrderedPage> {
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
    return response.data;
  } catch (error) {
    throw error;
  }
}

async function getSingleChat(type: string, userId: number, idBusca: number) {
  try {
    const response = await axios.get(
      "http://localhost:9999/chat/" + type + "/" + userId
    );
    return response.data;
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

async function postData(table:any, object:any) {
  return await axios.post("http://localhost:9999/" + table, object);
}

async function postTask(userId:any, pageId:any) {
  const retorno = await axios.post(`http://localhost:9999/task/${pageId}/${userId}`);
  return await retorno.data;
}
async function putData(table:any, object:any) {
  console.log(object);
  return (await axios.put("http://localhost:9999/" + table, object)).data;
}

async function patchData(table:any, object:any) {
  return (await axios.patch("http://localhost:9999/" + table, object)).data;
}
async function deleteData(table:any, id:any) {
  return await axios.delete("http://localhost:9999/" + table + "/" + id);
}
