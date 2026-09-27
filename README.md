# ValueRecharge

A full-stack prepaid mobile recharge platform built using Next.js, React, TypeScript, Node.js, Express.js, and PostgreSQL.

ValueRecharge provides a simple interface for selecting a mobile carrier, choosing a recharge plan, completing a payment flow, and viewing transaction history through a dashboard.

This project was developed as part of a Full-Stack Web Development Internship and is also maintained as a portfolio project.

## Features

### User Features

- User registration and login
- Mobile number based recharge flow
- Carrier selection
- Recharge plan selection
- Custom recharge amount
- Payment flow
- Transaction confirmation
- Transaction history
- User dashboard
- Responsive interface
- Secure checkout session using JWT

### Dashboard

The dashboard provides an overview of recharge activity, including:

- Transaction history
- Recharge amount
- Mobile carrier
- Selected plan
- Payment gateway
- Transaction status
- Transaction reference ID
- Transaction timestamps

### Supported Carriers

- Verizon
- T-Mobile
- AT&T
- Cricket Wireless
- Boost Mobile
- Metro
- Lyca Mobile
- H2O Wireless
- Simple Mobile

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- Tailwind CSS
- HTML
- CSS

### Backend

- Node.js
- Express.js
- TypeScript
- REST APIs
- JWT Authentication

### Database

- PostgreSQL
- SQL

### Development Tools

- Git
- GitHub
- VS Code
- Postman
- npm

## Project Structure

The project is divided into two main applications: a frontend and a backend.

### Backend

- `app/api/` - API routes for authentication, payments, recharge, users, and transactions
- `lib/` - Database connection, logging, and middleware
- `routes/` - Express route definitions
- `src/controllers/` - Business logic for different modules
- `src/models/` - Database models
- `src/utilities/` - Authentication and utility functions
- `server.ts` - Backend server entry point
- `package.json` - Backend dependencies and scripts

### Frontend

- `app/` - Next.js application pages and components
- `app/components/` - Reusable UI components
- `app/dashboard/` - Transaction dashboard
- `app/login/` - Login page
- `app/payment/` - Payment page
- `app/send-refill/` - Recharge flow
- `public/Images/` - Application images
- `public/carriers/` - Carrier logos
- `package.json` - Frontend dependencies and scripts

## How the Recharge Flow Works

The application follows a simple recharge workflow:

**User → Select Carrier → Select Plan → Enter Mobile Number → Initialize Checkout → Payment → Transaction Verification → PostgreSQL → Dashboard**

The checkout process generates a short-lived JWT containing the relevant checkout information.

Protected transaction routes verify the token before allowing the transaction to be recorded.

## Backend Architecture

The backend follows a modular structure separating routes, controllers, middleware, utilities, and database operations.

**Client → Express Routes → Middleware → Controllers → PostgreSQL**

This structure makes the backend easier to maintain and allows individual features to be extended without modifying the entire application.

# API Documentation

The backend exposes REST APIs for authentication, carriers, payments, recharge plans, users, and transactions.

## Authentication

### Register

`POST /api/auth/register`

Creates a new user account.

Example request:

