export interface User {
  id?: string,
  username: string,
  age: number,
  hobbies: string[] | []
}

export const db: User[] = [
  {
    id: '1',
    username: 'test1',
    age: 45,
    hobbies: []
  },
  {
    id: '45',
    username: 'test2',
    age: 30,
    hobbies: ['gaming', 'typing']
  }
];

