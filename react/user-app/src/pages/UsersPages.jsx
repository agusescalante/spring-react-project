import { useEffect } from "react";
import { UserList } from "../components/UserList";
import { UserModalForm } from "../components/UserModalForm";
import { useAuth } from "../auth/hooks/useAuth";
import { useUsers } from "../hooks/useUsers";



export const UsersPages = () => {

    const { login } = useAuth();
    // lo tomamos del contexto
    const 
    {
        users,
        visibleForm,
        handlerOpenForm, 
        getUsers
    } = useUsers();
    
    useEffect(() => {
        getUsers();
    },[]);
    
    return(<>
        {!visibleForm ||
            <UserModalForm />
        }
        <div className="container my-4">
            <h3>User App</h3>
            <div className="row">
                    
                    <div className="col">
                    { (visibleForm || !login.isAdmin)  || 
                        <button 
                            className="btn btn-primary my-2" onClick={handlerOpenForm}>new user
                        </button>
                    }
                    {
                    users.length === 0 ? <div className="alert alert-warning">No users</div>
                        : 
                        <UserList />
                    }
                    </div>
            </div>
        </div>
        </>);
}