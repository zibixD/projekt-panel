import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage, { action as authAction } from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import ErrorPage from "./pages/ErrorPage";
import { persistor, store } from "./store/storeMain";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    action: authAction,
  },
  { path: "firmy", element: <HomePage /> },
  {
    path: "firmy/:id",
    element: <CompanyDetailPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
