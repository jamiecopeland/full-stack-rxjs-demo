import createSocketServer from 'socket.io';

const port = 3003;

createSocketServer(port)
  .on('connection', socket => socket
    .emit('message', { userName: 'Mr Server',  body: 'Welcome to the chat' })
    .on('message', message => socket.emit('message', message))
  );
