// @ts-nocheck

import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';

import { deployUrl } from '@/shared/constants';
import { ClientToServerEvents, InterServerEvents, ServerToClientEvents, SocketData } from '@/shared/types';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (res.socket.server.io) {
    console.log('SocketIO has already started!');
    res.end();
    return;
  }

  console.log('Setting up SocketIO...');

  const io = new Server<ClientToServerEvents, ServerToClientEvents, InterServerEvents, SocketData>(
    res.socket.server,
    {
      path: '/api/socket_io',
      addTrailingSlash: false,
      cors: {
        // origin: deployUrl,
        origin: '*',
        methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
      },
    },
  );
  res.socket.server.io = io;

  io.on('connection', (socket: Socket) => {
    socket.on('createdMessage', (msg: string) => {
      socket.broadcast.emit('newIncomingMessage', msg);
    });

    socket.on('join', (roomName) => {
      const { rooms } = io.sockets.adapter;

      const room = rooms.get(roomName);

      // room == undefined when no such room exists.

      if (room === undefined) {
        socket.join(roomName);

        socket.emit('created');
      } else if (room.size === 1) {
        // room.size == 1 when one person is inside the room.

        socket.join(roomName);

        socket.emit('joined');
      } else {
        // when there are already two people inside the room.

        socket.emit('full');
      }

      console.log(rooms);
    });

    socket.on('ready', (roomName) => {
      socket.broadcast.to(roomName).emit('ready'); // Informs the other peer in the room.
    });

    socket.on('ice-candidate', (candidate: RTCIceCandidate, roomName: string) => {
      console.log(candidate);

      socket.broadcast.to(roomName).emit('ice-candidate', candidate);
    });

    socket.on('offer', (offer, roomName) => {
      socket.broadcast.to(roomName).emit('offer', offer);
    });

    socket.on('answer', (answer, roomName) => {
      socket.broadcast.to(roomName).emit('answer', answer);
    });

    socket.on('leave', (roomName) => {
      socket.leave(roomName);

      socket.broadcast.to(roomName).emit('leave');
    });
  });

  console.log('SocketIO started successfully!');
  res.end();
}
