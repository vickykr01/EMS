# 🏢 Employee Management System (EMS)

A full-stack **Employee Management System (EMS)** built using the **MERN stack**.  
This application helps organizations manage employees, departments, salaries, and leave requests with **secure role-based access control**.

---

## 🚀 Features

### 🔐 Authentication & Authorization
- JWT-based authentication
- Role-based access control (Admin / Employee)
- Protected frontend and backend routes

### 👨‍💼 Admin Features
- Create users (Admin / HR / Employee)
- Manage departments
- View and manage employees
- Assign and manage salaries
- View, approve, or reject leave requests

### 👨‍💻 Employee Features
- View personal profile
- Apply for leave
- Track leave status
- View salary details
- Account settings

---

## 🛠️ Tech Stack

### Frontend
- React.js
- React Router DOM
- Axios
- Tailwind CSS
- React Data Table Component

### Backend
- Node.js
- Express.js
- MongoDB
- Mongoose
- JSON Web Token (JWT)

---

## 📂 Project Structure
EMS/
│
├── Server/
│ ├── controllers/
│ ├── DB/
│ ├── middleware/
│ ├── models/
│ ├── routes/
│ └── index.js
│
├── Frontend/
│ ├── src/
├── components/
│ ├──  context/
│ ├── pages/
│ ├── utils/
│ └── App.jsx
└── README.md

---

## ⚙️ Installation & Setup
```bash

 1️⃣ Clone the Repository
git clone https://github.com/your-username/ems.git
cd ems
2️⃣ Backend Setup
cd backend
npm install
Create a .env file in backend/:

PORT=3000
MONGO_URI=your_mongodb_connection_string
JWT_TOKEN=your_jwt_secret
Start backend server:

npm run dev
3️⃣ Frontend Setup
cd frontend
npm install
npm run dev
```
🔑 API Endpoints (Sample)
Auth
POST /api/auth/login

POST /api/auth/signup

GET /api/auth/verify

Employees
GET /api/employee

POST /api/employee/add

GET /api/employee/:id

Leaves
POST /api/leave/add

GET /api/leave

GET /api/leave/:id

🧪 Future Enhancements
HR role permissions

Email notifications

Dashboard analytics

Pagination & search

File uploads (documents)

🤝 Contributing
Contributions are welcome!
Feel free to fork the repository and submit a pull request.

📄 License
This project is licensed under the MIT License.

👤 Author
Vicky Kumar
BCA Student | Full-Stack Developer

⭐ If you like this project, don’t forget to star the repository!


---
<img width="1919" height="899" alt="Screenshot 2026-02-01 234134" src="https://github.com/user-attachments/assets/dce548dd-2ac9-4235-bef7-109ca4db6ee2" />
<img width="1919" height="901" alt="Screenshot 2026-02-01 234009" src="https://github.com/user-attachments/assets/ed032f5e-6922-48f7-b617-95caa50be892" />
<img width="1917" height="896" alt="Screenshot 2026-02-01 233903" src="https://github.com/user-attachments/assets/edeb395a-4162-4725-a312-9097a6b29c8c" />
<img width="1919" height="907" alt="Screenshot 2026-02-01 233830" src="https://github.com/user-attachments/assets/808c03e1-efbf-497a-843d-5d1358f3ccd1" />

