import { createReadStream } from 'node:fs';
import { join } from 'node:path';
import { createServer } from 'node:http';

const pathToFrontDir = join(process.cwd(), 'src', 'front');

export const httpServer = createServer((req, res) => {
  try {
    const { url } = req;
    if (!url) throw new Error('Invalid url');

    const filePath =
      url === '/'
        ? join(pathToFrontDir, 'index.html')
        : join(pathToFrontDir, url);

    const dataFile: Buffer[] = [];

    const rs = createReadStream(filePath);

    rs.on('error', (error) => {
      res.writeHead(404);
      res.end('Resource not found!');
    });

    rs.on('data', (chunk) => {
      if (chunk instanceof Buffer) dataFile.push(chunk);
    });

    rs.on('end', () => {
      res.writeHead(200);
      res.end(Buffer.concat(dataFile));
    });
  } catch (error) {
    if (error instanceof Error) {
      res.writeHead(404);
      res.end(JSON.stringify(error));
    }
  }
});