```json
{
  "name": "Demo User",
  "email": "demo@example.com",
  "password": "password123"
}
Login

POST /api/auth/login

Authenticates an existing user.

Example request:

{
  "email": "demo@example.com",
  "password": "password123"
}
Carriers
Get Available Carriers

GET /api/recharge/carriers

Returns the carriers available for recharge.

Example response:

{
  "success": true,
  "data": [
    "Verizon",
    "T-Mobile",
    "AT&T",
    "Cricket",
    "Boost Mobile"
  ]
}
Transactions
Initialize Checkout

POST /api/transactions/initiate

Initializes a recharge checkout session and generates a temporary JWT checkout token.

Example request:

{
  "phone": "XXXXXXXXXX",
  "carrierName": "Verizon",
  "planName": "Prepaid Refill",
  "planId": "vz-1",
  "amount": 25
}

Example response:

{
  "success": true,
  "checkoutToken": "JWT_TOKEN",
  "displayDetails": {
    "phone": "XXXXXXXXXX",
    "carrierName": "Verizon",
    "planName": "Prepaid Refill",
    "planId": "vz-1",
    "amount": "$25"
  }
}
Complete Transaction

POST /api/transactions

Records a completed transaction after checkout verification.

Example request:

{
  "gateway": "mock_gateway",
  "status": "SUCCESS",
  "referenceId": "transaction_reference"
}
Transaction Status Check

POST /api/transactions/status-check

Checks the authenticated transaction session.

Admin Transactions
Get All Transactions

GET /api/admin/transactions

Returns transaction records stored in PostgreSQL.

Example response:

{
  "success": true,
  "count": 0,
  "data": []
}

Transaction records contain information such as:

Transaction ID
Phone number
Carrier
Recharge plan
Payment gateway
Status
Reference ID
Creation time
Update time
Database

ValueRecharge uses PostgreSQL for storing application and transaction data.

The transaction table contains fields including:

Column	Description
id	Unique transaction ID
phone_no	Customer mobile number
carrier_used	Selected carrier
plan_chosen	Selected recharge plan
offers	Applied offer information
payment_gateway_used	Payment gateway
status	Transaction status
ref_id	Transaction reference
creation_time	Transaction creation time
updation_time	Last update time
Getting Started
Prerequisites

Make sure the following are installed:

Node.js
npm
PostgreSQL
Git
Clone the Repository
git clone https://github.com/akm8613/value-recharge.git
cd value-recharge
Backend Setup

Navigate to the backend:

cd backend
npm install

Create a .env file:

PORT=5001
DATABASE_URL=your_postgresql_connection_string
TOKEN_SECRET=your_secure_secret
TOKEN_EXPIRY=10m

Start the development server:

npm run dev

The backend will run on:

http://localhost:5001

Frontend Setup

Open another terminal and navigate to the frontend:

cd frontend
npm install
npm run dev

The frontend will normally be available at:

http://localhost:3000

Environment Variables

Do not commit environment files containing secrets.

Example:

DATABASE_URL=your_database_url
TOKEN_SECRET=your_secret
TOKEN_EXPIRY=10m
PORT=5001

The project .gitignore excludes environment files such as:

.env
.env.local
.env.*.local
Security

The project includes several security-oriented practices:

JWT-based checkout authentication
Protected transaction routes
Short-lived checkout tokens
Environment variables for sensitive configuration
PostgreSQL parameterized queries
Middleware-based transaction verification
Separation between public and protected routes

No real credentials, payment secrets, or private environment variables should be committed to the repository.

Development

A typical development setup uses two terminals.

Terminal 1 — Backend
cd backend
npm run dev
Terminal 2 — Frontend
cd frontend
npm run dev

Then open:

http://localhost:3000

Future Improvements

Possible improvements for future versions include:

Real payment gateway integration
Recharge API integration with telecom providers
Email and SMS transaction notifications
Advanced admin analytics
User profile management
Recharge history filtering
Search and pagination
Automated transaction reconciliation
Docker-based deployment
Automated testing
Production monitoring
Project Purpose

ValueRecharge was developed as a practical full-stack project to explore how a real-world recharge platform can be structured from frontend to backend and database.

The project focuses on:

Full-stack development
REST API design
Authentication
Database integration
Payment workflow design
Transaction management
Dashboard development
Clean project architecture
Internship Project

ValueRecharge was developed as part of a Full-Stack Web Development Internship.

The project involved working with:

React / Next.js
Node.js
Express.js
TypeScript
PostgreSQL
REST APIs
Authentication
Payment workflows
Database operations
Testing and debugging
Author

Akshat Mishra

B.Tech – Computer Science & Engineering (AIML)
Manipal University Jaipur

GitHub: https://github.com/akm8613

License

This project is intended for educational, internship, portfolio, and demonstration purposes.