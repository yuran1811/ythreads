import io from 'socket.io-client';

export type SocketInitCallbacks = Partial<
  Record<'newIncomingMessage' | 'joinRoom', (...args: any[]) => void>
>;

export const socketInitializer = async (callbacks: SocketInitCallbacks) => {
  try {
    await fetch('/api/socket');

    const socket = io({ path: '/api/socket', addTrailingSlash: false });

    socket.on('connect', () => {
      console.log('isConnected', socket.connected);
      // console.log('connected id:', socket.id);
    });

    socket.on('disconnect', () => {
      console.log('isDisconnected', socket.connected);
    });

    Object.entries(callbacks).forEach(([channel, callback]) => {
      socket.on(channel, callback);
    });

    return socket;
  } catch (error) {
    console.log('error on socket initializer: ', error);
    return null;
  }
};
