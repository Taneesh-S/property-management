import React, { useState, useEffect } from "react";
import Axios from "axios";

function User() {
    const [user, setUser] = useState([]);

    useEffect(() => {
        Axios.get('http://localhost:1337/api/user_list')
            .then((response) => {
                setUser(response.data);
            })
            .catch((error) => {
                console.error("Error fetching users :", error);
            });
    }, []);

    const handleDelete = (userId, userName) => {
        const currentUser = JSON.parse(sessionStorage.getItem('mydata'));

        if (window.confirm("Are you sure you want to delete this user?")) {
            Axios.delete(`http://localhost:1337/api/deleteUser/${userId}`)
                .then(() => {
                    alert("User deleted successfully");

                    if (currentUser.sname === userName) {
                        sessionStorage.removeItem('mydata');
                        window.location = '/';
                    } else {
                        setUser(user.filter(u => u.uid !== userId));
                    }
                })
                .catch((error) => {
                    console.error("Error deleting user:", error);
                });
        }
    };

    return (
        <>
            <section className="w3l-about-breadcrumb">
                <div className="breadcrumb-bg breadcrumb-bg-about pt-5">
                    <div className="container pt-lg-5 py-3">
                    </div>
                </div>
            </section>
            <div className="w3l-agentsblock py-5" id="team">
                <div className="container py-lg-5 py-md-4 py-2">
                    <h3 className="title-big text-center mb-lg-5 mb-4">All Users</h3>
                    <div className="row">
                        {user.length > 0 ? (
                            user.map((users) => {
                                return (
                                    <div className="col-lg-3 col-sm-6 column-item mt-lg-5 mt-5" key={users.uid}>
                                        <div className="users_box">
                                            <div className="users_box_info">
                                                <h4 className="user_title agent">
                                                    <a>{users.u_name}</a>
                                                </h4>
                                                <p className="user_position">{users.u_email}</p>
                                                <span className="phone-detail"><a>{users.u_contact}</a></span>
                                                <p className="mb-5"></p>
                                                <button
                                                    type="button"
                                                    style={{ backgroundColor: 'red', color: 'white', border: 'none' }}
                                                    className="btn btn-warning btn-style w-100"
                                                    onClick={() => handleDelete(users.uid, users.u_name)}
                                                >
                                                    <span className="fa fa-trash"></span> Delete User
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        ) : (
                            <p>No Users Available</p>
                        )}
                    </div>
                </div>
            </div>
        </>
    );
}

export default User;
