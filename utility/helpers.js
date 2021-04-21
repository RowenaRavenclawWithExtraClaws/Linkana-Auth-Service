import { tokenUserIndex } from "./constants.js";

export const parseValidationToken = (token) =>
  token.slice(tokenUserIndex, tokenUserIndex + Number(token[token.length - 1]));
