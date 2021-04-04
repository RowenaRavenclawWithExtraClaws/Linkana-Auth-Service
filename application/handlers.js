import queries from "../prisma/queries.js";
import { statusCodes } from "../utility/constants.js";

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

const handleGetCompanies = (req, res) => {
  res.status(statusCodes.ok).send({
    page: 1,
    companies: [{ name: "company1" }, { username: "user2" }],
  });
};

const handleGetCompanyById = (req, res) => {
  res.status(statusCodes.ok).send({ id: req.params.id, name: "company1" });
};

const handleLoginUser = (req, res) => {
  res
    .status(statusCodes.accepted)
    .send({ username: req.body.username, password: req.body.password });
};

const handleRegisterUser = (req, res) => {
  res.status(statusCodes.created).send(req.body);
};

const handleAddUser = async (req, res) => {
  const obj = await queries.createUser(req.body);
  const statusCode = obj.success ? statusCodes.created : statusCodes.badReq;

  res.status(statusCode).send(obj.msg);
};

const handleAddCompany = (req, res) => {
  res.status(statusCodes.created).send(req.body);
};

const handleEditUser = (req, res) => {
  res.status(statusCodes.ok).send(req.body);
};

const handleEditCompany = (req, res) => {
  res.status(statusCodes.ok).send(req.body);
};

const handleDeleteUser = async (req, res) => {
  const obj = await queries.deleteUser(Number(req.query.id));
  const statusCode = obj.success ? statusCodes.noContent : statusCodes.badReq;

  res.status(statusCode).send(obj.msg);
};

const handleDeleteCompany = (req, res) => {
  res.status(statusCodes.noContent).send("deleted");
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
