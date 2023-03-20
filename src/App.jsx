import { RouterProvider, createBrowserRouter } from "react-router-dom";
import LoginPage, { action as authAction } from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CompanyDetailPage from "./pages/CompanyDetailPage";
import ErrorPage from "./pages/ErrorPage";
import { checkAuthLoader, tokenLoader } from "./util/auth";
import  store  from './store/storeMain';
import { PersistGate } from "redux-persist/integration/react";
import persistStore from "redux-persist/es/persistStore";


const router = createBrowserRouter([
  {
    path: "/",
    element: <LoginPage />,
    errorElement: <ErrorPage />,
    action: authAction,
    tokenLoader,
  },
  { path: "firmy", element: <HomePage />, loader: checkAuthLoader },
  {
    path: "firmy/:id",
    element: <CompanyDetailPage />,
    loader: checkAuthLoader,
  },
]);

let persistor = persistStore(store)

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <RouterProvider router={router} />
      </PersistGate>
    </Provider>
    )
}

export default App;
