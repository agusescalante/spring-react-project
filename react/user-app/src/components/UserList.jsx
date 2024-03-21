import { useContext } from "react";
import { UserRow } from "./UserRow";
import { UserContext } from "../context/UserContext";

export const UserList = ( ) => {

    const { users } = useContext(UserContext);
    return (
        <table className="table table-hover table-striped">

            <thead>
                <tr>
                    <th>#</th>
                    <th>username</th>
                    <th>email</th>
                    <th>update</th>
                    <th>update path</th>
                    <th>remove</th>
                </tr>
            </thead>
            <tbody>
                {
                users.map(user => (
                    <UserRow key = {user.id} user = {user}/>
                ))
                }
            </tbody>
        </table>
    )
}