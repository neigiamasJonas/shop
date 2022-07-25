import { Link } from "react-router-dom";

function Nav() {



    return(
        <>
            <div className="container">
                <div className="row">
                    <div className="col12">
                        <nav className="nav">
                            <div className="nav-link">Welcome</div>
                            <Link className="nav-link" to="/logout">Logout</Link>
                        </nav>
                        
                    </div>
                </div>
            </div>
        </>
    )
}

export default Nav;