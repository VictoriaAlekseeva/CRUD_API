import url from 'url';
import http from 'http';
import { get, post, put, deleteUser } from './requestHandlers';
import 'dotenv/config';

export const runServer = () => {
  try {
    const PORT = process.env.PORT || 4000;

    const server = http.createServer();

    server.on("request", (req, res) => {
      const { method, url } = req;
      if (url && !url.startsWith('/api/users')) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end('Invalid url');
        return
      }
      switch (method) {
        case ('GET'):
          console.log(url)
          if (url) get(url, res)
          break;
        case ('POST'):
          console.log(url)
          if (url) post(url, req, res)
          break;
        case ('PUT'):
          console.log(url)
          if (url) put(url, req, res)
          break;
        case ('DELETE'):
          console.log(url)
          if (url) deleteUser(url, req, res)
          break;
        default:
          res.writeHead(400, { 'Content-Type': 'application/json' });
          res.end("Method doesn't supports");
      }
    });
    server.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    });
  } catch (err) {
    console.error(err);
  }


}