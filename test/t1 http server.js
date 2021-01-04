const http = require('http');
var print = console.log;
http.createServer((request, response) => {
  response.setHeader('Access-Control-Allow-Origin', "*")

  request.on('error', (err) => {
    console.error(err);
    response.statusCode = 400;
    response.end();
  });
  response.on('error', (err) => {
    console.error(err);
  });
  if (request.method === 'POST' && request.url === '/echo') {
    request.pipe(response);
  } else {
    response.statusCode = 404;
    response.end();
  }

  let data = '';
  request.on('data', chunk => {
    data += chunk;
  })
  request.on('end', () => {
    print(222, data)
    // JSON.parse(data) // 'Buy the milk'
  })
}).listen(41069);

