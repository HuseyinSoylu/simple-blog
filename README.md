# Blog Application

This is a simple blog application built with React/TypeScript and Node.js. It allows users to perform basic CRUD operations on blog posts.

## Table of Contents

- [Installation](#installation)
- [Setup](#setup)
- [Running the Application](#running-the-application)
- [API Documentation](#api-documentation)
  - [Create the Posts Table](#create-the-posts-table)
  - [Create a Post](#create-a-post)
  - [Get All Posts](#get-all-posts)
  - [Get a Specific Post](#get-a-specific-post)
  - [Update a Post](#update-a-post)
  - [Delete a Post](#delete-a-post)
- [Screenshots](#screenshots)

## Installation

### Prerequisites

Ensure you have the following installed on your machine:

- [Node.js (v18 or later)](https://nodejs.org/)
- [npm](https://github.com/npm/cli/releases)
- [PostgreSQL](https://www.postgresql.org/)

## Setup

1. **Clone the Repository:**

   ```bash
   git clone https://github.com/huseyinsoylu/simple-blog.git
   cd simple-blog
   ```

2. Install dependencies for both folder (front-end / back-end)

   ```bash
    npm run install-all
   ```

3. Environment Variables:

   **FOR BACK-END**

   - Rename the `.env.example` to `.env` which under `backend` folder and set your PostgreSQL settings.

   **FOR FRONT-END**

   - Rename the `.env.example` file to `.env` in the `frontend` folder.
     You only need to update the PORT value in the .env file <b>if you have changed</b> the backend port; otherwise, you can leave it as is.

4. Now everything should be ready. You can start both front-end and back-end with this command:

   ```bash
   npm run start
   ```

## Running the Application

There is an `GET` endpoint called `/create-table`. After backend starts, you can use Postman to send request. This endpoint creates `blog` table for PostgreSQL. Then you can use front-end to create blog posts etc.

## API Documentation

#### Create the posts table

<details>
 <summary><code>GET</code> <code><b>/create-table</b></code> <code>(creates the posts table if it doesn't already exist)</code></summary>

##### Request

> None

##### Responses

> | http code | content-type | response                                                                   |
> | --------- | ------------ | -------------------------------------------------------------------------- |
> | `200`     | `text/plain` | `"Posts table created successfully."`                                      |
> | `500`     | `text/plain` | `"Error creating posts table."` or `"Unknown error creating posts table."` |

##### Example cURL

> ```bash
> curl -X GET -H "Content-Type: application/json" http://localhost:3000/create-table
> ```

</details>

---

#### Create a new post

<details>
 <summary><code>POST</code> <code><b>/posts</b></code> <code>(creates a new blog post)</code></summary>

##### Request Body

> | name      | type     | data type | description                  |
> | --------- | -------- | --------- | ---------------------------- |
> | `title`   | required | string    | The title of the blog post   |
> | `content` | required | string    | The content of the blog post |

##### Responses

> | http code | content-type       | response                                                                      |
> | --------- | ------------------ | ----------------------------------------------------------------------------- |
> | `200`     | `application/json` | `{"id":1,"title":"New Post","content":"This is the content of the new post"}` |
> | `500`     | `application/json` | `{"error":"Internal Server Error"}`                                           |

##### Example cURL

> ```bash
> curl -X POST -H "Content-Type: application/json" -d '{"title":"New Post","content":"This is the content of the new post"}' http://localhost:3000/posts
> ```

</details>

---

#### Get All Posts

<details>
 <summary><code>GET</code> <code><b>/posts</b></code> <code>(retrieves all blog posts)</code></summary>

##### Request

> None

##### Responses

> | http code | content-type       | response                                                    |
> | --------- | ------------------ | ----------------------------------------------------------- |
> | `200`     | `application/json` | `[{"id":1,"title":"Post 1","content":"Content of post 1"}]` |
> | `500`     | `application/json` | `{"error":"Internal Server Error"}`                         |

##### Example cURL

> ```bash
> curl -X GET -H "Content-Type: application/json" http://localhost:3000/posts
> ```

</details>

---

#### Get a Specific Post

<details>
 <summary><code>GET</code> <code><b>/posts/:id</b></code> <code>(retrieves a specific blog post by ID)</code></summary>

##### Request Parameters

> | name | type     | data type | description             |
> | ---- | -------- | --------- | ----------------------- |
> | `id` | required | number    | The ID of the blog post |

##### Responses

> | http code | content-type       | response                                                  |
> | --------- | ------------------ | --------------------------------------------------------- |
> | `200`     | `application/json` | `{"id":1,"title":"Post 1","content":"Content of post 1"}` |
> | `404`     | `application/json` | `{"error":"Post not found"}`                              |
> | `500`     | `application/json` | `{"error":"Internal Server Error"}`                       |

##### Example cURL

> ```bash
> curl -X GET -H "Content-Type: application/json" http://localhost:3000/posts/1
> ```

</details>

---

#### Update a post

<details>
 <summary><code>PUT</code> <code><b>/posts/:id</b></code> <code>(updates a specific blog post by ID)</code></summary>

##### Request Parameters

> | name | type     | data type | description             |
> | ---- | -------- | --------- | ----------------------- |
> | `id` | required | number    | The ID of the blog post |

##### Request Body

> | name      | type     | data type | description                      |
> | --------- | -------- | --------- | -------------------------------- |
> | `title`   | optional | string    | The new title of the blog post   |
> | `content` | optional | string    | The new content of the blog post |

##### Responses

> | http code | content-type       | response                            |
> | --------- | ------------------ | ----------------------------------- |
> | `200`     | `application/json` | `"Post was updated!"`               |
> | `404`     | `application/json` | `{"error":"Post not found"}`        |
> | `500`     | `application/json` | `{"error":"Internal Server Error"}` |

##### Example cURL

> ```bash
> curl -X PUT -H "Content-Type: application/json" -d '{"title":"Updated Post","content":"Updated content"}' http://localhost:3000/posts/1
> ```

</details>

---

#### Delete a post

<details>
 <summary><code>DELETE</code> <code><b>/posts/:id</b></code> <code>(deletes a specific blog post by ID)</code></summary>

##### Request Parameters

> | name | type     | data type | description             |
> | ---- | -------- | --------- | ----------------------- |
> | `id` | required | number    | The ID of the blog post |

##### Responses

> | http code | content-type       | response                            |
> | --------- | ------------------ | ----------------------------------- |
> | `200`     | `application/json` | `"Post was deleted!"`               |
> | `404`     | `application/json` | `{"error":"Post not found"}`        |
> | `500`     | `application/json` | `{"error":"Internal Server Error"}` |

##### Example cURL

> ```bash
> curl -X DELETE -H "Content-Type: application/json" http://localhost:3000/posts/1
> ```

</details>
