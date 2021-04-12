import jwt from "express-jwt";
import jwksRsa from "jwks-rsa";
import { audience, jwksUri, issuer } from "../utility/constants.js";

// creating JWT middleware
const checkJwt = jwt({
  secret: jwksRsa.expressJwtSecret({
    cache: true,
    rateLimit: true,
    jwksRequestsPerMinute: 5,
    jwksUri: `${jwksUri}`,
  }),

  // Validate the audience and the issuer.
  audience: audience,
  issuer: issuer,
  algorithms: ["RS256"],
});

export default checkJwt;
