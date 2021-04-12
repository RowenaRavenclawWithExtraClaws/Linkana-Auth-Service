import dotenv from "dotenv";

// load .env file contnets in process.env
dotenv.config();

export const statusCodes = {
  ok: 200,
  created: 201,
  accepted: 202,
  noContent: 204,
  badReq: 400,
  unauth: 401,
  forbid: 403,
};

export const accessTokenSecret = process.env.KID;
export const jwksUri = process.env.JWKSURI;
export const audience = process.env.AUDIENCE;
export const issuer = process.env.ISSUER;
export const authUrl = process.env.AUTHURL;
export const clientID = process.env.CLIENTID;
export const clientSecret = process.env.CLIENTSECRET;
