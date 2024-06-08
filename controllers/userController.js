import {
  registerUser,
  deleteUser,
  getUserData,
} from "../services/userService.js";
import { validateUserInput } from "../utils/validators.js";

export async function handleRegister(req, res) {
  const { email, password, firstName, lastName } = req.body;

  const validationErrors = validateUserInput(
    email,
    password,
    firstName,
    lastName
  );

  if (validationErrors.length > 0) {
    return res.status(400).json({ success: false, errors: validationErrors });
  }

  const result = await registerUser(email, password, firstName, lastName);

  if (result.success) {
    res.status(201).json({ user: result.user });
  } else {
    res.status(400).json({ error: result.error });
  }
}

export async function handleDelete(req, res) {
  const { uid } = req.params;

  const result = await deleteUser(uid);

  if (result.success) {
    res.status(200).json({ message: result.message });
  } else {
    res.status(400).json({ error: result.error });
  }
}

export async function handleGetUser(req, res) {
  const { uid } = req.params;

  const result = await getUserData(uid);

  if (result.success) {
    res.status(200).json({ user: result.userData });
  } else {
    res.status(404).json({ error: result.error });
  }
}
