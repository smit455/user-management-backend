# User Management API

This API allows users to manage their accounts, including registration, login, updating details, and account deactivation. It also includes super admin functionalities for managing all users.

## Key Features

### 1. **User Registration and Authentication**
- Register new users with their details such as name, email, password, and phone number.
- Login to authenticate users and provide them with a token for secure access to protected routes.

### 2. **User Profile Management**
- Retrieve authenticated user details.
- Update user information like name, email, and phone number.
- Deactivate the user account if no longer needed.

### 3. **Super Admin Functionality**
- Super admins can view a list of all registered users.
- Access is restricted to super admins using specific middleware checks.

---

## Use Cases

1. **User Account Management:**
   - Allow users to register and manage their accounts securely.
   - Provide a seamless login experience with token-based authentication.

2. **Enhanced Security:**
   - Use middleware to ensure only authenticated users can access or modify their data.
   - Allow only super admins to perform sensitive operations like viewing all users.

3. **Admin Panel Features:**
   - Enable super admins to monitor and manage user data efficiently.

---

## Tech Stack

- **Backend:** Node.js, Express.js
- **Database:** MongoDB
- **Authentication:** JWT (JSON Web Token)
- **Middleware:** Custom middleware for authentication and authorization
- **Tools:** Postman for API testing

---


## Middleware

### 1. `authenticate`
Ensures that the request is made by an authenticated user by validating the provided token.

### 2. `isAdmin`
Checks if the authenticated user has super admin privileges.

---

## Installation and Usage
1. Clone the repository.
   ```bash
   https://github.com/smit455/user-management-backend
   cd user-management-backend
   ```
2. Install dependencies using:
   ```bash
   npm install
   ```
3.  Create a .env file
    ```bash
    PORT=5000
    MONGO_URI=mongodb://your_mongo_db_connection_string
    JWT_SECRET=your_jwt_secret
    ADMIN_EMAIL=admin email
    ADMIN_PASSWORD=admin password
    ADMIN_NUMBER=admin number
    ```
4.  Run the application:
```bash
npm run start
```

## Postman Collection
You can use the following Postman collection to test the API endpoints:

- [Mock Test API Postman Collection](https://documenter.getpostman.com/view/29743624/2sAYQcGBWH)


