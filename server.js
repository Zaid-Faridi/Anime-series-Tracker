const http = require('http');

const server = http.createServer((req, res) => {
  let body = '';
  req.on('data', chunk => {
    body += chunk.toString();
  });
  req.on('end', () => {
    console.log('STACK TRACE RECEIVED:');
    console.log(body);
    res.writeHead(200);
    res.end('OK');
    server.close();
    process.exit(0);
  });
});

server.listen(9999, () => {
  console.log('Listening for stack trace on 9999...');
});
