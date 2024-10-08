import { useEffect, useState } from "react";
import { UserForm } from "../components/UserForm";
import { useParams } from "react-router-dom";
import { useUsers } from "../hooks/useUsers";

export const RegisterPages = () => {

    const {users = [], initialUserForm} = useUsers();

    const[userSelected, setUserSelected] = useState(initialUserForm);

    const { id } = useParams();

    useEffect(()=> {
        if(id){
            const user = users.find( u => u.id.toString() === id) || initialUserForm;
            setUserSelected(user);
        }
    },[id])


    return (
        <div className="container my-4">
            <h4>{userSelected.id > 0 ? 'edit' : 'create' }   user</h4>
            <div className="row">
                <div className="col">
                    <UserForm userSelected = {userSelected}/>
                </div>
            </div>
        </div>
    );
}