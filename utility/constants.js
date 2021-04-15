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

export const messages = {
  verifyEmail:
    "Registration was successful, a confirmation link is sent to your email. Please verify your email before login",
  failedRegister: "Registration failed, you can try agian any time",
  userNotRight: "user data are not valid",
  companyNotRight: "company data are not valid",
};

export const characters =
  "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz1234567890@#%^&*()_";
export const accessTokenSecret = process.env.KID;
export const jwksUri = process.env.JWKSURI;
export const audience = process.env.AUDIENCE;
export const issuer = process.env.ISSUER;
export const authUrl = process.env.AUTHURL;
export const clientID = process.env.CLIENTID;
export const clientSecret = process.env.CLIENTSECRET;
