# Blog API with User Authentication

## 📌 Project Overview
This is a **Blog API** built using **Node.js, Express.js, and MySQL** with JWT authentication. It allows users to register, log in, create, update, and delete blog posts. Role-based access control is implemented to differentiate between Admin and User privileges.

## 🛠 Tech Stack
- **Backend**: Node.js, Express.js
- **Database**: MySQL
- **Authentication**: JWT & BCrypt
- **API Documentation**: Swagger

## 🚀 Features
- **User Authentication**: Register/Login using JWT
- **Role-Based Access**: Admin/User
- **CRUD Operations**: Users can create, update, delete, and fetch blog posts
- **Pagination & Filtering**: Efficient blog listing

## 🗂 Project Structure
```
blog-api/
│-- controllers/
│   ├── authController.js
│   ├── blogController.js
│-- models/
│   ├── userModel.js
│   ├── blogModel.js
│-- routes/
│   ├── authRoutes.js
│   ├── blogRoutes.js
│-- middleware/
│   ├── authMiddleware.js
│-- config/
│   ├── db.js
│-- .env
│-- index.js
│-- package.json
│-- README.md
```

## 📦 Database Schema

### Users Table
| Column   | Type         | Constraints                    |
|----------|------------|--------------------------------|
| id       | VARCHAR(36) | PRIMARY KEY (UUID)            |
| name     | VARCHAR(255) | NOT NULL                      |
| email    | VARCHAR(255) | UNIQUE, NOT NULL              |
| password | VARCHAR(255) | NOT NULL                      |
| role     | ENUM('admin', 'user') | DEFAULT 'user'      |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP |

### Blogs Table
| Column   | Type         | Constraints                      |
|----------|------------|----------------------------------|
| id       | VARCHAR(36) | PRIMARY KEY (UUID)              |
| title    | VARCHAR(255) | NOT NULL                        |
| content  | TEXT        | NOT NULL                        |
| author_id | VARCHAR(36) | FOREIGN KEY REFERENCES users(id) ON DELETE CASCADE |
| created_at | TIMESTAMP | DEFAULT CURRENT_TIMESTAMP       |

## 🛠 Installation & Setup
### 1️⃣ Clone Repository
```bash
git clone https://github.com/yourusername/blog-api.git
cd blog-api
```

### 2️⃣ Install Dependencies
```bash
npm install
```

### 3️⃣ Setup Environment Variables
Create a `.env` file and configure:
```
PORT=5000
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=yourpassword
DB_NAME=blog_db
JWT_SECRET=your_jwt_secret
```

### 4️⃣ Run the Server
```bash
npm start
```
Server will be running on `http://localhost:5000`

## 🔑 API Endpoints
### 🧑 User Authentication
| Method | Endpoint         | Description        |
|--------|----------------|--------------------|
| POST   | /api/register   | User Registration |
| POST   | /api/login      | User Login        |

### ✍️ Blog Routes
| Method | Endpoint       | Description                 |
|--------|--------------|-----------------------------|
| GET    | /api/blogs    | Get all blogs (Paginated)  |
| POST   | /api/blogs    | Create a new blog (User)   |
| PUT    | /api/blogs/:id | Update a blog (Author/Admin) |
| DELETE | /api/blogs/:id | Delete a blog (Author/Admin) |

## 🔗 License
This project is **MIT Licensed**. Feel free to modify and use it!

---

Made with ❤️ by saksham Gupta 🚀
