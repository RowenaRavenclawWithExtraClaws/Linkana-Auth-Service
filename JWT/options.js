import { authUrl } from "../utility/constants.js";

// options object for JWT request
const options = {
  method: "POST",
  url: authUrl,
  headers: { "content-type": "application/json" },
  body:
    '{"client_id":"SMZrZVSyipDwLBhPglfHfo0NKNUShWXU","client_secret":"7XGjlKKQiX2RTiUfJej_0wi-7FKbs7yVzabAz7Abocy-fE2dSQ7Tx4kCI17TdZLR","audience":"https://auth-api","grant_type":"client_credentials"}',
};

export default options;
