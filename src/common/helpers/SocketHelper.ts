import io, {Socket} from 'socket.io-client';
import StorageHelper from '@helpers/StorageHelper';
import {API_SOCKET, SOCKET_EVENTS} from '@helpers/Global';
import {logout} from '@helpers/Utils';
import ToastHelper from '@helpers/ToastHelper';

class SocketIOClient {
  private socket: Socket | null = null;
  private static instance: SocketIOClient;
  constructor() {
    this.socket = null;
  }

  initializeSocket = async () => {
    //@ts-ignore
    const userToken = JSON.parse(await StorageHelper.getSecureData('@token'));
    let options = {
      query: {
        token: userToken,
      },
      transports: ['websocket'],
    };
    console.log(options, 'usertoken', userToken);
    //@ts-ignore
    this.socket = io(API_SOCKET, options);
    // Additional setup if needed
  };

  connect = async () => {
    console.warn('connect called');
    await this.initializeSocket();
    if (this.socket) {
      this.socket.connect();

      this.socket.on(SOCKET_EVENTS.CONNECT, () => {
        console.log(
          this.socket?.connected,
          'SOCKET CONNECT- ',
          this.socket?.id,
        ); // true
      });
      //@ts-ignore
      this.socket.io.on(SOCKET_EVENTS.RECONNECT, () => {
        //    console.log(this.socket?.connected, 'SOCKET RECONNECT'); // true
      });

      this.socket.on(SOCKET_EVENTS.CONNECTION_ERR, function (data) {
        //    console.log(data, 'SOCKET ERR'); // true
      });
      this.socket.on('signout', async response => {
        //
        console.warn('SOCKET=>LOGOUT');
        console.log(this.socket?.connected, 'SOCKET Logout', response); // true
        logout();
        ToastHelper.error('User is logged out by the admin.');
      });
    }
  };

  disconnect = () => {
    if (this.socket) {
      this.socket.disconnect();
    }
  };

  emit = (eventName: string, data: any) => {
    if (this.socket) {
      //  console.warn('emit called', data);
      this.socket.emit(eventName, data);
    }
  };

  on = (eventName: string, callback: (data: any) => void) => {
    if (this.socket) {
      return this.socket.on(eventName, callback);
    }
  };
  off = (eventName: string, callback: (data: any) => void) => {
    if (this.socket) {
      return this.socket.off(eventName, callback);
    }
  };
  getSocket = () => {
    return this.socket;
  };
  // Add more methods as needed

  // Singleton pattern to ensure a single instance
  static getInstance() {
    if (!this.instance) {
      this.instance = new SocketIOClient();
    }
    return this.instance;
  }
}
export default SocketIOClient;
