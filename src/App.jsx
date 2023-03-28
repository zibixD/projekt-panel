import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage, { action as authAction } from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import { persistor, store } from "./store/storeMain";
import { PersistGate } from "redux-persist/integration/react";
import { Provider } from "react-redux";
import Alerts from "./UI/Alerts/Alerts";
import ErrorPage
 from "./pages/ErrorPage";
import EditDetailsPage from "./pages/EditDetailsPage";
import AddUserPage from "./pages/AddUserPage";

const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    action: authAction,
    errorElement: <ErrorPage/>
  },
  {
    path: "firmy",
    element: <HomePage />,
  },
  {
    path: "firmy/:id",
    id: 'detail-id',
    children: [
      {
        index: true,
        element: <CompanyDetailPage />, 
      },
      {
        path: "edit",
        element: <EditDetailsPage/>
      },
      {
        path: "add",
        element: <AddUserPage/>
      },
    ]
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
