import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Axios from "axios";

function Main() {
    const [property, setProperty] = useState([]);
    const [filteredProperties, setFilteredProperties] = useState([]);
    const [propertyType, setPropertyType] = useState("");
    const [country, setCountry] = useState("");

    useEffect(() => {
        Axios.get('http://localhost:1337/api/property_list')
            .then((response) => {
                setProperty(response.data);
                setFilteredProperties(response.data);
            })
            .catch((error) => {
                console.error("Error fetching properties:", error);
            });
    }, []);

    const handleSearch = (event) => {
        event.preventDefault();

        const filtered = property.filter((prop) => {
            const [city, propCountry] = prop.p_address.split(", ");
            return (
                (propertyType === "" || prop.p_type === propertyType) &&
                (country === "" || propCountry.toLowerCase() === country.toLowerCase())
            );
        });
        setFilteredProperties(filtered);
    };

    return (
        <>
            <section className="w3l-cover-3">
                <div className="cover top-bottom">
                    <div className="container">
                        <div className="middle-section text-center">
                            <div className="section-width">
                                <p>It's great to be home!</p>
                                <h2>Find a property today</h2>
                                <div className="most-searches"></div>
                                <form className="w3l-cover-3-gd" onSubmit={handleSearch}>
                                    <input
                                        type="search"
                                        name="text"
                                        placeholder="Search For a Property"
                                        readOnly
                                    />
                                    <span className="input-group-btn">
                                        <select
                                            className="btn btn-default"
                                            required
                                            onChange={(e) => setPropertyType(e.target.value)}
                                        >
                                            <option value="">Select Type</option>
                                            <option>House</option>
                                            <option>Apartment</option>
                                            <option>Commercial</option>
                                        </select>
                                    </span>
                                    <span className="input-group-btn">
                                        <select
                                            className="btn btn-default"
                                            required
                                            onChange={(e) => setCountry(e.target.value)}
                                        >
                                            <option value="">Select Country</option>
                                            <option>Canada</option>
                                            <option>China</option>
                                            <option>Germany</option>
                                            <option>India</option>
                                            <option>Japan</option>
                                            <option>UK</option>
                                            <option>USA</option>
                                        </select>
                                    </span>
                                    <button type="submit" className="btn-primary">Search</button>
                                </form>
                            </div>
                            <section id="bottom" className="demo">
                                <a href="#bottom"><span></span>Scroll</a>
                            </section>
                        </div>
                    </div>
                </div>
            </section>

            <section className="locations-1" id="locations">
                <div className="locations py-5">
                    <div className="container py-lg-5 py-md-4 py-2">
                        <div className="heading text-center mx-auto">
                            <h3 className="title-big">Top Properties</h3>
                        </div>
                        <div className="row pt-md-5 pt-4">
                            {filteredProperties.length > 0 ? (
                                filteredProperties.map((prop) => {
                                    const formattedDate = new Date(prop.p_date).toLocaleDateString('en-GB');
                                    return (
                                        <div className="col-lg-4 col-md-6 mb-4" key={prop.pid}>
                                            <Link to={`/property/${prop.pid}`}>
                                                <div className="box16">
                                                    <div className="rentext-listing-category">
                                                        <span>{prop.p_type}</span>
                                                    </div>
                                                    <img className="img-fluid" src={`http://localhost:1337/imgupload/${prop.p_image}`} style={{ width: 'auto', height: '250px' }} alt={prop.p_name} />
                                                    <div className="box-content">
                                                        <h3 className="title">{prop.p_name}</h3>
                                                        <span className="post">{prop.p_address}</span>
                                                        <span className="post">{formattedDate}</span>
                                                    </div>
                                                </div>
                                            </Link>
                                        </div>
                                    );
                                })
                            ) : (
                                <p>No properties available matching the search criteria.</p>
                            )}
                        </div>
                    </div>
                </div>
            </section>
        </>
    );
}

export default Main;