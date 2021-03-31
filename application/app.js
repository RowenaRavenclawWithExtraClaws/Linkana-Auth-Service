import express from "express";
import handlers from "./handlers.js";

const app = express(); // initialize an express instance

app.use(express.json()); // parse json req body

// GET endpoints
app.get("/auth/users", handlers.getUsers);
app.get("/auth/users/:id", handlers.getUserById);
app.get("/auth/companies", handlers.getCompanies);
app.get("/auth/companies/:id", handlers.getCompanyById);

// POST endpoints
app.post("/auth/users/login", handlers.loginUser);
app.post("/auth/users/register", handlers.registerUser);
app.post("/auth/users/add", handlers.addUser);
app.post("/auth/companies/add", handlers.addCompany);

// PATCH endpoints
app.patch("/auth/users/:id", handlers.editUser);
app.patch("/auth/companies/:id", handlers.editCompany);

// DELETE endpoints
app.delete("/auth/users/:id", handlers.deleteUser);
app.delete("/auth/companies/:id", handlers.deleteCompany);

export default app;
