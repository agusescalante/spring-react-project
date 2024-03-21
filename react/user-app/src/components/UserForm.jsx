import { useContext, useEffect, useState } from "react";
import Swal from "sweetalert2";
import { UserContext } from "../context/UserContext";

export const UserForm = ({userSelected, handlerCloseForm}) => {

    const {initialUserForm, handlerAddUser, errors} = useContext(UserContext);

    const [userForm, setUserForm] = useState(initialUserForm);

    const {username, password, email, id} = userForm;
   
    useEffect(()=>{
        setUserForm({
            ...userSelected, password:''})
    }, [userSelected]);


    const onInputChange = ({target}) => {
        // console.log(target.value);
        const {name, value} = target;
        setUserForm({
            ...userForm,
            [name]: value
        });
    }

    const onCloseForm = () => {
        handlerCloseForm();
        setUserForm(initialUserForm);
    }


    const onSubmit = (e) => {
        // para evitar que se refresque pagina
        e.preventDefault();
        // console.log(userForm);
        // if((!password && id === 0) || !username || !email){
        //     Swal.fire({
        //         title: "Empty fields?",
        //         text: "Username and Email are not must be empty!",
        //         icon: "error"
        //       });
        //     return;
        // }
        // if(!email.includes('@')){
        //     Swal.fire(
        //         "Wrong email",
        //         "email must be validate, include '@'",
        //         "error"
        //       );
        //       return;
        // }
        handlerAddUser(userForm);
        //setUserForm(initialUserForm);
    }
    return(
        <>
        <form onSubmit={onSubmit} >
            <input 
                className="form-control my-3 w-75"
                placeholder="username"
                name="username"
                type="text" 
                value = {username}
                onChange={onInputChange}
            /><p className="text-danger"> { errors?.username } </p>
            {id > 0 || 
                <input 
                    className="form-control my-3 w-75"
                    placeholder="password"
                    name="password"
                    type="password" 
                    value = {password}
                    onChange={onInputChange}
                />
            }<p className="text-danger"> { errors?.password } </p>
            <input type="hidden"
            name="id"
            value = {id}
            />
            <input 
                className="form-control my-3 w-75"
                placeholder="email"
                name="email"
                type="text"
                value = {email}
                onChange={onInputChange} 
            /><p className="text-danger"> { errors?.email } </p>
            <button className="btn btn-primary" type="submit">{id > 0 ? "update" : "add"}</button>
            {!handlerCloseForm || <button className="btn btn-primary mx-2" type="button" onClick={() => onCloseForm()}>close</button>}
        </form>
        </>
    );
}