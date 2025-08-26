# 🏡 Property Management System  

A **full-stack web application** built with **React, Node.js, Express, and MySQL** that helps manage properties, tenants, and rentals with ease.  

This project was created as part of my learning journey to build complete applications where the frontend, backend, and database work seamlessly together.  

---

## ✨ Features
- 📋 Add and delete properties
- 🧑‍💼 Manage users
- 📋 Add service details
- 📊 Store data securely using MySQL  
- ⚡ RESTful APIs built with Express.js
- 🎨 Responsive frontend built with React

---

## 🛠 Tech Stack
- **Frontend (client)**: React, CSS, JavaScript  
- **Backend (server)**: Node.js, Express.js  
- **Database**: MySQL  
- **Other**: Faker (UUID generation), REST API architecture  

---
```
## 📂 Project Structure  

📦 Property-Management-System
├── 📁 client # React frontend code.
├── 📁 server # Express.js backend APIs.
└── 📄 schema.sql # Database schema for MySQL.
```
---

## ⚙️ Setup Instructions  

Follow these steps to run the project locally:  

### 1️⃣ Clone the repository  

### 2️⃣ Database Setup  
1. Open MySQL on your system.  
2. Import the schema file:  SOURCE schema.sql

✅ Now your database is ready!  

### 3️⃣ Backend Setup (Express + Node.js)  

1. cd .\server\
2. npm install
3. node .\db.js

Server will start at (http://localhost:1337) (You can change this in the code).

### 4️⃣ Frontend Setup (React)  
Open a new terminal:  

1. cd .\client\
2. npm install
3. npm start

Frontend will start at (http://localhost:3000)  

---

## 🔗 Routes / API Endpoints (Backend Preview)
- `POST /api/adduser` → Add an user
- `GET /api/user_list` → View all users
- `DELETE /api/deleteUser/:id` → Delete all users

- `POST /api/data_verify` → Verify an user

- `GET /api/property/:id` → View a property
- `POST /api/addpro` → Add a property
- `DELETE /api/deleteProperty/:id` → Delete a property
- `GET /api/property_list` → Fetch all properties

- `POST /api/addservice` → Add service details

---

## 🎯 Usage Example
👉 Once both frontend & backend servers are running:
- Open (http://localhost:3000) in your browser
- Interact with the UI to add/manage properties
- All data will be stored in MySQL 📊  
- Session storage is used in the project. You will be logged in only in the current browser tab. You will have to login again if you close the tab or open the site in another tab.
    - If you want to stay logged in until you explicitly log out, then replace **sessionStorage** with **localStorage** in the ***header.js*** file. 

- To be able to manage the properties and users, you need to be an **Admin** :
    - Use **Username: Admin**  &  **Password: Admin123**  while logging in. Only then you wil be able to see the options to manage properties and users.

---

## 🤝 Contributing
Pull requests are welcome! If you'd like to make changes or improvements, please fork the repo and submit a PR.  

---

## 🙋‍♂️ Author
👩‍💻 Developed by **Taneesh Suthar** – Final year B.Tech CSE student, passionate about **Full-Stack Web Development**.  

✨ Connect with me:  
- [LinkedIn](https://www.linkedin.com/in/taneesh-suthar)  
- [GitHub](https://github.com/Taneesh-S)  
- [Instagram](https://www.instagram.com/taneesh.25)  

---

## ⭐ If you like this project, don’t forget to star ⭐ the repo!
