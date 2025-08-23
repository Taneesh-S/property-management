var mysql = require("mysql2");
const { faker } = require("@faker-js/faker");
var express = require("express");
var bodyparser = require("body-parser");
const path = require("path");
const multer = require("multer");
var cors = require("cors");
var app = express();
app.use(express.json());
app.use(bodyparser.json())
app.use(bodyparser.urlencoded({extended: true}))
app.use(cors());
app.use("/imgupload", express.static("imgupload"));

var con=mysql.createConnection({
    host:"localhost",
    user:"root",
    database:"propertydb", // CHANGE THIS ONLY IF YOU HAVE CHANGED THE DATABSE NAME WHILE EXECUTING THE SQL FILE
    password:"" // YOUR PASSWORD HERE
});

const storage = multer.diskStorage({
    destination:path.join('./imgupload'),
    filename:function(req, file, callback) {
        callback(null, Date.now() + '-' + path.extname(file.originalname));
    }
});

app.post("/api/addpro", (req, res) => {
    let upload = multer({storage:storage}).single('filename');
    upload(req, res, function(err) {
        if(!req.file) {
            console.log("Not Found!!");
            return res.status(400).send("File not found.");
        }

        var randomId = faker.string.uuid();
        var p_name = req.body.p_name;
        var p_type = req.body.p_type;
        var p_address = req.body.p_address;
        var p_date = req.body.p_date;
        var filename = req.file.filename;

        const insert = "INSERT INTO property_data (pid, p_name, p_type, p_address, p_date, p_image) VALUES (?,?,?,?,?,?)";
        con.query(insert, [randomId, p_name, p_type, p_address, p_date, filename], (err, result) => {
            if(err) {
                console.error("SQL error:", err);
                return res.status(500).json({ error: "Database error" });
            }
            res.json({ message: "Property added successfully" });
        });
    });
});

app.get("/api/property_list", (req, resp) => {
    const fetch_data = "SELECT * FROM property_data";
    con.query(fetch_data, (err, result) => {
        resp.send(result);
    });
});

app.post("/api/adduser", (req, res) => {

    const randomId = faker.string.uuid();
    const u_name = req.body.u_name;
    const u_email = req.body.u_email;
    const u_contact = req.body.u_contact;
    const u_pass = req.body.u_pass;

    if (u_name == "Admin") {
        return res.status(400).json({ error: "Cannot have name as Admin" });
    }

    if (!u_name || !u_email || !u_contact || !u_pass) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const insert = "INSERT INTO user_data (uid, u_name, u_email, u_contact, u_pass) VALUES (?,?,?,?,?)";
    con.query(insert, [randomId, u_name, u_email, u_contact, u_pass], (err, result) => {
        if (err) {
            console.error("SQL error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "User added successfully" });
    });
});

app.get("/api/user_list", (req, resp) => {
    const fetch_data = "SELECT * FROM user_data";
    con.query(fetch_data, (err, result) => {
        resp.send(result);
    });
});

app.post("/api/data_verify", (req, resp) => {
    var name = req.body.u_name;
    var password = req.body.u_pass;

    const query = "SELECT * FROM user_data WHERE u_name = ? and u_pass = ?";
    con.query(query, [name, password], (err, result) => {
        if(result.length > 0) {
            resp.send(result);
        }
        else {
            resp.send({message: "Wrong Email or Password"});
        }
    });
});

app.post("/api/addservice", (req, res) => {

    const randomId = faker.string.uuid();
    const p_name = req.body.p_name;
    const s_type = req.body.s_type;
    const s_date = req.body.s_date;
    const s_cost = req.body.s_cost;

    if (!p_name || !s_type || !s_date || !s_cost) {
        return res.status(400).json({ error: "All fields are required" });
    }

    const insert = "INSERT INTO service_data (sid, p_name, s_type, s_date, s_cost) VALUES (?,?,?,?,?)";
    con.query(insert, [randomId, p_name, s_type, s_date, s_cost], (err, result) => {
        if (err) {
            console.error("SQL error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.status(200).json({ message: "Service added successfully" });
    });
});

app.get("/api/property/:id", (req, res) => {
    const propertyId = req.params.id;
    const query = "SELECT * FROM property_data WHERE pid = ?";
    con.query(query, [propertyId], (err, result) => {
        if (err) {
            console.error("SQL error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(result[0]);
    });
});

app.get("/api/services/:id", (req, res) => {
    const propertyId = req.params.id;
    const query = "SELECT * FROM service_data WHERE p_name = (SELECT p_name FROM property_data WHERE pid = ?)";
    con.query(query, [propertyId], (err, result) => {
        if (err) {
            console.error("SQL error:", err);
            return res.status(500).json({ error: "Database error" });
        }
        res.json(result);
    });
});

app.delete('/api/deleteProperty/:id', (req, res) => {
    const propertyId = req.params.id;
    
    const deleteServicesQuery = "DELETE FROM service_data WHERE p_name = (SELECT p_name FROM property_data WHERE pid = ?)";
    const deletePropertyQuery = "DELETE FROM property_data WHERE pid = ?";

    con.query(deleteServicesQuery, [propertyId], (err, result) => {
        if (err) {
            console.log(err);
            res.status(500).send("Error deleting related services");
        } else {
            con.query(deletePropertyQuery, [propertyId], (err, result) => {
                if (err) {
                    console.log(err);
                    res.status(500).send("Error deleting property");
                } else {
                    res.status(200).send("Property and related services deleted");
                }
            });
        }
    });
});

app.delete('/api/deleteUser/:id', (req, res) => {
    const userId = req.params.id;
    const deleteUserQuery = "DELETE FROM user_data WHERE uid = ?";

    con.query(deleteUserQuery, [userId], (err, result) => {
        if (err) {
            console.error("Error deleting user:", err);
            return res.status(500).send("Error deleting user");
        }
        res.status(200).send("User deleted successfully");
    });
});

var port = 1337;
app.listen(port, () => {
    console.log("Connected");
});

con.connect(function (error) {
    if (error) {
        throw error;
    }
    console.log("DB Connected");
});