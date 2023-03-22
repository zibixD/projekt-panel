import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage, { action as authAction } from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import { persistor, store } from "./store/storeMain";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import Alerts from "./UI/Alerts/Alerts";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    action: authAction,
  },
  {
    path: "firmy",
    element: <HomePage />,
  },
  {
    path: "firmy/:id",
    element: <CompanyDetailPage />,
  },
]);

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <Alerts />
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
  );
}

export default App;
