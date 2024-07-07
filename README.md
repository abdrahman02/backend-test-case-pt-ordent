# Library Management API

This API manages the library system with features for handling books, loans, and authentication.

## Installation

1. **Clone the repository:**
   ```
   git clone https://github.com/abdrahman02/backend-test-case-pt-ordent.git
   ```
   ```
   cd backend-test-case-pt-ordent
   ```
2. **Install dependencies:**

   ```
   npm install
   ```

3. **Set up environment variables:**
   Create a `.env` file based on `.env.example` and configure your environment variables.

   ```
   cp .env.example .env
   ```

4. **Database Setup:**
   Ensure you have mysql installed and configured.

- **Migration:** Run migrations to set up the database schema.
  ```
  npm run migrate
  ```
- **Seed Data (Optional):** Seed initial data if required.
  ```
  npm run seed
  ```

5. **Start the server:**
   ```
   npm run dev
   ```

## API Documentation

Access the API documentation using Swagger UI:

- [API Documentation](http://localhost:5000/api-docs) - Visit this link to view detailed API endpoints, request/response formats, and example usage. (adjust it to the port you are using)

## Requirements

- Node.js (v20.11.1 or higher)
- Mysql

## Resources Used

- Express.js
- Sequelize ORM
- Swagger for API documentation
- argon2 for password hashing
- Other libraries as specified in `package.json`
