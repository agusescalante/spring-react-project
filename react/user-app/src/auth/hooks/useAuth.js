import { useReducer } from "react";
import { loginReducer } from "../reducers/loginReducer";
import Swal from "sweetalert2";
import { loginUser } from "../services/authServices";
import { useNavigate } from "react-router-dom";

const initialLogin = JSON.parse(sessionStorage.getItem('login')) || {
    isAuth: false,
    user: undefined 
};

export const useAuth = () => {
    const[login, distpach] = useReducer(loginReducer, initialLogin);
    const navigate = useNavigate();


    const handlerLogin = (userLogin) =>{
        if(loginUser(userLogin)){
            const user = {username: 'admin'};
            distpach({
                type: 'login',
                payload: user
            });
            sessionStorage.setItem('login',JSON.stringify({
                isAuth:true,
                payload: user
            }));
            navigate('/users');
        } else {
            Swal.fire('Login error', 'Is not user registered?', 'error');
        }
    }

    const handlerLogOut = () => {
        distpach({
            type: 'logout'
        });
        sessionStorage.removeItem('login');
    }
    return {
        login,
        handlerLogOut,
        handlerLogin
    };
}