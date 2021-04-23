import { tokenUserIndex } from "./constants.js";

export const parseValidationToken = (token) =>
  token.slice(tokenUserIndex, tokenUserIndex + Number(token[token.length - 1]));

// encrypt and decrypt user paswwords
export const code = (function () {
  return {
    encryptMessage: (messageToencrypt = "", secretkey = "eemxxiii") => {
      var encryptedMessage = aes.encrypt(messageToencrypt, secretkey);
      return encryptedMessage.toString();
    },
    decryptMessage: (encryptedMessage = "", secretkey = "eemxxiii") => {
      var decryptedBytes = aes.decrypt(encryptedMessage, secretkey);
      var decryptedMessage = decryptedBytes.toString(enc.Latin1);

      return decryptedMessage;
    },
  };
})();
