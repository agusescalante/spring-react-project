import { useEffect } from "react";
import { UserList } from "../components/UserList";
import { UserModalForm } from "../components/UserModalForm";
import { useAuth } from "../auth/hooks/useAuth";
import { useUsers } from "../hooks/useUsers";
import { useParams } from "react-router-dom";
import { Paginator } from "../components/Paginator";



export const UsersPages = () => {

    const { page } = useParams();

    const { login } = useAuth();
    const 
    {
        users,
        visibleForm,
        isLoading,
        paginator,
        handlerOpenForm,
        getUsers
    } = useUsers();
    
    useEffect(() => {
        getUsers(page);
    }, [, page]); // se activa cuando cambia de pagina tambien

    if(isLoading){
        return(<div className="container my-4 text-center">
            <div className="spinner-border text-info" role="status">
                <span className="visually-hidden">Loading...</span>
            </div>
        </div>);
    }

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
                        <>
                            <UserList />
                            <Paginator url="/users/page" paginator = { paginator }/>
                        </>
                    }
                    </div>
            </div>
        </div>
        </>);
}