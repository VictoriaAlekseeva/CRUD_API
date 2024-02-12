import http from 'http';
export const handleError = (res: http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage}) => {
  res.writeHead(500, {'Content-Type': 'text/plain'});
  res.end('Internal Server Error');
};