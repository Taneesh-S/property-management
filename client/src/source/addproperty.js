import React, { useState } from "react";
import { useForm } from "react-hook-form";
import Axios from "axios";

function AddProperty() {

    const {
        register,
        handleSubmit,
        formState: { errors },
        reset
    } = useForm();

    const [filename, setFilename] = useState("");

    function postdata(data) {
    
        let formData = new FormData();
        formData.append("filename", filename);
        formData.append("p_name", data.p_name);
        formData.append("p_type", data.p_type);
        formData.append("p_address", data.p_address);
        formData.append("p_date", data.p_date);
    
        Axios.post('http://localhost:1337/api/addpro', formData, {
            Headers: {"Content-Type": "multipart/form-data"}
        }).then((response) => {
            alert('Success');
            reset();
        }).catch((error) => {
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
                                <div className="col-lg-12">
                                    <div className="contact-form">
                                        <h5 className="mb-2">Add a Property</h5>
                                        <p className="mb-5"></p>
                                        <form action="" method="post" className="">
                                            <div className="form-grid">
                                                <div className="input-field">
                                                    <input type="text" name="p_name" id="p_name" {...register("p_name", { required: "Property Name is Mandatory" })} placeholder="Property Name" />
                                                    {errors.p_name && (
                                                        <span className="error" style={{color: "red"}}> 
                                                        {errors.p_name.message} 
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="input-field">
                                                    <select name="p_type" id="p_type" {...register("p_type", { required: "Property Type is Mandatory" })}>
                                                        <option value="" disabled selected>Property Type</option>
                                                        <option>House</option>
                                                        <option>Apartment</option>
                                                        <option>Commercial</option>
                                                    </select>
                                                    {errors.p_type && (
                                                        <span className="error" style={{color: "red"}}> 
                                                        {errors.p_type.message} 
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="input-field">
                                                    <input name="p_address" id="p_address" {...register("p_address", { required: "Property Address is Mandatory" })} placeholder="Address" />
                                                    {errors.p_address && (
                                                        <span className="error" style={{color: "red"}}> 
                                                        {errors.p_address.message}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="input-field">
                                                    <input type="date" name="p_date" id="p_date" {...register("p_date", { required: "Purchase Date is Mandatory" })} />
                                                    {errors.p_date && (
                                                        <span className="error" style={{color: "red"}}> 
                                                        {errors.p_date.message}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="input-field">
                                                    <input type="file" name="p_img" id="p_image" {...register("p_image", { required: "Property Image is Mandatory" })} onChange={(e) => setFilename(e.target.files[0])} />
                                                    {errors.p_image && (
                                                        <span className="error" style={{color: "red"}}> 
                                                        {errors.p_image.message}
                                                        </span>
                                                    )}
                                                </div>
                                                <div className="input-field"></div>
                                            </div>
                                            <p className="mb-5"></p>
                                            <button type="submit" className="btn btn-primary btn-style mt-3" onClick={handleSubmit(postdata)}>Add Property</button>
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

export default AddProperty;
