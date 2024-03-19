# 🔒 DataDrop Backend

Welcome to the backend repository of DataDrop, a secure file sharing system designed to protect your sensitive data while facilitating seamless collaboration. This repository contains the backend implementation of DataDrop, responsible for handling user authentication, file management operations, and communication with the frontend.

## Tech Stack

- `Express`: Fast, unopinionated, minimalist web framework for Node.js.
- `Mongoose`: Elegant MongoDB object modeling for Node.js.
- `bcrypt`: Library for hashing passwords for secure authentication.
- `jsonwebtoken`: JSON Web Token implementation for user authentication.
- `multer`: Middleware for handling multipart/form-data, used for file uploads.
- `nodemailer`: Module for sending emails, utilized for notifications and alerts.
- `compression`: Middleware for compressing HTTP responses, improving performance.
- `cookie-parser`: Middleware for parsing cookies in incoming requests.
- `cors`: Middleware for enabling Cross-Origin Resource Sharing (CORS) in Express applications.
- `dotenv`: Module for loading environment variables from a .env file into process.env.

## Getting Started

- Clone the repository.
- Install dependencies with npm install.
- Set up environment variables by creating a .env file and adding necessary configurations (e.g., MongoDB connection string, JWT secret).
- Run the server with npm start.
- Your backend server is now running and ready to handle requests from the frontend!

## Contribution

Contributions to DataDrop backend are welcome! Feel free to submit bug reports, feature requests, or pull requests to help improve the project.

Thank you for choosing DataDrop!
