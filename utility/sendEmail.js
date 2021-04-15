import nodemailer from "nodemailer";
import { characters } from "./constants.js";

// generate confirmation token with 15 characters
const generateRandomToken = () => {
  let token = "";
  let len = 15;

  while (len-- > 0)
    token = token.concat(
      characters[Math.floor(Math.random() * (characters.length - 1))]
    );

  return token;
};

const sendEmail = async (userEmail) => {
  const account = await nodemailer.createTestAccount();

  const transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: account.user, // generated ethereal user
      pass: account.pass, // generated ethereal password
    },
  });

  const token = generateRandomToken();

  try {
    const info = await transporter.sendMail({
      from: '"Linkana" <confirm@lincana.com>',
      to: userEmail,
      subject: "Confirm your email address",
      text: `Click the link below to verify your account.
        https://www.linkana.com/auth/confirm/${token}`,
    });

    console.log(`Message sent: ${info.messageId}`);

    return true;
  } catch (err) {
    console.log(err);

    return false;
  }
};

export default sendEmail;
