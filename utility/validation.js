const validateUsername = (username) => {
  const usernameRegex = /^[a-zA-Z0-9]+$/;

  if (!username.match(usernameRegex)) return false;

  return true;
};

const validateFirstName = (name) => {
  const nameRegex = /^\S+\w{3,32}\S{1,}/;

  if (!name.match(nameRegex)) return false;

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

export const validateUserData = (user, edit = false) => {
  const isValidUsername = edit ? true : validateUsername(user.username);
  const isValidFirstName = user.first_name
    ? validateFirstName(user.first_name)
    : true;
  const isValidLastName = user.last_name
    ? validateFirstName(user.last_name)
    : true;
  const isValidEmail = edit ? true : validateEmail(user.email);

  return isValidUsername && isValidEmail && isValidFirstName && isValidLastName;
};

export const validateCompanyData = (company, edit = false) => {
  const isValidName = company.name ? validateCompanyName(company.name) : !edit;
  const isValidEmail = company.email ? validateEmail(company.email) : !edit;

  return isValidName && isValidEmail;
};

export const removeUserUneditableFields = (user) => {
  delete user.id;
  delete user.username;
};

export const removeCompanyUneditableFields = (company) => delete company.id;
