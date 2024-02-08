interface DB {
  id: string,
  username: string,
  age: number,
  hobbies: string[] | []
}

export const db = {} as DB[];

