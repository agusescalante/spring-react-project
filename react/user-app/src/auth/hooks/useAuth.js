import Swal from "sweetalert2";
import { loginUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { onLogin, onLogout, onSetLoging } from "../../store/slices/auth/authSlice";



export const useAuth = () => {
    const distpach = useDispatch();
    // const[login, distpach] = useReducer(loginReducer, initialLogin);
    const { user, isAdmin, isAuth} = useSelector( state => state.auth);
    const navigate = useNavigate();


    const handlerLogin = async (userLogin) => {
        try{
            distpach(onSetLoging());
            const response = await loginUser(userLogin);
            const token = response.data.token;
            const claims = JSON.parse(window.atob(token.split(".")[1])); // payload
            
            const user = {username: claims.sub}; // si en el back no definimos "username" viene como sub, claims.sub
            distpach(onLogin({user, isAdmin: claims.isAdmin}));

            sessionStorage.setItem('login',JSON.stringify({
                isAuth: true,
                isAdmin: claims.isAdmin,
                user
            }));

            sessionStorage.setItem('token', `Bearer ${token}`);
            navigate('/users');
        } catch (error) { // do to manejador error
            distpach(onLogout());
            if(error.response?.status == 401){
                Swal.fire('Login error', 'Is not user registered?', 'error');
            }else if(error.response?.status == 403){
                Swal.fire('Login error', 'havent access resource', 'error');
            } else {
                throw error;
            }

        }
    }

    const handlerLogOut = () => {
        distpach(onLogout());
        sessionStorage.removeItem('token');
        sessionStorage.removeItem('login');
        sessionStorage.clear();
    }
    return {
        login: {
            user,
            isAdmin,
            isAuth
        },
        handlerLogOut,
        handlerLogin
    };
}