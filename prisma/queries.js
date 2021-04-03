import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient(); // initialize prisma client

const disconnectPrismaClient = async () => await prisma.$disconnect();

// create new database record
const createUserRecord = async (data) => await prisma.users.create(data);

const createCompanyRecord = async (data) => await prisma.companies.create(data);

// get database records
const getUserRecords = async () => await prisma.users.findMany();

const getCompanyRecords = async () => await prisma.companies.findMany();

// get record by id
const getUserRecordById = async (id) =>
  await prisma.users.findUnique({
    where: { id: id },
  });

const getCompanyRecordById = async (id) =>
  await prisma.companies.findUnique({
    where: { id: id },
  });

// update record
const updateUserRecord = async (id, data) =>
  await prisma.users.update({ where: { id: id }, data: data });

const updateCompanyRecord = async (id, data) =>
  await prisma.companies.update({ where: { id: id }, data: data });

// delete record
const deleteUserRecord = async (id) =>
  prisma.users.delete({
    where: { id: id },
  });

const deleteCompanyRecord = async (id) =>
  prisma.companies.delete({
    where: { id: id },
  });

const queries = {
  disconnectPrisma: disconnectPrismaClient,
  createUser: createUserRecord,
  createCompany: createCompaniesRecord,
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
