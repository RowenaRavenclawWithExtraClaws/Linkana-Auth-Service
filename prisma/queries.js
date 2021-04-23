import Prisma from "@prisma/client";
import { email, messages } from "../utility/constants.js";
import { code } from "../utility/helpers.js";
import errors from "./errors.js";

const { PrismaClient } = Prisma; // get prisma client constructor
const prisma = new PrismaClient(); // initialize prisma client

const disconnectPrismaClient = async () => await prisma.$disconnect();

// check the correctness of username and password
const checkLoginCredentials = async (user) => {
  try {
    const userFound = await prisma.users.findMany({
      where: {
        username: user.username,
      },
    });

    if (userFound.length) {
      if (code.decryptMessage(userFound[0].password) === user.password)
        return {
          success: true,
          verified: userFound[0].verified,
          msg: "found",
        };
    }

    return {
      success: false,
      verified: true, // indicates wrong credentials
      msg: "not found",
    };
  } catch (err) {
    console.log(err);
    return { success: false, msg: errors[err.code] };
  }
};

// create new token database record
const addTokenRecord = async (token) => {
  try {
    await prisma.tokens.create({ data: { token: token } });
  } catch (err) {
    console.log(err);
  }
};

// get token database record
const findTokenRecord = async (token) => {
  try {
    return {
      success: true,
      msg: await prisma.tokens.findUnique({ where: { token: token } }),
    };
  } catch (err) {
    return { success: false, msg: errors[err.code] };
  }
};

// create new database record
const createUserRecord = async (data) => {
  try {
    return {
      success: true,
      msg: await prisma.users.create({
        data: { ...data, password: code.encryptMessage(data.password) },
      }),
    };
  } catch (err) {
    return { success: false, msg: errors[err.code] };
  }
};

const createCompanyRecord = async (data) => {
  try {
    return {
      success: true,
      msg: await prisma.companies.create({ data: data }),
    };
  } catch (err) {
    return { success: false, msg: errors[err.code] };
  }
};

// get database records
const getUserRecords = async () => {
  try {
    return { success: true, msg: await prisma.users.findMany() };
  } catch (err) {
    return { success: false, msg: errors[err.code] };
  }
};

const getCompanyRecords = async () => {
  try {
    return { success: true, msg: await prisma.companies.findMany() };
  } catch (err) {
    return { success: false, msg: errors[err.code] };
  }
};

// get record by id
const getUserRecordById = async (id) => {
  try {
    const user = await prisma.users.findUnique({
      where: { id: id },
    });

    return {
      success: user ? true : false,
      msg: user ? user : messages.userNotRight,
    };
  } catch (err) {
    return { success: false, msg: errors[err.code] };
  }
};

// get record by username
const getUserRecordByUsername = async (uniqueIdentifier) => {
  try {
    return {
      success: true,
      msg: await prisma.users.findUnique({
        where: { users_username_email_key: uniqueIdentifier },
      }),
    };
  } catch (err) {
    return { success: false, msg: errors[err.code] };
  }
};

const getCompanyRecordById = async (id) => {
  try {
    const company = await prisma.companies.findUnique({
      where: { id: id },
    });

    return {
      success: company ? true : false,
      msg: company ? company : messages.companyNotRight,
    };
  } catch (err) {
    return { success: false, msg: errors[err.code] };
  }
};

// update record
const updateUserRecord = async (id, data) => {
  try {
    return {
      success: true,
      msg: await prisma.users.update({ where: { id: id }, data: data }),
    };
  } catch (err) {
    return { success: false, msg: errors[err.code] };
  }
};

const updateCompanyRecord = async (id, data) => {
  try {
    return {
      success: true,
      msg: await prisma.companies.update({ where: { id: id }, data: data }),
    };
  } catch (err) {
    return { success: false, msg: errors[err.code] };
  }
};

// delete record
const deleteUserRecord = async (id) => {
  try {
    await prisma.users.delete({
      where: { id: id },
    });

    return { success: true, msg: "user has been deleted successfuly" };
  } catch (err) {
    return { success: false, msg: errors[err.code] };
  }
};

const deleteCompanyRecord = async (id) => {
  try {
    await prisma.companies.delete({
      where: { id: id },
    });

    return { success: true, msg: "company has been deleted successfuly" };
  } catch (err) {
    return errors[err.code];
  }
};

const queries = {
  disconnectPrisma: disconnectPrismaClient,
  checkLoginCred: checkLoginCredentials,
  addToken: addTokenRecord,
  findToken: findTokenRecord,
  createUser: createUserRecord,
  createCompany: createCompanyRecord,
  getUsers: getUserRecords,
  getCompanies: getCompanyRecords,
  getUserById: getUserRecordById,
  getUserByUsername: getUserRecordByUsername,
  getCompanyById: getCompanyRecordById,
  updateUser: updateUserRecord,
  updateCompany: updateCompanyRecord,
  deleteUser: deleteUserRecord,
  deleteCompany: deleteCompanyRecord,
};

export default queries;
