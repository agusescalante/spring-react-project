import { Navigate, Route, Routes } from "react-router-dom"
import { UsersPages } from "../pages/UsersPages"
import { NavBar } from "../components/layout/NavBar"
import { RegisterPages } from "../pages/RegisterPages"
import { UserProvider } from "../context/UserProvider"

export const UserRoutes = () => {
    
    return (
        <>
        <UserProvider>
        <NavBar />
            <Routes>

                <Route path='users' element={<UsersPages />}/>
                <Route path='users/register' element={<RegisterPages />} />
                <Route path='users/edit/:id' element={<RegisterPages />} />
                <Route path='/' element={<Navigate to="/users"/>}/>

            </Routes>
        </UserProvider>
        </>
    )
}