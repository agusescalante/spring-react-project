import { UserRow } from "./UserRow";
import { useAuth } from "../auth/hooks/useAuth";
import { useUsers } from "../hooks/useUsers";

export const UserList = ( ) => {

    const { users } = useUsers();
    const { login } = useAuth();
    return (
        <table className="table table-hover table-striped">

            <thead>
                <tr>
                    <th>#</th>
                    <th>username</th>
                    <th>email</th>
                    {!login.isAdmin || 
                        <>
                            <th>update</th>
                            <th>update path</th>
                            <th>remove</th>
                        </>
                    }
                </tr>
            </thead>
            <tbody>
                {
                users.map(user => (
                    <UserRow key = {user.id} user = {user} admin = {user.admin}/>
                ))
                }
            </tbody>
        </table>
    )
}