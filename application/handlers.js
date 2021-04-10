import request from "request";
import queries from "../prisma/queries.js";
import { statusCodes } from "../utility/constants.js";
import {
  removeCompanyUneditableFields,
  removeUserUneditableFields,
  validateCompanyData,
  validateUserData,
} from "../utility/validation.js";

const options = {
  method: "POST",
  url: "https://dev-np4yj8c0.eu.auth0.com/oauth/token",
  headers: { "content-type": "application/json" },
  body:
    '{"client_id":"SMZrZVSyipDwLBhPglfHfo0NKNUShWXU","client_secret":"7XGjlKKQiX2RTiUfJej_0wi-7FKbs7yVzabAz7Abocy-fE2dSQ7Tx4kCI17TdZLR","audience":"https://auth-api","grant_type":"client_credentials"}',
};

const handleGetUsers = async (req, res) => {
  const obj = await queries.getUsers();
  const statusCode = obj.success ? statusCodes.ok : statusCodes.badReq;

  res.status(statusCode).send(obj.msg);
};

const handleGetUserById = async (req, res) => {
  const obj = await queries.getUserById(Number(req.query.id));
  const statusCode = obj.success ? statusCodes.ok : statusCodes.badReq;

  res.status(statusCode).send(obj.msg);
};

const handleGetCompanies = async (req, res) => {
  const obj = await queries.getCompanies();
  const statusCode = obj.success ? statusCodes.ok : statusCodes.badReq;

  res.status(statusCode).send(obj.msg);
};

const handleGetCompanyById = async (req, res) => {
  const obj = await queries.getCompanyById(Number(req.query.id));
  const statusCode = obj.success ? statusCodes.ok : statusCodes.badReq;

  res.status(statusCode).send(obj.msg);
};

const handleLoginUser = async (req, res) => {
  const truthObj = await queries.checkLoginCred(req.body);

  let msg = "username or password are incorrect";
  let accessToken = "";
  let statusCode = statusCodes.badReq;

  if (truthObj.success) {
    request(options, (error, response, body) => {
      if (error)
        res.status(statusCodes.forbid).send({ error: error, accessToken: "" });
      else res.status(statusCodes.ok).send({ accessToken: body.access_token });
    });
  } else res.status(statusCode).send({ msg: msg, accessToken: accessToken });
};

const handleRegisterUser = (req, res) => {
  res.status(statusCodes.created).send(req.body);
};

const handleAddUser = async (req, res) => {
  if (validateUserData(req.body)) {
    const obj = await queries.createUser(req.body);
    const statusCode = obj.success ? statusCodes.created : statusCodes.badReq;

    res.status(statusCode).send(obj.msg);
  } else res.status(statusCodes.badReq).send("user data are not valid");
};

const handleAddCompany = async (req, res) => {
  if (validateCompanyData(req.body)) {
    const obj = await queries.createUser(req.body);
    const statusCode = obj.success ? statusCodes.created : statusCodes.badReq;

    res.status(statusCode).send(obj.msg);
  } else res.status(statusCodes.badReq).send("company data are not valid");
};

const handleEditUser = async (req, res) => {
  if (validateUserData(req.body, true)) {
    removeUserUneditableFields(req.body);

    const obj = await queries.updateUser(Number(req.query.id), req.body);
    const statusCode = obj.success ? statusCodes.ok : statusCodes.badReq;

    res.status(statusCode).send(obj.msg);
  } else res.status(statusCodes.badReq).send("user data are not valid");
};

const handleEditCompany = async (req, res) => {
  if (validateCompanyData(req.body)) {
    removeCompanyUneditableFields(req.body);

    const obj = await queries.updateCompany(Number(req.query.id), req.body);
    const statusCode = obj.success ? statusCodes.ok : statusCodes.badReq;

    res.status(statusCode).send(obj.msg);
  } else res.status(statusCodes.badReq).send("company data are not valid");
};

const handleDeleteUser = async (req, res) => {
  const obj = await queries.deleteUser(Number(req.query.id));
  const statusCode = obj.success ? statusCodes.noContent : statusCodes.badReq;

  res.status(statusCode).send(obj.msg);
};

const handleDeleteCompany = async (req, res) => {
  const obj = await queries.deleteCompany(Number(req.query.id));
  const statusCode = obj.success ? statusCodes.noContent : statusCodes.badReq;

  res.status(statusCode).send(obj.msg);
};

const handlers = {
  getUsers: handleGetUsers,
  getUserById: handleGetUserById,
  getCompanies: handleGetCompanies,
  getCompanyById: handleGetCompanyById,
  loginUser: handleLoginUser,
  registerUser: handleRegisterUser,
  addUser: handleAddUser,
  addCompany: handleAddCompany,
  editUser: handleEditUser,
  editCompany: handleEditCompany,
  deleteUser: handleDeleteUser,
  deleteCompany: handleDeleteCompany,
};

export default handlers;
