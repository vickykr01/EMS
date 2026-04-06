# Employee Management System (EMS)

A full-stack Employee Management System built with React, Vite, Node.js, Express, and MongoDB. The app supports authentication, protected dashboards, employee and department management, salary tracking, leave workflows, and a light/dark theme toggle.

## Highlights

- JWT-based authentication with protected frontend and backend routes
- Admin dashboard for departments, employees, salaries, leave approvals, and user creation
- Employee dashboard for profile access, leave requests, salary view, and password updates
- Support for `admin`, `employee`, and seeded `hr` user roles in the backend
- Modern responsive UI with Tailwind CSS v4, custom styling, and persisted theme preference
- Profile image upload support for employees

## Tech Stack

### Frontend

- React 19
- Vite
- React Router DOM
- Axios
- Tailwind CSS v4
- React Data Table Component
- React Icons

### Backend

- Node.js
- Express 5
- MongoDB
- Mongoose
- JWT
- bcrypt
- multer

## Project Structure

```text
EMS/
|-- Frontend/
|   |-- src/
|   |   |-- components/
|   |   |-- context/
|   |   |-- pages/
|   |   `-- utils/
|   |-- package.json
|   `-- vite.config.js
|-- Server/
|   |-- controllers/
|   |-- DB/
|   |-- middleware/
|   |-- models/
|   |-- routes/
|   |-- index.js
|   |-- userSeed.js
|   `-- package.json
`-- README.md
```

## Main Features

### Admin

- Log in to a protected admin dashboard
- Create users with `admin`, `hr`, or `employee` roles
- Add, edit, list, and delete departments
- Add, edit, list, view, and delete employees
- Upload employee profile images
- Add and view salary records
- Review leave requests and approve or reject them
- View dashboard summary stats

### Employee

- Sign up as an employee
- Log in to a protected employee dashboard
- View personal profile details
- Apply for leave and track status
- View salary details
- Change account password
- Switch between light and dark themes

## Getting Started

### Prerequisites

- Node.js 18+
- MongoDB database or MongoDB Atlas connection string

### 1. Clone the repository

```bash
git clone https://github.com/your-username/ems.git
cd EMS
```

### 2. Set up the backend

```bash
cd Server
npm install
```

Create `Server/.env` with:

```env
PORT=3000
MONGODB_URL=your_mongodb_connection_string
JWT_TOKEN=your_jwt_secret
```

Start the backend server:

```bash
npm run dev
```

### 3. Optional: seed an admin user

From the `Server` folder:

```bash
node userSeed.js
```

This creates:

- Email: `admin@gmail.com`
- Password: `admin`

### 4. Set up the frontend

```bash
cd ../Frontend
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
