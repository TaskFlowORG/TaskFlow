import { ChatGetDTO } from '@/model/chat/ChatGetDTO';

export { getData, getListData, putData, getListChat, getSingleChat }

const axios = require('axios').default;

async function getData(table: String, paramether: Number) {
  return (await axios.get("http://localhost:9999/" + table + "/" + paramether)).data;
}


async function getListData(table: String) {
  try {
    const response = await axios.get("http://localhost:9999/" + table);
    return response.data;
  } catch (error) {
    throw error
  }
}

async function getListChat(type: String, userId: Number) {
  try {
    const response = await axios.get("http://localhost:9999/chat/" + type + "/" + userId);
    const array = []
    for (let chat of response.data) {
      const id = chat.id
      const name = chat.name;
      const picture = chat.picture;
      const messages = chat.messages;
      const quantitityUnvisualized: Number = chat.quantitityUnvisualized;
      const lastMessage = chat.lastMessage;
      array.push(new ChatGetDTO(id, name, picture, messages, quantitityUnvisualized, lastMessage))
    }
    return array;
  } catch (error) {
    throw error
  }
}

async function getSingleChat(type: String, userId: Number, idBusca: number) {
  try {
    const response = await axios.get("http://localhost:9999/chat/" + type + "/" + userId);
    const info = []
    for (let chat of response.data) {
      const id = chat.id
      const name = chat.name;
      const picture = chat.picture;
      const messages = chat.messages;
      const quantitityUnvisualized: Number = chat.quantitityUnvisualized;
      const lastMessage = chat.lastMessage;
      
      if (chat.id == idBusca) {
        info.push(new ChatGetDTO(id, name, picture, messages, quantitityUnvisualized, lastMessage))
      }
    }
    console.log(info)

    return info;
  } catch (error) {
    throw error
  }
}

async function postData(table, object) {
  return await axios.post("http://localhost:9999/" + table, object);
}
async function putData(table, object) {
  return await axios.put("http://localhost:9999/" + table, object);
}
async function deleteData(table, id) {
  return await axios.delete("http://localhost:9999/" + table + "/" + id);
}
