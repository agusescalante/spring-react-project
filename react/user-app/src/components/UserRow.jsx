import { NavLink } from "react-router-dom"
import { useAuth } from "../auth/hooks/useAuth";
import { useUsers } from "../hooks/useUsers";

export const UserRow = ({user}) => {

    const { handlerRemoveUser, handlerUserSelectedForm } = useUsers();
    const { login } = useAuth();
    return <>
        <tr key = {user.id}>
            <td>{user.id}</td>
            <td>{user.username}</td>
            <td>{user.email}</td>

            {!login.isAdmin || 
            <>
                <td>
                    <button 
                    className="btn btn-secundary btn-sm"
                    type="button" onClick={() => handlerUserSelectedForm(
                    {   id: user.id,
                        username: user.username,
                        email: user.email,
                        password: user.password,
                        admin: user.admin
                        })}>update</button>
                </td>
            
                <td>
                    <NavLink className="btn btn-secondary btn-sm" to = {'/users/edit/'+user.id}> update path</NavLink>
                </td>
                <td>
                    <button 
                    className="btn btn-danger btn-sm"
                    type="button" 
                    onClick={() => handlerRemoveUser(user.id)}>remove</button>
                </td>
            </>}
        </tr>
    </>
}