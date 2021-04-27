# Linkana-Auth-Service
Backend authentication service for the Linkana dashboard

### Description

This repository is for developing and maintaining the Authentication Service for the Linkana dashboard. This service is responsible for all user-auth activities such as registration, login, and user privileges.

### Technologies used

- ExpressJS for building the API endpoints.
- JWT and Auth0 for handling user authentication.
- Prisma 2 for database interactions.
- PostgreSQL as the underlying database.

### Some helper packages

- cors: handles browser cross origins.
- crypto-js: decrypts and encrypts user password.
- dotenv: reads the contents of the `.env` file.
- nodemailer: sends confirmation emails after a successful registration.

### Notes

- Database schema is detailed in the `schema.prisma` file.
- `npm start` script uses nodemon.
- After setting up the database, run `npx prisma generate` to create the prisma client responsible for accessing the database.
- All credentials found are not important, just demos.
