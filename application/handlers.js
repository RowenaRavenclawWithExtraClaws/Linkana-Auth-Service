import request from "request";
import options from "../JWT/options.js";
import queries from "../prisma/queries.js";
import { messages, statusCodes } from "../utility/constants.js";
import {
  deleteObjectsField,
  parseValidationToken,
} from "../utility/helpers.js";
import sendEmail from "../utility/sendEmail.js";
import {
  removeCompanyUneditableFields,
  removeUserUneditableFields,
  validateCompanyData,
  validateUserData,
} from "../utility/validation.js";

const getUsers = async (req, res) => {
  const obj = await queries.getUsers();
  const statusCode = obj.success ? statusCodes.ok : statusCodes.badReq;

  if (obj.success) deleteObjectsField(obj.msg, ["id", "password"]);

  res.status(statusCode).send(obj.msg);
};

const getUserById = async (req, res) => {
  const obj = await queries.getUserById(Number(req.query.id));
  const statusCode = obj.success ? statusCodes.ok : statusCodes.badReq;

  if (obj.success) deleteObjectsField([obj.msg], ["id", "password"]);

  res.status(statusCode).send(obj.msg);
};

const handleGetUsers = (req, res) => {
  if (req.query.id) getUserById(req, res);
  else getUsers(req, res);
};

const getCompanies = async (req, res) => {
  const obj = await queries.getCompanies();
  const statusCode = obj.success ? statusCodes.ok : statusCodes.badReq;

  if (obj.success) deleteObjectsField(obj.msg, ["id"]);

  res.status(statusCode).send(obj.msg);
};

const getCompanyById = async (req, res) => {
  const obj = await queries.getCompanyById(Number(req.query.id));
  const statusCode = obj.success ? statusCodes.ok : statusCodes.badReq;

  if (obj.success) deleteObjectsField([obj.msg], ["id"]);

  res.status(statusCode).send(obj.msg);
};

const handleGetCompanies = (req, res) => {
  if (req.query.id) getCompanyById(req, res);
  else getCompanies(req, res);
};

const handleLoginUser = async (req, res) => {
  const truthObj = await queries.checkLoginCred(req.body);

  let msg = truthObj.verified ? messages.wrongUser : messages.notVerified;
  let statusCode = statusCodes.badReq;

  if (truthObj.success && truthObj.verified) {
    // get JWT from auth0 API
    request(options, (error, response, body) => {
      if (error)
        res.status(statusCodes.forbid).send({ error: error, accessToken: "" });
      else
        res
          .status(statusCodes.ok)
          .send({ access_token: JSON.parse(body).access_token });
    });
  } else res.status(statusCode).send({ msg: msg, access_token: "" });
};

const handleRegisterUser = async (req, res) => {
  const userData = req.body;

  if (validateUserData(userData)) {
    const obj = await queries.createUser(userData);

    if (obj.success) {
      const statusCode = obj.success ? statusCodes.created : statusCodes.badReq;
      const emailSent = await sendEmail(userData.username, userData.email);

      if (emailSent) res.status(statusCode).send(messages.verifyEmail);
      else res.status(500).send(messages.failedRegister);
    } else res.status(statusCodes.badReq).send(obj.msg);
  } else res.status(statusCodes.badReq).send(messages.userNotRight);
};

const verifyUserEmail = async (req, res) => {
  const token = req.body.token;
  const foundObj = await queries.findToken(token);

  if (foundObj.msg) {
    const uniqueIdentifier = parseValidationToken(token);

    let userData = await queries.getUserByUsername(uniqueIdentifier);
    const statusCode = userData.success ? statusCodes.ok : statusCodes.badReq;

    await queries.updateUser(userData.msg.id, { verified: true });

    res.status(statusCode).send("user email has been verified successfuly");
  } else res.status(statusCodes.badReq).send("wrong verification token!");
};

const handleAddUser = async (req, res) => {
  if (validateUserData(req.body)) {
    const obj = await queries.createUser(req.body);
    const statusCode = obj.success ? statusCodes.created : statusCodes.badReq;

    res.status(statusCode).send(obj.msg);
  } else res.status(statusCodes.badReq).send(messages.userNotRight);
};

const handleAddCompany = async (req, res) => {
  if (validateCompanyData(req.body.company)) {
    const obj = await queries.createCompany(req.body.company);
    const statusCode = obj.success ? statusCodes.created : statusCodes.badReq;

    // associate compant with the user who created it
    await queries.updateUser(req.body.user_id, { company_id: obj.msg.id });

    res.status(statusCode).send(obj.msg);
  } else res.status(statusCodes.badReq).send(messages.companyNotRight);
};

const handleEditUser = async (req, res) => {
  if (validateUserData(req.body, true)) {
    removeUserUneditableFields(req.body);

    const obj = await queries.updateUser(Number(req.query.id), req.body);
    const statusCode = obj.success ? statusCodes.ok : statusCodes.badReq;

    res.status(statusCode).send(obj.msg);
  } else res.status(statusCodes.badReq).send(messages.userNotRight);
};

const handleEditCompany = async (req, res) => {
  console.log(req.body);
  if (validateCompanyData(req.body)) {
    removeCompanyUneditableFields(req.body);

    const obj = await queries.updateCompany(Number(req.query.id), req.body);
    const statusCode = obj.success ? statusCodes.ok : statusCodes.badReq;

    res.status(statusCode).send(obj.msg);
  } else res.status(statusCodes.badReq).send(messages.companyNotRight);
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
  getUserById: handleGetUsers,
  getCompanies: handleGetCompanies,
  getCompanyById: handleGetCompanies,
  loginUser: handleLoginUser,
  registerUser: handleRegisterUser,
  verifyUser: verifyUserEmail,
  addUser: handleAddUser,
  addCompany: handleAddCompany,
  editUser: handleEditUser,
  editCompany: handleEditCompany,
  deleteUser: handleDeleteUser,
  deleteCompany: handleDeleteCompany,
};

export default handlers;
