import http from 'http';
import { db, User } from './dataBase'
import { getUserById } from './helpers/getUserById';
import { createUser } from './helpers/createUser';
import { isBodyValid } from './helpers/bodyValidation';
import { validate as uuidValidate } from 'uuid';


export const get = (url: string, res: http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
}) => {
  if (url === '/api/users') {
    getAllUsers(url, res)
  } else if (url?.startsWith('/api/users/')) {
    getUser(url, res)
  }
}

const getUser = (url: string, res: http.ServerResponse<http.IncomingMessage> & {
  req: http.IncomingMessage;
}) => {
  const userId = url.split('/')[3];
  const user = getUserById(userId);
  if (!uuidValidate(userId)) {
    res.writeHead(400, { 'Content-Type': 'application/json' });
    res.end('Invalid userId: it has to be an uuid string');
    return
  }
  if (!user) {
    res.writeHead(404, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify({ message: "User doesn't exist" }));
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
  let body = '';
  req.on('data', (chunk) => {
    body += chunk;
  });
  req.on('end', () => {
    try {
      const { username, age, hobbies } = JSON.parse(body);
      const userData = JSON.parse(body);
      if (!isBodyValid(username, age, hobbies)) {
        res.writeHead(400, { 'Content-Type': 'application/json' });
        res.end('Request body does not contain required fields or field types are incorrect');
        return
      }
      const newUser = createUser(userData.username, userData.age, userData.hobbies);
      res.writeHead(201, { 'Content-Type': 'application/json' });
      res.end(JSON.stringify(newUser));
    } catch {
      res.writeHead(400, { 'Content-Type': 'application/json' });
      res.end('Invalid JSON body');
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
      res.end(JSON.stringify({ message: "User doesn't exist" }));
      return;
    }
    const newUserData = JSON.parse(body);
    const updateUser = { ...user, ...newUserData };
    db[userIndex] = updateUser;
    res.writeHead(200, { 'Content-Type': 'application/json' });
    res.end(JSON.stringify(updateUser));
  })

}

export const deleteUser = (url: string, req: http.IncomingMessage, res: http.ServerResponse<http.IncomingMessage> & {
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
    res.end(JSON.stringify({ message: "User doesn't exist" }));
    return;
  }

  const userIndex = db.findIndex(user => user.id === userId);
  db.splice(userIndex, 1);
  res.writeHead(204, { 'Content-Type': 'application/json' });
  res.end();
}