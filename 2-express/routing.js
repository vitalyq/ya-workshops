const http = require('http');
const url = require('url');

const port = 3000;

const server = http.createServer((req, res) => {
  console.log(req.url);

  const parsedUrl = url.parse(req.url, true);
  res.setHeader('content-type', 'application/json');

  switch (parsedUrl.pathname) {
    case '/':
      res.end('index');
      break;
    case '/about':
      res.end('about page');
      break;
    default:
      res.statusCode = 404;
      res.end('Oops');
  }
});

server.listen(port, () => {
  console.log(`Server started at port: ${port}`);
});
