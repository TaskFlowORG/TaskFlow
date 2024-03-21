import axios from 'axios';


const urls =[
    'http://localhost:9999/',
    'https://7b8a0bd34e74ea57c22a1c533fbdf190.serveo.net/',
]

export const Api = axios.create({
    // baseURL: 'http://10.4.96.33:9999/'
    baseURL: urls[0]

});

Api.interceptors.response.use(
    (    response: any) => response,
    (error:any) => {
      const { config } = error;
      const originalRequest = config;
  
      // Se houver mais URLs na lista, tente a próxima
      if (urls.indexOf(originalRequest.baseURL) !== urls.length - 1) {
        originalRequest.baseURL = urls[urls.indexOf(originalRequest.baseURL) + 1];
        return axios(originalRequest);
      }
  
      return Promise.reject(error);
    }
  );
  
    Api.get('/endpoint')
        .then((response:any) => {
            console.log(response.data);
        })
        .catch((error:any) => {
            console.error('Error:', error);
        });



