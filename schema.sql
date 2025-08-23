CREATE DATABASE propertydb;

USE propertydb;

CREATE TABLE property_data (
	pid VARCHAR(50) PRIMARY KEY,
    p_name VARCHAR(30),
    p_type VARCHAR(30),
    p_address VARCHAR(30),
    p_date DATE,
    p_image VARCHAR(255)
);

CREATE TABLE user_data (
	uid VARCHAR(50) PRIMARY KEY,
    u_name VARCHAR(30),
    u_email VARCHAR(30) UNIQUE,
    u_contact VARCHAR(30) UNIQUE,
    u_pass VARCHAR(50)
);

CREATE TABLE service_data (
	sid VARCHAR(50) PRIMARY KEY,
    p_name VARCHAR(30),
    s_type VARCHAR(30),
    s_date VARCHAR(30),
    s_cost INT
);

INSERT INTO user_data VALUES ("1", "Admin", "admin@gmail.com", "0000000000", "Admin123");

SELECT * FROM property_data;

INSERT INTO property_data VALUES ("1", "Blue House", "House", "Ahmedabad, India", "2025-04-11", "1755932094066-.jpeg"), 
	("2", "Cozy Home", "House", "Pune, India", "2025-01-20", "1727608820083-.jpeg"),
    ("3", "Lavish Villa", "House", "Texas, USA", "2024-12-14", "1727608911827-.jpeg"),
    ("4", "Giant House", "House", "Brampton, Canada", "2025-02-21", "1727608975076-.jpeg"),
    ("5", "Gazebo Apartments", "Apartment", "New York, USA", "2025-05-01", "1727609326564-.jpeg"),
    ("6", "Summit Sanctuary", "Commercial", "Frankfurt, Germany", "2025-04-04", "1727609486267-.jpeg"),
    ("7", "The Coffee Loft", "Commercial", "London, UK", "2025-02-09", "1727609616528-.jpeg"),
    ("8", "Nexus", "Commercial", "Vancouver, Canada", "2025-07-31", "1727609656545-.jpeg"),
    ("9", "Elysium Estate", "Commercial", "Liverpool, UK", "2025-06-22", "1727609692208-.jpeg"),
    ("10", "Elmwood Villa", "House", "Mumbai, India", "2025-07-25", "1727779558108-.jpeg"),
    ("11", "Elegant Residences", "Apartment", "Tokyo, Japan", "2024-11-27", "1727788434276-.jpeg"),
    ("12", "The Urban Oasis", "House", "Vadodara, India", "2025-05-18", "1727932747705-.jpeg");