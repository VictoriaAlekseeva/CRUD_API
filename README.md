
# Simple CRUD API
simple CRUD API uses in-memory database underneath

## Setup and Running

- Use `node 20 lts`.
- Clone this repo: `git clone https://github.com/VictoriaAlekseeva/CRUD_API`.
- Go to downloaded folder.
- Install dependencies: `npm install`.
- Start server: `npm start:prod`.
- Create .env file with PORT = 4000 or any other port by your choiсe, but don't forget to write it in the url in case you copy it from examples
- Now you can send requests to the address: `http://127.0.0.1:port_from_env` for exapmle with Postman.

## Usage
**Get Users**
----
Returns json data about users in a data base.

* **URL**

    api/users

    (http://localhost:4000/api/users)

* **Method:**

    `GET`

* **Headers:**

    None

*  **URL Params**

    None

* **Success Response:**

  * **Code:** 200 OK <br />
    **Content:**
    ```json
      [{
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
      }]
    ```

**Get User**
----
Returns json data about specified user.

* **URL**

    api/users/{userId}

    (http://localhost:4000/api/users/b6e4cdb0-b296-4df4-8bd4-b0f4b12c1be0)

* **Method:**

    `GET`

* **Code:** 200 OK <br />
  **Content:**
```json
      [
         {
        "id": "b6e4cdb0-b296-4df4-8bd4-b0f4b12c1be0",
        "username": "John",
        "age": 8,
        "hobbies": [
            "football",
            "golf"
        ]
    },
      ]
```

* **Error Response:**

  * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
      { "message": "User doesn't exist" }
    ```
  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```Invalid userId: it has to be an uuid string```


**Create User**
----
Creates user.

* **URL**

    api/users

    (http://localhost:4000/api/users)

* **Method:**

    `POST`

* **Data Params**

```typescript
  {
    username: string,
    age: number,
    hobbies: string[] | []
  }
```

* **Code:** 201 OK <br />
  **Content:**
  ```json
    [
       {
      "id": "a8t4cdb0-b296-4df4-8bd4-b0f4b12c1fe0",
      "username": "New Name",
      "age": 19,
      "hobbies": ["gaming"]
      },
    ]
  ```

* **Error Response:**

  * **Code:** 400 NOT FOUND <br />
    **Content:**
    ```Invalid JSON body```


**Update User**
----
Updates user.

* **URL**

    api/users/{userId}

    (http://localhost:4000/api/users/b6e4cdb0-b296-4df4-8bd4-b0f4b12c1be0)

* **Method:**

    `PUT`

* **Data Params**

```typescript
  {
    username: string,
    age: number,
    hobbies: string[] | []
  }
```
It's not requred to provide all fields, only provided fields will be updated

* **Code:** 200 OK <br />
  **Content:**
  ```json
    [
       {
      "id": "b6e4cdb0-b296-4df4-8bd4-b0f4b12c1be0",
      "username": "Update data",
      "age": 23,
      "hobbies": ["updated hobbie list"]
      },
    ]
  ```

* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
      { "message": "User doesn't exist" }
    ```
  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```Invalid userId: it has to be an uuid string```

**Delete User**
----
Delete user.

* **URL**

    api/users/{userId}

    (http://localhost:4000/api/users/b6e4cdb0-b296-4df4-8bd4-b0f4b12c1be0)

* **Method:**

    `DELETE`

* **Data Params**

* **Code:** 204 NO CONTENT <br />
  **Content:**

* **Error Response:**

    * **Code:** 404 NOT FOUND <br />
    **Content:**
    ```json
      { "message": "User doesn't exist" }
    ```
  * **Code:** 400 BAD REQUEST <br />
    **Content:**
    ```Invalid userId: it has to be an uuid string```

