import Prisma from "@prisma/client";
import errors from "./errors.js";

const { PrismaClient } = Prisma; // get prisma client constructor
const prisma = new PrismaClient(); // initialize prisma client

const disconnectPrismaClient = async () => await prisma.$disconnect();

// create new database record
const createUserRecord = async (data) => {
  try {
    return await prisma.users.create({ data: data });
  } catch (err) {
    return errors[err.code];
  }
};

const createCompanyRecord = async (data) => {
  try {
    return await prisma.companies.create({ data: data });
  } catch (err) {
    return errors[err.code];
  }
};

// get database records
const getUserRecords = async () => {
  try {
    return await prisma.users.findMany();
  } catch (err) {
    return errors[err.code];
  }
};

const getCompanyRecords = async () => {
  try {
    return await prisma.companies.findMany();
  } catch (err) {
    return errors[err.code];
  }
};

// get record by id
const getUserRecordById = async (id) => {
  try {
    return await prisma.users.findUnique({
      where: { id: id },
    });
  } catch (err) {
    return errors[err.code];
  }
};

const getCompanyRecordById = async (id) => {
  try {
    return await prisma.companies.findUnique({
      where: { id: id },
    });
  } catch (err) {
    return errors[err.code];
  }
};

// update record
const updateUserRecord = async (id, data) => {
  try {
    return await prisma.users.update({ where: { id: id }, data: data });
  } catch (err) {
    return errors[err.code];
  }
};

const updateCompanyRecord = async (id, data) => {
  try {
    return await prisma.companies.update({ where: { id: id }, data: data });
  } catch (err) {
    return errors[err.code];
  }
};

// delete record
const deleteUserRecord = async (id) => {
  try {
    await prisma.users.delete({
      where: { id: id },
    });

    return "user has been deleted successfuly";
  } catch (err) {
    return errors[err.code];
  }
};

const deleteCompanyRecord = async (id) => {
  try {
    await prisma.companies.delete({
      where: { id: id },
    });

    return "company has been deleted successfuly";
  } catch (err) {
    return errors[err.code];
  }
};

const queries = {
  disconnectPrisma: disconnectPrismaClient,
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
