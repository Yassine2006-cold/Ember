'use strict';

const http = require('node:http');
const fs = require('node:fs');
const path = require('node:path');

const root = path.resolve(__dirname);
const port = Number(process.env.PORT) || 8080;
const contentTypes = {
  '.html': 'text/html; charset=utf-8',
  '.csv': 'text/csv; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'text/javascript; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.ico': 'image/x-icon'
};

function resolvePublicFile(urlPath) {
  let decoded;
  try {
    decoded = decodeURIComponent(urlPath);
  } catch {
    return null;
  }

  if (decoded === '/') decoded = '/index.html';
  const relative = decoded.replace(/^\/+/, '');

  // Publish only the dashboard and its downloadable CSV evidence files.
  if (relative !== 'index.html' && !/^data\/[a-z0-9_-]+\.csv$/i.test(relative)) {
    return null;
  }

  const fullPath = path.resolve(root, relative);
  return fullPath.startsWith(root + path.sep) ? fullPath : null;
}

const server = http.createServer((req, res) => {
  if (req.method !== 'GET' && req.method !== 'HEAD') {
    res.writeHead(405, { 'Content-Type': 'text/plain; charset=utf-8', 'Allow': 'GET, HEAD' });
    return res.end('Method not allowed');
  }

  const url = new URL(req.url, 'http://localhost');
  const filePath = resolvePublicFile(url.pathname);
  if (!filePath) {
    res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
    return res.end('Not found');
  }

  fs.stat(filePath, (statError, stat) => {
    if (statError || !stat.isFile()) {
      res.writeHead(404, { 'Content-Type': 'text/plain; charset=utf-8' });
      return res.end('Not found');
    }

    const type = contentTypes[path.extname(filePath).toLowerCase()] || 'application/octet-stream';
    res.writeHead(200, { 'Content-Type': type, 'Content-Length': stat.size, 'X-Content-Type-Options': 'nosniff' });
    if (req.method === 'HEAD') return res.end();
    fs.createReadStream(filePath).pipe(res);
  });
});

server.listen(port, '0.0.0.0', () => {
  console.log(`EMBER dashboard listening on port ${port}`);
});
