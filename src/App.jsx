import { RouterProvider, createBrowserRouter } from "react-router-dom"
import LoginPage, { action as authAction } from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CompanyDetailPage from "./pages/CompanyDetailPage"
import { checkAuthLoader, tokenLoader } from './util/auth'
import { loader } from "../../kurs-authFront/src/pages/EventDetail";

const router = createBrowserRouter([
    { path: '/',element: <LoginPage/>, action: authAction, tokenLoader},
    { path: 'firmy', element: <HomePage/>, loader: checkAuthLoader},
    { path: 'firmy/:company-detail', element: <CompanyDetailPage/>, loader: checkAuthLoader}
])

function App() {
    
    return (
    <RouterProvider router={router}></RouterProvider>
    )
}

export default App
