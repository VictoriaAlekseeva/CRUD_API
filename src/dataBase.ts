interface DB {
  id: string,
  username: string,
  age: number,
  hobbies: string[] | []
}

export const db: DB[] = [
  {
    id: '1',
    username: 'test1',
    age: 45,
    hobbies: []
  },
  {
    id: '2',
    username: 'test2',
    age: 30,
    hobbies: ['gaming', 'typing']
  }
];

