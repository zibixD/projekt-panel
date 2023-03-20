import { json, redirect } from "react-router-dom";
import { dispatch } from "../store/storeMain";

import LoginForm from "../components/LoginForm";
import { login } from "../store/authReducer";

const LoginPage = () => {
  return <LoginForm />;
};

export default LoginPage;

export async function action({ request }) {
  const formData = await request.formData();
  const username = formData.get("email");
  const password = formData.get("password");

  if (username !== "admin@polskagrupa.it" || password !== "admin") {
    alert("Niepoprawny email lub hasło");
    return null;
  }

  const response = await fetch("https://dev.pgitdev.pl/auth/v2/user/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  await new Promise((resolve) => setTimeout(resolve, 1000));

  if (response.status === 422 || response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Brak autoryzacji użytkownika" }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.access_token;

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 2);

  await dispatch(login({ token: token, expiration: expiration.toISOString() }));

  return redirect("firmy");
}
