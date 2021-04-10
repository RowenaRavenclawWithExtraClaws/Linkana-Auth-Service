import Prisma from "@prisma/client";
import errors from "./errors.js";

const { PrismaClient } = Prisma; // get prisma client constructor
const prisma = new PrismaClient(); // initialize prisma client

const disconnectPrismaClient = async () => await prisma.$disconnect();

// check the correctness of username and password
const checkLoginCredentials = async (user) => {
  try {
    const msg = await prisma.users.findMany({
      where: { username: user.username, password: user.password },
    });

    return {
      success: msg.length,
      msg: msg,
    };
  } catch (err) {
    console.log(err);
    return { success: false, msg: errors[err.code] };
  }
};

// create new database record
const createUserRecord = async (data) => {
  try {
    return { success: true, msg: await prisma.users.create({ data: data }) };
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
    return {
      success: true,
      msg: await prisma.users.findUnique({
        where: { id: id },
      }),
    };
  } catch (err) {
    return { success: false, msg: errors[err.code] };
  }
};

const getCompanyRecordById = async (id) => {
  try {
    return {
      success: true,
      msg: await prisma.companies.findUnique({
        where: { id: id },
      }),
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
      msg: await prisma.users.updateMany({ where: { id: id }, data: data }),
    };
  } catch (err) {
    console.log(err);
    return { success: false, msg: errors[err.code] };
  }
};

const updateCompanyRecord = async (id, data) => {
  try {
    return {
      success: true,
      msg: await prisma.companies.updateMany({ where: { id: id }, data: data }),
    };
  } catch (err) {
    return { success: false, msg: errors[err.code] };
  }
};

// delete record
const deleteUserRecord = async (id) => {
  try {
    await prisma.users.deleteMany({
      where: { id: id },
    });

    return { success: true, msg: "user has been deleted successfuly" };
  } catch (err) {
    return { success: false, msg: errors[err.code] };
  }
};

const deleteCompanyRecord = async (id) => {
  try {
    await prisma.companies.deleteMany({
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
  createUser: createUserRecord,
  createCompany: createCompanyRecord,
  getUsers: getUserRecords,
  getCompanies: getCompanyRecords,
  getUserById: getUserRecordById,
  getCompanyById: getCompanyRecordById,
  updateUser: updateUserRecord,
  updateCompany: updateCompanyRecord,
  deleteUser: deleteUserRecord,
  deleteCompany: deleteCompanyRecord,
};

export default queries;
