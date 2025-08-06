const { createServer } = require('https');
const { readFileSync } = require('fs');
const next = require('next');
const express = require('express');
const path = require('path');

const port = 8080;
const dev = process.env.NODE_ENV === 'development';
const app = next({ dev });
const handle = app.getRequestHandler();

const httpsOptions = {
  key: readFileSync(path.join(__dirname, 'ssl/key.pem')),
  cert: readFileSync(path.join(__dirname, 'ssl/cert.pem')),
};

app.prepare().then(() => {
  const server = express();
  server.use((req, res) => handle(req, res));
  createServer(httpsOptions, server).listen(port, err => {
    if (err) throw err;
    console.log(`> Ready on https://localhost:${port}`);
  });
});