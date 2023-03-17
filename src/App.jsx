import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage, { action as authAction } from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import ErrorPage from "./pages/ErrorPage";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import { action as logoutAction } from "./pages/Logout";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    action: authAction,
    tokenLoader,
  },
  { path: "firmy",
    element: <HomePage />, 
    loader: checkAuthLoader },
  {
    path: "firmy/:id",
    element: <CompanyDetailPage />,
    loader: checkAuthLoader,
  },
  {
    path: 'logout',
    action: logoutAction,
  }
]);

function App() {
  return (
    <RouterProvider router={router}/>
  )
}

export default App;
