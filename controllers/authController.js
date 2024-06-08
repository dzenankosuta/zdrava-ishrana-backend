import { loginUser } from "../services/authService.js";

export async function handleLogin(req, res) {
  const { email, password } = req.body;

  const result = await loginUser(email, password);

  if (result.success) {
    const { user, access_token } = result;
    res.status(200).json({
      user: user,
      access_token: access_token,
    });
  } else {
    res.status(400).json({ error: result.error });
  }
}
