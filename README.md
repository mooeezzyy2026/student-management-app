# Student Management System 🎓

A full-stack application built with **React**, **Django REST Framework**, and **MySQL**. This app allows you to add, view, and delete student records in real-time.

## 🏗 Project Structure

- **Backend:** Django (Python) with MySQL database.
- **Frontend:** React (JavaScript) located in the `/frontend` folder.

---

## 🚀 How to Run Locally

### 1. Prerequisite

- Python 3.x installed
- Node.js installed
- MySQL Server running with a database named `student_db`

### 2. Setup the Backend

From the root directory (`my_django_app`):

```bash
# Activate virtual environment (if used)
source env/bin/activate

# Install Django & dependencies
pip install django djangorestframework django-cors-headers mysqlclient

# Run migrations
python3 manage.py migrate

# Start Django server
python3 manage.py runserver


cd frontend

# Install React dependencies
npm install

# Start React app
npm start
```
