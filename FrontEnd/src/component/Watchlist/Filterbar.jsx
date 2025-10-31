function Filterbar() {
    return (
        <nav className="navbar navbar-expand-lg bg-body-tertiary">
            <div className="container-fluid">
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                    <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                        <li className="nav-item">
                            <a className="nav-link active" aria-current="page" href="#">Arrange By: </a>
                        </li>
                        <li className="nav-item dropdown">
                            <a className="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">
                                Company Name
                            </a>
                            <ul className="dropdown-menu">
                                <li><a className="dropdown-item" href="#">Performance</a></li>
                                <li><a className="dropdown-item" href="#">Sector</a></li>
                            </ul>
                        </li>
                    </ul>
                    <form className="d-flex" role="search">
                        <input className="form-control me-2" type="search" placeholder="Search within watchlist" aria-label="Search" />
                        <button className="btn btn-outline-success" type="submit">Delete</button>
                    </form>
                </div>
            </div>
        </nav>
    );
}

export default Filterbar;