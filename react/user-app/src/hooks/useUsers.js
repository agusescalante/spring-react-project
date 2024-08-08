import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import { findAllPages, remove, save, update } from "../services/userService";
import { useDispatch, useSelector } from "react-redux";
import { loadingUser, removeUser, updateUser, addUser, onUserSelectedForm, onOpenForm, initialUserForm, loadingError, onCloseForm } from "../store/slices/users/usersSlice";
import { useAuth } from "../auth/hooks/useAuth";



export const useUsers = () => {

    const { users, userSelected, visibleForm, errors, isLoading, paginator} = useSelector(state => state.users);
    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {login, handlerLogOut} = useAuth();


    const getUsers = async (page = 0) => {

        try {
            const result = await findAllPages(page);
        
            dispatch(loadingUser(result.data));
            
        } catch (error) {
            if(error.response?.status == 401) { // token expirated
                handlerLogOut();
            }
        }
    }

    const handlerAddUser = async (user) => {

        if(!login.isAdmin) return;
        let response;
        try {
            
            let type = 'U';
            if (user.id == 0){
                response = await save(user);
                dispatch(addUser(response.data));
                type = 'A';
            } else {
                response = await update(user);
                dispatch(updateUser(response.data));
            }

            Swal.fire({
                title: (type === 'U') ? 'User  updated' : 'User created',
                text: (type === 'U') ? 'User updated' : 'User created successly!',
                icon: "success"
                });
            handlerCloseForm();
            navigate('/users');
        } catch (error) { // todo: refactor error handler
            if(error.response && error.response.status == 400) {
                dispatch(loadingError(error.response.data));
            } else if(error.response && error.response.status == 500
                && error.response.data?.message?.includes('constraint')) { 

                    if(error.response.data?.message?.includes('UK_username'))
                        dispatch(loadingError({username: 'Username already exists'}));
                    if(error.response.data?.message?.includes('UK_email'))
                        dispatch(loadingError({email: 'Email already exists'}));
            } else if(error.response?.status == 401) { // token expirated
                handlerLogOut();
            }
            
            else 
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
          }).then( async (result) => {
            if (result.isConfirmed) {
                try {
                    await remove(id);
                    dispatch(removeUser(id));
                    Swal.fire({
                        title: "Deleted!",
                        text: "user with ID "+ id +" has been deleted.",
                        icon: "success"
                    });
                } catch (error) {
                    if(error.response?.status == 401) { // token expirated
                        handlerLogOut();
                    }
                }
            }
          });
    }

    const handlerUserSelectedForm = (user) => {
        dispatch(onUserSelectedForm({...user}));
    }

    const handlerOpenForm = () => {
        dispatch(onOpenForm());
    }

    const handlerCloseForm = () => {
        dispatch(onCloseForm());
        dispatch(loadingError({username:'', email:'', password:''}));
    }
    return {
        users,
        userSelected,
        initialUserForm,
        visibleForm,
        errors,
        isLoading,
        paginator,
        handlerAddUser,
        handlerRemoveUser,
        handlerUserSelectedForm,
        handlerOpenForm,
        handlerCloseForm,
        getUsers
    }
}