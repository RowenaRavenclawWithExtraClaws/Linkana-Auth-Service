import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";

// creating JWT middleware
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `https://dev-np4yj8c0.eu.auth0.com/.well-known/jwks.json`,
  }),

  // Validate the audience and the issuer.
  audience: "https://auth-api",
  issuer: `https://dev-np4yj8c0.eu.auth0.com/`,
  algorithms: ["RS256"],
});

export default checkJwt;
