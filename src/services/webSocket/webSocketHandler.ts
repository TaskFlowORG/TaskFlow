

const websocketUrl = 'ws://localhost:9999/notification'; // Altere para a URL do seu servidor WebSocket


export const connectWebSocket = () => {
    
    const client = new WebSocket(websocketUrl);
    client.onopen = () => {
        console.log('Conectado ao WebSocket');
    };
  }


