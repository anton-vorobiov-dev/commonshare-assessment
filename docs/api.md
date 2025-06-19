# API Documentation

This document describes the available backend API endpoints for the CommonShare assessment project.

---

## 1. Get Users

* **Endpoint** : `/api/users`
* **Method** : `GET`
* **Description** : Returns the list of all users from the `users.json` data store.

### Request

```
GET /api/users
```

*No request body.*

### Response

* **Status Code** : `200 OK`
* **Body** : JSON array of user objects (each with all properties defined in `users.json`).

```json
[
  {
    "uuid": "uuid-1",
    "name": "Alice",
    "email": "alice@example.com",
    "role": "admin",
    "country": "Croatia",
    "age": 30
  },
  {
    "uuid": "uuid-2",
    "name": "Bob",
    "email": "bob@example.com",
    "role": "viewer",
    "country": "Ukraine",
    "age": 25
  }
]
```

> **Note** : The front-end does *not* display the `password` field. It should filter it out before rendering.

---

## 2. Login

* **Endpoint** : `/api/auth/login`
* **Method** : `POST`
* **Description** : Authenticates a user by email and password, returning a user profile (without password) and a dummy JWT token (for MVP).

### Request

```
POST /api/auth/login
Content-Type: application/json
```

```json
{
  "email": "alice@example.com",
  "password": "plaintextpassword"
}
```

### Responses

| Status Code                | Meaning                   | Body                                                                                  |
| -------------------------- | ------------------------- | ------------------------------------------------------------------------------------- |
| `200 OK`                 | Authentication successful | `{ "user": { uuid, name, email, role, country, age }, "token": "dummy-jwt-token" }` |
| `401 Unauthorized`       | Invalid credentials       | `{ "statusCode": 401, "statusMessage": "Invalid credentials" }`                     |
| `405 Method Not Allowed` | Wrong HTTP method         | `{ "statusCode": 405, "statusMessage": "Method Not Allowed" }`                      |

#### 200 OK Response Example

```json
{
  "user": {
    "uuid": "uuid-1",
    "name": "Alice",
    "email": "alice@example.com",
    "role": "admin",
    "country": "Croatia",
    "age": 30
  },
  "token": "dummy-jwt-token"
}
```

---

### Error Handling

* The API uses standard HTTP status codes to indicate success or failure.
* Error responses contain a JSON body with `statusCode` and `statusMessage` fields.

---

### Notes

* For production, replace the dummy JWT token with a real token signed using a secure secret.
* Consider moving `users.json` to a real database for persistence and scalability.

---

*End of API Documentation.*
