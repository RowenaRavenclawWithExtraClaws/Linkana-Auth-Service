import nodemailer from "nodemailer";
import { characters, email, password, tokenUserIndex } from "./constants.js";
import queries from "../prisma/queries.js";

// generate confirmation token with 15 characters
const generateRandomToken = (username, email) => {
  let token = "";
  let len = 15;

  while (len-- > 0)
    token = token.concat(
      characters[Math.floor(Math.random() * (characters.length - 1))]
    );

  // add username and email to the middle section of the token
  token = `${token.slice(0, tokenUserIndex)}${username}${email}${token.slice(
    tokenUserIndex,
    token.length
  )}${username.length}${email.length}`;

  return token;
};

const sendEmail = async (username, userEmail) => {
  const transporter = nodemailer.createTransport({
    service: "gmail",
    type: "oauth2",
    auth: {
      user: email,
      pass: password,
    },
  });

  const token = generateRandomToken(username, userEmail);

  try {
    const info = await transporter.sendMail({
      from: '"Linkana" <confirm@lincana.com>',
      to: userEmail,
      subject: "Confirm your email address",
      text: `Click the link below to verify your account.
        https://www.linkana.com/auth/confirm/${token}`,
    });

    queries.addToken(token);

    console.log(`Message sent: ${info.messageId}`);

    return true;
  } catch (err) {
    console.log(err);

    return false;
  }
};

export default sendEmail;
