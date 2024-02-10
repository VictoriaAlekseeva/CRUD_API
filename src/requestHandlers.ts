import http from 'http';
import { db, User } from './dataBase'
import { getUserById } from './helpers/getUserById';
import { createUser } from './helpers/createUser'
import { v4 as uuidv4, validate as uuidValidate } from 'uuid';


export const get = (url: string, res: http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
}) => {
  if (url === '/api/users') {
    getAllUsers(url, res)
  } else if (url?.startsWith('/api/users/')) {
    getUser(url, res)
  } else {
    res.statusCode = 404;
    res.end('Not Found');
  }
}

const getUser = (url: string, res: http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
}) => {
  const userId = url.split('/')[3];
  const user = getUserById(userId);
  if (!uuidValidate(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end('Invalid userId: has to be an uuid string');
    return
  }
  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: 'User not found' }));
    return;
  }
  res.writeHead(200, { 'Content-Type': 'application/json' });
  res.end(JSON.stringify(user));

}

const getAllUsers = (url: string, res: http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
}) => {
  res.statusCode = 200;
  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify(db, null, 2));
}


export const post = (url: string, req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
}) => {
  // Server should answer with status code 400 and corresponding message if request body does not contain required fields
  //! добавить проверку типов
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    const { username, age, hobbies } = JSON.parse(body);
    if (username && age && hobbies) {
      const newUser = createUser(username, age, hobbies);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } else {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end('Request body does not contain required fields');
    }
  })
}

export const put = (url: string, req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
}) => {

  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    const userId = url.split('/')[3];
    const userIndex = db.findIndex(user => user.id === userId);
    const user = db[userIndex];

    if (!uuidValidate(userId)) {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end('Invalid userId: has to be an uuid string');
      return
    }

    if (!user) {
      res.writeHead(404, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify({ message: 'User not found' }));
      return;
    }
    const newUserData = JSON.parse(body);
    const updateUser = {...user, ...newUserData};
    db[userIndex] = updateUser;
    res.writeHead(201, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updateUser));
  })

}