import { useContext, useState } from "react";
import Swal from "sweetalert2";
import { AuthContext } from "../context/AuthContext";

const initialLoginForm = {username:'', password:''};
export const LoginPage = () => {

    const[loginForm, setLoginForm] = useState(initialLoginForm);
    const {username, password} = loginForm;
    const { handlerLogin } = useContext(AuthContext);

    const onInputChange = ({target}) =>{
        const {name, value} = target;
        setLoginForm({
            ...loginForm,
            [name]: value
        });
    }
    const onSubmit = (e) => {
        e.preventDefault();
        if(!username || !password)
            Swal.fire('Validation error', 'username and password required', 'error');

        handlerLogin({username, password});
        // validacion login
        
        setLoginForm(initialLoginForm);
    }
    return (
        <>
        <div className="modal" style={{display:"block"}} tabIndex="-1">
            <div className="modal-dialog">
                <div className="modal-content">
                    <div className="modal-header">
                        <h5 className="modal-title">Login Page</h5>
                    </div>
                    <form onSubmit={onSubmit}>
                        <div className="modal-body">
                            <input className="form-control my-3 w-74" type="text"
                                    placeholder="Username" name="username" value={username}
                                    onChange={ onInputChange }
                            />
                            <input className="form-control my-3 w-74" type="password"
                                    placeholder="Password" name="password" value= {password}
                                    onChange={ onInputChange }
                            />
                        </div>
                        <div className="modal-footer">
                            <button 
                                type="submit" 
                                className="btn btn-primary">LogIn
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );

}