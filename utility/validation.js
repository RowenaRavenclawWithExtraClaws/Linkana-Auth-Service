const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9]+$/;

  if (!username.match(usernameRegex)) return false;

  return true;
};

const validateFirstName = (name) => {
  const nameRegex = /^\S+\w{8,32}\S{1,}/;

  if (!nname.match(nameRegex)) return false;

  return true;
};

const validateCompanyName = (name) => {
  const nameRegex = /^((?![\^!@#$*~ <>?]).)((?![\^!@#$*~<>?]).){0,73}((?![\^!@#$*~ <>?]).)$/;

  if (!name.match(nameRegex)) return false;

  return true;
};

const validateEmail = (email) => {
  const emailRegx = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return email.match(emailRegx);
};

export const validateUserData = (user) => {
  const isValidUsername = validateUsername(user.username);
  const isValidFirstName = user.first_name
    ? validateFirstName(user.first_name)
    : false;
  const isValidLastName = user.last_name
    ? validateLastName(user.last_name)
    : false;
  const isValidEmail = validateEmail(user.email);

  return isValidUsername && isValidEmail && isValidFirstName && isValidLastName;
};

export const validateCompanyData = (company) => {
  const isValidName = validateCompanyName(company.name);
  const isValidEmail = validateEmail(company.email);

  return isValidname && isValidEmail;
};
