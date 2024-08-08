import { NavLink } from "react-router-dom";
import { useAuth } from "../../auth/hooks/useAuth";

export const NavBar = () => {

    const { login, handlerLogOut } = useAuth();
    //const { user } = login;
    return( <nav className="navbar navbar-expand-lg bg-body-tertiary">
        <div className="container-fluid">
            <a className="navbar-brand" href="#"></a>
            <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>

            <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav">
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/users">Users</NavLink>
                    </li>
                    { !login.isAdmin ||
                    <li className="nav-item">
                        <NavLink className="nav-link" to="/users/register">Register user</NavLink>
                    </li>
                    }
                </ul>
            </div>

            <div className="collapse navbar-collapse justify-content-end" id="navbarSupportedContent-logOut">
                <span className="nav-item nav-link text-primary mx-3">
                    {login.user?.username}
                </span>
                <button className="btn btn-outline-success" onClick={handlerLogOut}>Log Out</button>
            </div>
        </div>
    </nav>);

}