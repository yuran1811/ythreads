// @ts-nocheck

import { NextApiRequest, NextApiResponse } from 'next';
import { Server } from 'socket.io';

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
    { path: '/api/socket_io', addTrailingSlash: false },
  );
  res.socket.server.io = io;

  io.on('connection', (socket: Socket) => {
    socket.on('createdMessage', (msg: string) => {
      socket.broadcast.emit('newIncomingMessage', msg);
    });

    socket.on('join', (roomName) => {});

    socket.on('ready', (roomName) => {});

    socket.on('ice-candidate', (candidate, roomName: string) => {});

    socket.on('offer', (offer, roomName) => {});

    socket.on('answer', (answer, roomName) => {});

    socket.on('leave', (roomName) => {});
  });

  console.log('SocketIO started successfully!');
  res.end();
}
