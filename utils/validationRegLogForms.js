export const validateEmail = (email) => {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
};

export const validatePassword = (password) => {
  // Al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo
  const regex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?#&+])[A-Za-z\d@$!%*?#&+]{8,}$/;
  return regex.test(password);
};

export const validateRegisterForm = ({
  name,
  lastName,
  email,
  password,
  repeatPassword,
}) => {
  const errors = {};

  if (!name.trim()) errors.name = "El nombre es obligatorio";
  if (!lastName.trim()) errors.lastName = "El apellido es obligatorio";

  if (!validateEmail(email)) errors.email = "Correo electrónico inválido";
  if (!validatePassword(password)) {
    errors.password =
      "La contraseña debe tener al menos 8 caracteres, una mayúscula, una minúscula, un número y un símbolo";
  }
  if (password !== repeatPassword)
    errors.repeatPassword = "Las contraseñas no coinciden";

  return errors;
};

export const validateLoginForm = ({ email, password }) => {
  const errors = {};

  if (!validateEmail(email)) errors.email = "Correo electrónico inválido";
  if (!password) errors.password = "La contraseña es obligatoria";

  return errors;
};
