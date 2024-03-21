import { useReducer, useState } from "react";
import { usersReducer } from "../reducers/usersReducer";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAll, remove, save, update } from "../services/userService";

const initialUsers = [];

const initialUserForm =  {
    id: 0,
    username: '',
    password: '',
    email: ''
};

const initialErrors =  {
    username: null,
    password: null,
    email: null
};
export const useUsers = () => {

    const [users, dispatch] = useReducer(usersReducer, initialUsers);
    const[userSelected, setUserSelected] = useState(initialUserForm);
    const[visibleForm, setVisibleForm] = useState(false);
    const navigate = useNavigate();
    const[errors, setErrors] = useState(initialErrors);
    const getUsers = async () => {
        const result = await findAll();

        //console.log(result.data);
        try {
            dispatch({
                type: 'loadingUsers',
                payload: result.data
            });
        } catch (error) {
           // console.log('no conection to server');
        }
    }

    const handlerAddUser = async (user) => {

        let response;
        try {
            if (user.id == 0)
                response = await save(user);
            else
                response = await update(user);

            let type = (user.id == 0) ? 'A' : 'U';
            dispatch({
                type,
                payload: response.data
            });

            Swal.fire({
                title: (type === 'U') ? 'User  updated' : 'User created',
                text: (type === 'U') ? 'User updated' : 'User created successly!',
                icon: "success"
            }
            );
            handlerCloseForm();
            navigate('/users');
        } catch (error) { // todo: refactor error handler
            if(error.response && error.response.status == 400) {
                setErrors(error.response.data);
            } else if(error.response && error.response.status == 500
                && error.response.data?.message?.includes('constraint')) { 

                    if(error.response.data?.message?.includes('UK_username'))
                        setErrors({username: 'Username already exists'})
                    if(error.response.data?.message?.includes('UK_email'))
                        setErrors({email: 'Email already exists'})
            } else 
                throw error; // otro error
        }
    }

    const handlerRemoveUser = (id) => {
       
        // pop-up window
        Swal.fire({
            title: "Are you sure?",
            text: "You won't be able to revert this!",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
          }).then((result) => {
            if (result.isConfirmed) {
                remove(id);
                dispatch({
                    type: 'D',
                    payload: id
                });
                Swal.fire({
                    title: "Deleted!",
                    text: "Your file has been deleted.",
                    icon: "success"
                });
            }
          });
    }

    const handlerUserSelectedForm = (user) => {
        setVisibleForm(true);
        setUserSelected({...user});
    }

    const handlerOpenForm = () => {
        setVisibleForm(true);
    }

    const handlerCloseForm = () => {
        setVisibleForm(false);
        setUserSelected(initialUserForm);
        setErrors({username:'', email:'', password:''});
    }
    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        initialErrors,
        errors,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers
    }
}