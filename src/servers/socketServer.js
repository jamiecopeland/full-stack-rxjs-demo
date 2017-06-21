import createSocketServer from 'socket.io';

const port = 3003;

const server = createSocketServer(port);

server.on('connection', socket => socket
  .emit('message', { userName: 'Mr Server',  body: 'Welcome to the chat' })
  .on('message', message => server.emit('message', message))
);
