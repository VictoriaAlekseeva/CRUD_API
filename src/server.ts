import url from 'url';
import http from 'http';
import { middleware } from './middleware';
import { get } from './requestHandlers';
import 'dotenv/config';

export const runServer = () => {
  const PORT = process.env.PORT || 4000;

  const server = http.createServer();

  server.on("request", (req, res) => {
    const { method, url } = req;
    console.log('request handler')
    switch (method) {
      case 'GET':
        if (url) get(url, res)

        break;

    }

  });

  server.listen(PORT, () => {
    console.log(`listening on port ${PORT}`)
  });
}