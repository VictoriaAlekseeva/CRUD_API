import http from 'http';
import {db} from './dataBase'

export const get = (url: string, res: http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
}) => {
  if (url === '/api/users') {
    const data = '';
    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify(db, null, 2));
  } else {
    // Handle other paths
    res.statusCode = 404;
    res.end('Not Found');
  }

}