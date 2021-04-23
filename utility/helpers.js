import { tokenUserIndex } from "./constants.js";
import aes from "crypto-js/aes.js";
import enc from "crypto-js/enc-latin1.js";

export const parseValidationToken = (token) => ({
  username: token.slice(
    tokenUserIndex,
    tokenUserIndex + Number(token[token.length - 3])
  ),
  email: token.slice(
    tokenUserIndex + Number(token[token.length - 3]),
    tokenUserIndex +
      Number(token[token.length - 3]) +
      Number(token[token.length - 2]) * 10 +
      Number(token[token.length - 1])
  ),
});

// encrypt and decrypt user paswwords
export const code = (function () {
  return {
    encryptMessage: (messageToencrypt = "", secretkey = "eemxxiii") => {
      var encryptedMessage = aes.encrypt(messageToencrypt, secretkey);
      return encryptedMessage.toString();
    },
    decryptMessage: (encryptedMessage = "", secretkey = "eemxxiii") => {
      var decryptedBytes = aes.decrypt(encryptedMessage, secretkey);
      var decryptedMessage = decryptedBytes.toString(enc);

      return decryptedMessage;
    },
  };
})();

// used mainly to delete password field from user objects
export const deleteObjectsField = (objects, fields) =>
  objects.map((obj) => {
    fields.forEach((field) => {
      delete obj[field];
    });
    return obj;
  });
