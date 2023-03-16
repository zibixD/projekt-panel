import { RouterProvider, createBrowserRouter } from "react-router-dom"
import LoginPage, { action as authAction } from "./pages/LoginPage";
import HomePage from "./pages/HomePage";
import CompanyDetailPage from "./pages/CompanyDetailPage"
import ErrorPage from './pages/ErrorPage'
import { checkAuthLoader, getAuthToken, tokenLoader } from './util/auth'

const router = createBrowserRouter([
    { path: '/',element: <LoginPage/>, errorElement: <ErrorPage/> , action: authAction, tokenLoader},
    { path: 'firmy', element: <HomePage/>, loader: checkAuthLoader,},
    { path: 'firmy/:companyName' , element: <CompanyDetailPage/>, loader: checkAuthLoader}

])

function App() {
    
    return (
    <RouterProvider router={router}></RouterProvider>
    )
}

export default App
