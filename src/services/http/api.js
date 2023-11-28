export { getData, getListData }

const axios = require('axios').default;

async function getData(table, paramether) {
    try {
        const response = await axios.get("http://localhost:9999/"+table+"/"+paramether);
        return response.data;
      } catch (error) {
        throw error
      }
}

async function getListData(table) {
    try {
        const response = await axios.get("http://localhost:9999/"+table);
        return response.data;
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
