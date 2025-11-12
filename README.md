# BILLA – Subscription & Bill Management Dashboard

---

## Problem Statement
Managing a growing number of recurring digital subscriptions and bills often leads to surprise charges and inefficient budgeting. BILLA aims to solve this by providing a central platform for users to track costs, visualize spending, and receive timely alerts to avoid missing payment deadlines.

---

## Key Features

* **Authentication & Authorization:** Secure user registration and login using JSON Web Tokens (JWT).
* **Subscription Manager:** Full CRUD functionality to add, view, edit, and delete subscriptions.
* **Spending Analytics:** Interactive charts (Doughnut & Bar) visualizing monthly/yearly costs by category.
* **Email Notifications:** Automated alerts for subscription updates and reminders via Nodemailer.
* **Payment Tracking:** Visual indicators for billing cycles and start dates.
* **Responsive UI:** Modern interface built with Tailwind CSS (supports Dark/Light mode).
* **Advanced Management:** Filter and sort subscriptions by cost, name, or category.

---

## Tech Stack

| Layer | Technologies |
| :--- | :--- |
| **Frontend** | React.js, React Router, Tailwind CSS, Chart.js, Axios |
| **Backend** | Node.js, Express.js, Nodemailer |
| **Database** | MongoDB (NoSQL) |
| **Auth** | JWT (JSON Web Tokens), Bcrypt.js |
| **Hosting** | Vercel (Frontend), Render (Backend), MongoDB Atlas (DB) |

---

## System Architecture

**Flow:** Frontend (Web Client) → Backend (REST API) → Database (NoSQL)

1.  **Frontend:** A React Single-Page Application (SPA) that fetches data dynamically.
2.  **Backend:** A RESTful API built with Express to handle logic and routing.
3.  **Database:** MongoDB Atlas stores user profiles and subscription documents.

---

## API Endpoints

The REST API interacts directly with the MongoDB database.

| Method | Endpoint | Description | Access |
| :--- | :--- | :--- | :--- |
| POST | /api/auth/signup | Register a new user account | Public |
| POST | /api/auth/login | Authenticate user and return JWT | Public |
| POST | /api/subscriptions | Create a new subscription entry | Protected |
| GET | /api/subscriptions | Get all subscriptions for user | Protected |
| PUT | /api/subscriptions/:id | Update details of a subscription | Protected |
| DELETE | /api/subscriptions/:id | Delete a specific subscription | Protected |
| GET | /api/analytics/summary | Get aggregated spending totals | Protected |
| POST | /api/notify/test | Trigger a test email notification | Protected |

---

