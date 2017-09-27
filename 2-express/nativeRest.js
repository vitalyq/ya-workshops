const http = require('http');
const url = require('url');

const port = 3000;

const server = http.createServer((req, res) => {
  res.setHeader('content-type', 'application/json');

  // Cube the number
  const { pathname } = url.parse(req.url, true);
  const parts = pathname.split('/');
  const command = parts[1];
  const number = Number(parts[2]);

  if (command !== 'powoftwo') {
    res.statusCode = 404;
    res.end('Oops');
  }

  if (Number.isNaN(number)) {
    res.statusCode = 400;
    res.end('Please provide a number');
  }

  res.end((number * number).toString());
});

server.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
