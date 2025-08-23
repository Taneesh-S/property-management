import React from "react";
import Axios from "axios";
import Swal from 'sweetalert2'

function Login() {

    function login_data(event) {
        event.preventDefault();

        var u_name = document.getElementById('u_name').value;
        var u_pass = document.getElementById('u_pass').value;

        Axios.post('http://localhost:1337/api/data_verify', {u_name: u_name, u_pass: u_pass})
            .then((response) => {
                if (response.data.message) {
                    Swal.fire({
                        title: 'Incorrect',
                        text: response.data.message,
                        icon: 'error',
                        confirmButtonText: 'Okay',
                    }).then(function() {
                        window.location = "/login";
                    });
                } else {
                    let obj = {sname: response.data[0].u_name}
                    sessionStorage.setItem('mydata', JSON.stringify(obj));

                    Swal.fire({
                        title: 'Correct',
                        text: 'Welcome ' + response.data[0].u_name,
                        icon: 'success',
                        confirmButtonText: 'Okay',
                    }).then(function() {
                        window.location = "/";
                    });
                }
            })
            .catch((error) => {
                console.error("There was an error!", error);
            });
    }

    return (
        <>
            <section className="w3l-about-breadcrumb">
                <div className="breadcrumb-bg breadcrumb-bg-about pt-5">
                    <div className="container pt-lg-5 py-3"></div>
                </div>
            </section>

            <section className="w3l-contact-7 pt-5" id="contact">
                <div className="contacts-9 pt-lg-5 pt-md-4">
                    <div className="container">
                        <div className="top-map">
                            <div className="row map-content-9">
                                <div className="col-lg-8">
                                    <div className="contact-form">
                                        <h5 className="mb-2">Login User</h5>
                                        <p className="mb-5"></p>
                                        <form action="" method="post" className="" onSubmit={login_data}>
                                            <div className="input-field">
                                                <input type="text" name="u_name" id="u_name" placeholder="User Name"
                                                       required="" />
                                            </div>
                                            <p className="mb-5"></p>
                                            <div className="input-field">
                                                <input type="password" name="u_pass" id="u_pass" placeholder="Password"
                                                       required="" />
                                            </div>
                                            <p className="mb-5"></p>
                                            <p className="mb-5">New User ?? <a href="/register">Register</a></p>
                                            <button type="submit" name="loginbtn" className="btn btn-primary btn-style mt-1">
                                                Login
                                            </button>
                                        </form>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Login;
