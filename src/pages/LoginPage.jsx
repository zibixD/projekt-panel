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

  const response = await fetch("https://dev.pgitdev.pl/auth/v2/user/login", {
    method: "post",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  });

  if (response.status === 422 || response.status === 401) {
    throw Error("???");
  }

  if (response.status === 400) {
    return json({ error: "Niepoprawny login i hasło" });
  }

  if (!response.ok) {
    throw json({ message: "Brak autoryzacji użytkownika" }, { status: 500 });
  }

  const resData = await response.json();
  const token = resData.access_token;
  const refreshToken = resData.refresh_token;
  const userId = resData.user_id;

  const expiration = new Date();
  expiration.setHours(expiration.getHours() + 2);

  await dispatch(
    login({
      token: token,
      refreshToken: refreshToken,
      expiration: expiration.toISOString(),
      userId,
    })
  );

  return redirect("firmy");
}
