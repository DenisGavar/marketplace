## Technologies
1. **Node.js** - Server-side JavaScript runtime for building scalable applications.
2. **Express.js** - A web framework for creating RESTful APIs.
3. **SQLite** - A lightweight SQL database used for data persistence.
4. **Knex.js** - SQL query builder for handling migrations and database queries.
5. **Jest** - Testing framework for unit and integration tests.
6. **GitHub Actions** - For CI/CD workflows, automating testing and deployment.

## Getting Started

To run and use the project:

1. **Clone the repository:**

    ```bash
    git clone https://github.com/mrwirzz/Marketplace-projectFile.git
    cd Marketplace-projectFile
    ```
2. **Install Dependencies:**

   ```bash
   npm install
   ```

3. **Copy .env file:**

    ```bash
    cp .env.example .env
    ```

    Fill in the required values in `.env`.

4. **Run Migrations:**
    The knex library is used for migrations

    Run all migrations
    ```bash
    npm knex migrate:latest
    ```

    Rollback last migration:
     ```bash
    npm knex migrate:rollback
    ```

    Rollback all migrations:
     ```bash
    npm knex migrate:rollback --all
    ```  

5. **Run Seeds:**
    The knex library is used to fill the database with data

    ```bash
    npm knex seed:run
    ```

6. **Run tests:**

    The jest library is used for tests
    ```bash
    npm test
    ```

    To find out your test coverage
    ```bash
    npm run coverage
    ```

7. **Start app:**

    ```bash
    node index.js
    ```


## Contract

<details>
  <summary>User/Authentication</summary>

  #### Create/Sign up
  *POST /api/v1/signup/*

  Request
  ```json
  {
      "name": string,
      "email": string,
      "password": string
  }
  ```

  #### Sign in
  *POST /api/v1/signin/*

  Request
  ```json
  {
      "email": string,
      "password": string
  }
  ```
</details>

<details>
  <summary>Vendors</summary>

  #### Create
  *POST /api/v1/vendors/*

  Request
  ```json
  {
      "name": string,
      "email": string,
      "rating": float
  }
  ```

  #### Get all
  *GET /api/v1/vendors/*

  Request
  ```json
  {}
  ```

  #### Get by ID
  *GET /api/v1/vendors/:id*

  Request
  ```json
  {}
  ```

  #### Update
  *PUT /api/v1/vendors/:id*

  Request
  ```json
  {
      "name": string,
      "email": string,
      "rating": float
  }
  ```

  #### Delete
  *DELETE /api/v1/vendors/:id*

  Request
  ```json
  {}
  ```

</details>

<details>
  <summary>Products</summary>

  #### Create
  *POST /api/v1/products/*

  Request
  ```json
  {
      "name": string,
      "description": string,
      "price": float,
      "vendorId": int,
      "categories": [
        {
          "categoryId": int
        }
      ]
  }
  ```

  #### Get all
  *GET /api/v1/products/*

  Request
  ```json
  {}
  ```

  #### Get by ID
  *GET /api/v1/products/:id*

  Request
  ```json
  {}
  ```

  #### Update
  *PUT /api/v1/products/:id*

  Request
  ```json
  {
      "name": string,
      "description": string,
      "price": float,
      "vendorId": int,
      "categories": [
        {
          "categoryId": int
        }
      ]
  }
  ```

  #### Delete
  *DELETE /api/v1/products/:id*

  Request
  ```json
  {}
  ```
</details>

<details>
  <summary>Categories</summary>

  #### Create
  *POST /api/v1/categories/*

  Request
  ```json
  {
      "name": string
  }
  ```

  #### Get all
  *GET /api/v1/categories/*

  Request
  ```json
  {}
  ```

  #### Get by ID
  *GET /api/v1/categories/:id*

  Request
  ```json
  {}
  ```

  #### Update
  *PUT /api/v1/categories/:id*

  Request
  ```json
  {
      "name": string
  }
  ```

  #### Delete
  *DELETE /api/v1/categories/:id*

  Request
  ```json
  {}
  ```
</details>

<details>
  <summary>Orders</summary>

  #### Create
  *POST /api/v1/orders/*

  Request
  ```json
  {
    "userId": int,
    "products": [
      {
        "productId": int,
        "quantity": int
      }
    ]
  }
  ```

  #### Get all
  *GET /api/v1/orders/*

  Request
  ```json
  {}
  ```

  #### Get by ID
  *GET /api/v1/orders/:id*

  Request
  ```json
  {}
  ```

  #### Update
  *PUT /api/v1/orders/:id*

  Request
  ```json
  {
    "products": [
      {
        "productId": int,
        "quantity": int
      }
    ]
  }
  ```

  #### Delete
  *DELETE /api/v1/orders/:id*

  Request
  ```json
  {}
  ```
</details>

