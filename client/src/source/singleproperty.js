import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Axios from "axios";

function SingleProperty() {
    const { id } = useParams();
    const [userName, setUserName] = useState(null);
    const [property, setProperty] = useState(null);
    const [services, setServices] = useState([]);

    useEffect(() => {
        const storedUser = JSON.parse(sessionStorage.getItem('mydata'));
        if (storedUser && storedUser.sname) {
            setUserName(storedUser.sname)
        }
    }, []);

    useEffect(() => {
        Axios.get(`http://localhost:1337/api/property/${id}`)
            .then((response) => {
                setProperty(response.data);
            })
            .catch((error) => {
                console.error("Error fetching property details:", error);
            });

        Axios.get(`http://localhost:1337/api/services/${id}`)
            .then((response) => {
                setServices(response.data);
            })
            .catch((error) => {
                console.error("Error fetching service records:", error);
            });
    }, [id]);

    const handleDelete = () => {
        if (window.confirm("Are you sure you want to delete this property?")) {
            Axios.delete(`http://localhost:1337/api/deleteProperty/${id}`)
                .then(() => {
                    alert("Property deleted successfully");
                    window.location = '/';
                })
                .catch((error) => {
                    console.error("Error deleting property:", error);
                });
        }
    }

    if (!property) {
        return <div>Loading...</div>;
    }

    return (
        <>
            <section className="w3l-about-breadcrumb">
                <div className="breadcrumb-bg breadcrumb-bg-about pt-5"></div>
            </section>
            <section className="w3l-about-breadcrumb">
                <div className="breadcrumb-bg breadcrumb-bg-about pt-5">
                    <div className="container pt-lg-5 py-3">
                    </div>
                </div>
            </section>
            <section className="w3l-blog post-content py-5">
                <div className="container py-lg-4 py-md-3 py-2">
                    <div className="post-content">
                        <h1 className="title-single"><u><i>{property.p_name}</i></u></h1>
                        <div className="blo-singl mb-4">
                            <ul className="blog-single-author-date align-items-center"></ul>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-lg-8 w3l-news">
                            <div className="blog-single-post">
                                <div className="single-post-image mb-5">
                                    <div className="item">
                                        <div className="card">
                                            <img src={`http://localhost:1337/imgupload/${property.p_image}`} style={{ width: '600px', height: '400px' }} className="img-fluid radius-image" alt={property.p_name} />
                                        </div>
                                    </div>
                                </div>
                                <div className="single-post-content">
                                    <h3 className="post-content-title mb-3">Address</h3>
                                    <p className="mb-4">{property.p_address}</p>
                                    
                                    <h3 className="post-content-title mb-3">Service Record</h3>
                                    {services.length > 0 ? (
                                        services.map((service) => (
                                            <p className="mb-4" key={service.sid}>
                                                {service.s_type} - {new Date(service.s_date).toLocaleDateString()}
                                            </p>
                                        ))
                                    ) : (
                                        <p>No service records available for this property.</p>
                                    )}
                                </div>
                            </div>
                        </div>
                        {userName == "Admin" && (
                        <div className="sidebar-side col-lg-4 col-md-12 col-sm-12 mt-lg-0 mt-5">
                            <aside className="sidebar">
                                <div className="sidebar-widget popular-posts">
                                    <div className="sidebar-title">
                                        <h4>Functionalities</h4>
                                    </div>
                                    <button type="submit" style={{ backgroundColor: 'red', color: 'white', border: 'none' }} className="btn btn-warning btn-style w-100" onClick={handleDelete}>
                                        <span className="fa fa-trash"></span> Delete Property
                                    </button>
                                </div>
                            </aside>
                        </div>
                        )}
                    </div>
                </div>
            </section>
        </>
    );
}

export default SingleProperty;


