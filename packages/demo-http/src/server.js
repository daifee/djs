import net from 'node:net';

const server = net.createServer((c) => {
  // 'connection' listener.
  console.log('server connected');
  c.on('end', () => {
    console.log('server disconnected');
  });
  // c.write('hello\r\n');
  // c.pipe(c);
  // c.end('\r\n\r\n');
  c.end('');
});
server.on('error', (err) => {
  throw err;
});
server.listen(9180, () => {
  console.log('server bound');
});
