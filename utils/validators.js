import validator from "validator";

export function validateUserInput(email, password, firstName, lastName) {
  const errors = [];

  if (!email) {
    errors.push("Email je obavezan");
  } else if (!validator.isEmail(email)) {
    errors.push("Email nije u dobrom formatu");
  }

  if (!password) {
    errors.push("Lozinka je obavezna");
  } else if (password.length < 6) {
    errors.push("Lozinka mora imati barem 6 karaktera");
  } else if (password.length > 20) {
    errors.push("Lozinka ne moze imati vise od 20 karaktera");
  }

  if (!firstName) {
    errors.push("Ime je obavezno");
  } else if (firstName.length < 2) {
    errors.push("Ime mora imati barem 2 karaktera");
  } else if (firstName.length > 100) {
    errors.push("Ime ne moze imati vise od 100 karaktera");
  }

  if (!lastName) {
    errors.push("Prezime je obavezno");
  } else if (lastName.length < 2) {
    errors.push("Prezime mora imati barem 2 karaktera");
  } else if (lastName.length > 100) {
    errors.push("Prezime ne moze imati vise od 100 karaktera");
  }

  return errors;
}
