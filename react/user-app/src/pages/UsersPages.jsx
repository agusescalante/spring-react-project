import { useContext, useEffect } from "react";
import { UserList } from "../components/UserList";
import { UserModalForm } from "../components/UserModalForm";
import { UserContext } from "../context/UserContext";



export const UsersPages = () => {

    // lo tomamos del contexto
    const 
    {
        users,
        visibleForm,
        handlerOpenForm, 
        getUsers
    } = useContext(UserContext);
    
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
                    {visibleForm || 
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