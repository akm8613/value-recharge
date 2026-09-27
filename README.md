# ValueRecharge

ValueRecharge is a full-stack web application for recharging US prepaid mobile numbers online.

The application lets users enter a mobile number, select their carrier and recharge plan, complete a payment flow, and have the transaction recorded securely. The project was built with a focus on creating a simple recharge experience while keeping the frontend, backend, and database properly connected.

## Features

- US prepaid mobile recharge
- Mobile number validation
- Support for multiple US mobile carriers
- Recharge plan selection
- Custom recharge amount
- User registration and login
- JWT-based authentication
- Secure transaction verification
- Payment flow
- Transaction history
- Admin transaction dashboard
- PostgreSQL database integration
- REST APIs
- Protected transaction routes
- Backend logging
- Responsive user interface

## Supported Carriers

The application currently includes support for:

- Verizon
- AT&T
- T-Mobile
- Metro by T-Mobile
- Cricket Wireless
- Boost Mobile
- H2O Wireless
- Simple Mobile
- Lyca Mobile

## How the Recharge Flow Works

The main recharge flow is:

```text
Enter Mobile Number
        ↓
Select Carrier
        ↓
Select Recharge Plan
        ↓
Review Amount
        ↓
Initialize Transaction
        ↓
Payment
        ↓
Verify Transaction
        ↓
Save Transaction
        ↓
Show Transaction Status

Before completing a transaction, the backend generates a short-lived JWT checkout token containing the relevant checkout information. Protected transaction routes then verify the token before allowing the transaction to be recorded.

Tech Stack
Frontend
Next.js
React
TypeScript
Tailwind CSS
HTML
CSS
Backend
Node.js
Express.js
TypeScript
JWT
REST APIs
Database
PostgreSQL
SQL
Tools
Git
GitHub
VS Code
Postman
npm
Project Structure
value-recharge/
│
├── backend/
│   ├── app/
│   │   └── api/
│   ├── lib/
│   │   ├── db.ts
│   │   ├── logger.ts
│   │   └── middleware/
│   ├── routes/
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── utilities/
│   ├── package.json
│   └── server.ts
│
├── frontend/
│   ├── app/
│   │   ├── components/
│   │   ├── login/
│   │   ├── payment/
│   │   ├── send-refill/
│   │   └── page.tsx
│   ├── public/
│   └── package.json
│
├── .gitignore
└── README.md
Database

The backend uses PostgreSQL to store transaction information.

The transaction table contains information such as:

Transaction ID
Mobile number
Carrier
Recharge plan
Payment gateway
Transaction status
Reference ID
Creation time
Update time

Example transaction:

Transaction ID: 16
Phone Number: 4444444444
Carrier: Verizon
Plan: Custom Amount Refill ($56)
Payment Gateway: UPI_Apps
Status: SUCCESS
Reference ID: upi_intent_329563661
Security

The project includes several security-related features:

JWT-based authentication
Protected transaction endpoints
Short-lived checkout tokens
Server-side validation
Environment variables for sensitive configuration
Parameterized PostgreSQL queries
Backend request logging
Database-backed transaction records

Payment processing in the current version is intended for development/demo purposes. A production version would require integration with a real payment provider and recharge service.

API Endpoints
Authentication
POST /api/auth/register
POST /api/auth/login
Recharge
GET /api/recharge/carriers
Transactions
POST /api/transactions/initiate
POST /api/transactions
POST /api/transactions/status-check
GET /api/transactions
GET /api/admin/transactions
Payment
POST /api/payment/intent
User
GET /api/users/profile
Example API Request

To initialize a recharge:

POST /api/transactions/initiate
Content-Type: application/json

Request body:

{
  "phone": "7869177993",
  "carrierName": "Verizon",
  "planName": "Prepaid Refill $25",
  "planId": "vz-1",
  "amount": 25
}

Example response:

{
  "success": true,
  "checkoutToken": "JWT_TOKEN",
  "displayDetails": {
    "phone": "7869177993",
    "carrierName": "Verizon",
    "planName": "Prepaid Refill $25",
    "planId": "vz-1",
    "amount": "$25"
  }
}
Running the Project Locally
Prerequisites

Make sure you have the following installed:

Node.js
npm
PostgreSQL
Git
1. Clone the Repository
git clone https://github.com/akm8613/value-recharge.git
cd value-recharge
2. Backend Setup

Go to the backend folder:

cd backend

Install dependencies:

npm install

Create a .env.local file inside the backend folder:

PORT=5001
DATABASE_URL=postgres://USERNAME:PASSWORD@localhost:5432/value_recharge
TOKEN_SECRET=your_secret_key
TOKEN_EXPIRY=10m

Make sure PostgreSQL is running and the value_recharge database exists.

Start the backend:

npm run dev

The backend will run on:

http://localhost:5001
3. Frontend Setup

Open another terminal and go to the frontend folder:

cd frontend

Install dependencies:

npm install

Start the frontend:

npm run dev

The frontend will run on:

http://localhost:3000
Admin Transaction Dashboard

The project also includes an admin transaction dashboard.

It retrieves transaction records from PostgreSQL and displays information such as:

Mobile number
Carrier
Recharge plan
Payment method
Transaction status
Reference ID
Transaction timestamp

This makes it easier to monitor recharge activity and review transactions during development.

What I Worked On

I built ValueRecharge as a practical full-stack project to work with a complete application rather than only a frontend or backend.

The project gave me experience with:

Building interfaces using Next.js and React
Creating REST APIs with Node.js and Express
Connecting a backend application to PostgreSQL
Implementing JWT authentication
Protecting transaction routes
Handling transaction workflows
Working with API requests and responses
Debugging frontend and backend issues
Managing application data
Using Git and GitHub for version control
Future Improvements

Some improvements I would like to add include:

Integration with a real recharge provider API
Production payment gateway integration
OTP-based phone verification
Email/SMS recharge notifications
User-specific transaction history
Better admin authentication and permissions
Recharge status tracking
Automated refunds for failed transactions
Advanced transaction analytics
Search and filtering
Pagination
Automated testing
Production deployment

Author : Akshat Mishra

B.Tech – Computer Science & Engineering (AIML)
Manipal University Jaipur
7869177993

GitHub:
https://github.com/akm8613

Project

ValueRecharge was developed as an internship, portfolio, and interview demonstration project.

If you find the project interesting, feel free to explore the repository.