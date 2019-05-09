const express = require('express');
const formidable = require('formidable');
const util = require('util');

const app = express();
const port = 3000;

app.get('/', (request, response) => {
  response.send('Hello from Express!');
});

app.post('/data', (request, response) => {
  const form = new formidable.IncomingForm();

  form.parse(request, (err, fields, files) => {
    response.writeHead(200, { 'content-type': 'text/plain' });
    response.write('received upload:\n\n');
    response.end(util.inspect({ fields, files }));
  });

  console.log(form);
});

app.listen(port, err => {
  if (err) {
    return console.log('something bad happened', err);
  }
  console.log(`server is listening on ${port}`);
});
