import url from 'url';
import http from 'http';
import { get, post, put } from './requestHandlers';
import 'dotenv/config';
import { db } from './dataBase'

export const runServer = () => {
  try {
    const PORT = process.env.PORT || 4000;

    const server = http.createServer();

    server.on("request", (req, res) => {
      const { method, url } = req;
      console.log('request handler')
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
      }
    });
    server.listen(PORT, () => {
      console.log(`listening on port ${PORT}`)
    });
  } catch (err) {
    console.error(err)
  }


}