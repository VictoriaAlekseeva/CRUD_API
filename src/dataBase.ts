export interface User {
  id?: string,
  username: string,
  age: number,
  hobbies: string[] | []
}

export const db: User[] = [
  {
      "id": "b6e4cdb0-b296-4df4-8bd4-b0f4b12c1be0",
      "username": "John",
      "age": 8,
      "hobbies": [
          "football",
          "golf"
      ]
  },
  {
      "id": "a82ca83f-03b8-4bad-9742-62f9d230dfb7",
      "username": "John sr",
      "age": 98,
      "hobbies": [
          "football",
          "tennis"
      ]
  }
];

