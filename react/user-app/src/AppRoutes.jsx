import { useSelector } from "react-redux";
import { Routes, Route, Navigate } from "react-router-dom";
import { LoginPage } from "./auth/pages/LoginPage";
import { UserRoutes } from "./routes/UserRoutes";


export const AppRoutes = () => {
    const { isAuth } = useSelector(state => state.auth);
    return(
            <Routes>
                {isAuth ? 
                        (<Route path='/*' element={<UserRoutes />}/>)
                        :
                        <>
                            <Route path='/login' element = {<LoginPage />}/>
                            <Route path='/*' element = {<Navigate to="/login" />}/>
                        </>
                }
            </Routes>
        );
}