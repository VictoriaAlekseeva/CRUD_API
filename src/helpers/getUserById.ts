import { User, db } from '../dataBase';

export const getUserById = (userId: string): User => {

  const user = db.filter(user => user.id === userId)

  return user[0];

}