import { useEffect, useRef } from 'react';
import { Socket } from 'socket.io-client';

import { SocketInitCallbacks, socketInitializer } from '@/lib/socket';

export const useSocket = (opts: SocketInitCallbacks) => {
  const socketCreated = useRef(false);
  const socketInstance = useRef<Socket>();

  useEffect(() => {
    if (!socketCreated.current) {
      try {
        socketInitializer(opts).then((res: any) => (socketInstance.current = res));

        socketCreated.current = true;
      } catch (error) {
        console.log(error);
      }
    } else {
      console.log('Socket instance has already been created!');
    }
  }, []);

  return { socketInstance, socketCreated };
};

export default useSocket;
