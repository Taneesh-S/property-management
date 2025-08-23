import React from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";

function Register() {

    const {
        register,
        handleSubmit,
        formState : { errors },
        reset
    } = useForm();

    function postdata() {
        const u_name = document.getElementById("u_name").value;
        const u_email = document.getElementById("u_email").value;
        const u_contact = document.getElementById("u_contact").value;
        const u_pass = document.getElementById("u_pass").value;
    
        Axios.post('http://localhost:1337/api/adduser', {
            u_name: u_name,
            u_email: u_email,
            u_contact: u_contact,
            u_pass: u_pass
        }).then((response) => {

            const userConfirmed = window.confirm('Registration successful! Click OK to go to the login page.');

                if (userConfirmed) {
                    window.location = 'login'
                } else {
                    reset();
                }
        }).catch((error) => {
            console.error("Error in Axios request:", error);
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
                                        <h5 className="mb-2">Register User</h5>
                                        <p className="mb-5"></p>
                                        <form action="" method="post" className="">
                                            <div className="input-field">
                                                <input type="text" name="u_name" id="u_name" placeholder="User Name" {...register("u_name", { required: "User Name is Mandatory", pattern: { value: /^[a-zA-Z0-9._%+-]+[0-9]{2}$/, message: "Please enter a valid Username" } })} />
                                                {errors.u_name && (
                                                        <span className="error" style={{color: "red"}}> 
                                                        {errors.u_name.message} 
                                                        </span>
                                                    )}
                                            </div>
                                            <p className="mb-5"></p>
                                            <div className="input-field">
                                                    <input type="email" name="u_email" id="u_email" placeholder="Email" {...register("u_email", { required: "User Email is Mandatory", pattern: { value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/, message: "Please enter a valid Email Address" } })} />
                                                    {errors.u_email && (
                                                        <span className="error" style={{color: "red"}}> 
                                                        {errors.u_email.message} 
                                                        </span>
                                                    )}
                                            </div>
                                            <p className="mb-5"></p>
                                            <div className="input-field">
                                                    <input type="text" name="u_contact" id="u_contact" placeholder="Contact No." {...register("u_contact", { required: "User Contact Number is Mandatory", pattern: { value: /^[0-9]{10}$/, message: "Contact number should be of exactly 10 digits" } })}/>
                                                    {errors.u_contact && (
                                                        <span className="error" style={{color: "red"}}> 
                                                        {errors.u_contact.message} 
                                                        </span>
                                                    )}
                                            </div>
                                            <p className="mb-5"></p>
                                            <div className="input-field">
                                                <input type="password" name="u_pass" id="u_pass" placeholder="Password" {...register("u_pass", { required: "User Password is Mandatory", pattern: { value: /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,}$/, message: "Password must contain : 6 characters, atleast 1 lowercase, 1 uppercase letter, and 1 number" } })} />
                                                {errors.u_pass && (
                                                        <span className="error" style={{color: "red"}}> 
                                                        {errors.u_pass.message} 
                                                        </span>
                                                    )}
                                            </div>
                                            <p className="mb-5"></p>
                                            <button type="submit" name="registerbtn" className="btn btn-primary btn-style mt-1" onClick={handleSubmit(postdata)}>Register</button>
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

export default Register;