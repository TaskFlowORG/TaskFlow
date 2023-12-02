import { ChatGetDTO } from '@/model/chat/ChatGetDTO';

export { getData, getListData, putData, getListChat }

const axios = require('axios').default;

async function getData(table, paramether) {
  return (await axios.get("http://localhost:9999/" + table + "/" + paramether)).data;
}


async function getListData(table) {
  try {
    const response = await axios.get("http://localhost:9999/" + table);
    returnchat;
  } catch (error) {
    throw error
  }
}

async function getListChat(type, userId) {
  try {
    const response = await axios.get("http://localhost:9999/chat/" + type + "/" + userId);
    const array = []
    for (let chat of response.data) {
      const id =chat.id
      const picture =chat.picture;
      const quantitityUnvisualized =chat.quantitityUnvisualized;
      const lastMessage =chat.lastMessage;
      const name =chat.name;
      array.push(new ChatGetDTO(id, picture, quantitityUnvisualized, lastMessage, name))
    }
    return array;
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
