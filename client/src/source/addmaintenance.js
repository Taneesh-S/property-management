import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";

function AddMaintenance() {

    const [property, setProperty] = useState([]);

    const {
        register,
        handleSubmit,
        formState : { errors },
        reset
    } = useForm();

    useEffect(() => {
        Axios.get('http://localhost:1337/api/property_list')
            .then((response) => {
                setProperty(response.data);
            })
            .catch((error) => {
                console.error("Error fetching properties:", error);
            });
    }, []);
    

    function postdata() {
        const p_name = document.getElementById("p_name").value;
        const s_type = document.getElementById("s_type").value;
        const s_date = document.getElementById("s_date").value;
        const s_cost = document.getElementById("s_cost").value;
    
        Axios.post('http://localhost:1337/api/addservice', {
            p_name: p_name,
            s_type: s_type,
            s_date: s_date,
            s_cost: s_cost
        }).then((response) => {
            alert('Success');
            reset();
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
                                <div className="col-lg-12">
                                    <div className="contact-form">
                                        <h5 className="mb-2">Record a Service</h5>
                                        <p className="mb-5"></p>
                                        <form method="post" className="">
                                            <div className="form-grid">
                                                <div className="input-field">
                                                    <select name="p_name" id="p_name" {...register("p_name", { required: "Property Name is Mandatory" })}>
                                                        <option selected="">Select Property</option>
                                                        {property.length > 0 ? (
                                                            property.map((prop) => {
                                                                return (
                                                                    <option key={prop.pid} value={prop.p_name}>{prop.p_name}</option>
                                                                );
                                                            })
                                                        ) : (
                                                            <option>No Properties Available</option>
                                                        )}
                                                        
                                                    </select>
                                                    {errors.p_name && (
                                                        <span className="error" style={{color: "red"}}> 
                                                        {errors.p_name.message} 
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="input-field">
                                                    <select name="s_type" id="s_type" {...register("s_type", { required: "Service Type is Mandatory" })}>
                                                        <option selected="">Service Type</option>
                                                        <option>Plumbing</option>
                                                        <option>Electrical</option>
                                                        <option>General Maintenance</option>
                                                    </select>
                                                    {errors.s_type && (
                                                        <span className="error" style={{color: "red"}}> 
                                                        {errors.s_type.message} 
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="input-field">
                                                    <input type="date" name="s_date" id="s_date" {...register("s_date", { required: "Service Date is Mandatory" })} />
                                                    {errors.s_date && (
                                                        <span className="error" style={{color: "red"}}> 
                                                        {errors.s_date.message} 
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="input-field">
                                                    <input type="number" name="s_cost" id="s_cost" placeholder="Enter Cost" {...register("s_cost", { required: "Service Cost is Mandatory" })} />
                                                    {errors.s_cost && (
                                                        <span className="error" style={{color: "red"}}> 
                                                        {errors.s_cost.message} 
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                            <p className="mb-5"></p>
                                            <button type="submit" className="btn btn-primary btn-style mt-1" onClick={handleSubmit(postdata)}>Add Service Details</button>
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

export default AddMaintenance;