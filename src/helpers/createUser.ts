import { v4 as uuidv4 } from 'uuid';
import { User, db } from '../dataBase';

export const createUser = (username: string, age: number, hobbies: string[]): User => {
  const id = uuidv4();
  const newUser: User = { id, username, age, hobbies };
  db.push(newUser);
  return newUser;
};