import http from 'http';
import {db} from './dataBase'

export const get = (url: string, res: http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
}) => {
  if (url === 'api/users') {
    res.statusCode = 200;
    res.end(db);
  }

}