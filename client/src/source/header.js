import React, { useState, useEffect } from "react";

function Header() {

    const [userName, setUserName] = useState(null);

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('mydata'));
        if (storedUser && storedUser.sname) {
            setUserName(storedUser.sname)
        }
    }, []);

    const handleLogout = () => {
        sessionStorage.clear();
        setUserName(null);
        window.location = '/';
    }

    return (
        <>
            <header id="site-header" className="fixed-top navbar-scrolled">
                <div className="container">
                    <nav className="navbar navbar-expand-lg stroke px-0">
                        <h1> <a className="navbar-brand" href="/">
                            <span className="fa fa-home"></span> Property Solutions
                        </a>
                        </h1>
                        <button className="navbar-toggler  collapsed bg-gradient" type="button" data-toggle="collapse"
                            data-target="#navbarTogglerDemo02" aria-controls="navbarTogglerDemo02" aria-expanded="false"
                            aria-label="Toggle navigation">
                            <span className="navbar-toggler-icon fa icon-expand fa-bars"></span>
                            <span className="navbar-toggler-icon fa icon-close fa-times"></span>
                        </button>

                        <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
                            <ul className="navbar-nav ml-lg-5 mr-auto">
                                <li className="nav-item active">
                                    <a className="nav-link" href="/">Home <span className="sr-only">(current)</span></a>
                                </li>
                                {userName && (
                                    <>
                                        <li className="nav-item @@listing__active">
                                            <a className="nav-link" href="/addProperty">Add Property</a>
                                        </li>
                                        <li className="nav-item @@listing__active">
                                            <a className="nav-link" href="/addMaintenance">Maintenance</a>
                                        </li>
                                        {userName == "Admin" && (
                                            <li className="nav-item @@listing__active">
                                                <a className="nav-link" href="/user">Manage Users</a>
                                            </li>
                                        )}
                                    </>
                                )}
                            </ul>
                            <div className="top-quote mt-lg-0">
                                {userName ? (
                                    <>
                                        <ul className="navbar-nav ml-lg-5 mr-auto">
                                            <li className="nav-item @@listing__active">
                                                <a className="nav-link">Welcome {userName}</a>
                                                <button onClick={handleLogout} className="btn btn-style btn-primary">
                                                    <span className="fa fa-sign-out"></span> Logout
                                                </button>
                                            </li>
                                        </ul>
                                    </>
                                ) : (
                                    <a href="/login" className="btn btn-style btn-primary"> <span className="fa fa-user"></span> Login </a>
                                )}
                            </div>
                        </div>
                    </nav>
                </div>
            </header>
        </>
    );
}

export default Header;