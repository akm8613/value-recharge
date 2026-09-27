# ValueRecharge

A full-stack prepaid mobile recharge platform built as an internship and portfolio project.

ValueRecharge allows users to select a mobile carrier, choose a prepaid plan or enter a custom recharge amount, complete a payment flow, and view their transaction history. The project also includes a transaction analytics dashboard for monitoring recharge activity.

---

## Overview

ValueRecharge was developed to understand and implement a complete full-stack application — from the frontend user experience and API development to database management and transaction handling.

The application focuses on keeping the recharge process simple for users while maintaining a structured backend for handling transactions and platform data.

### Main workflow

1. Enter a mobile number
2. Select a mobile carrier
3. Choose a recharge plan
4. Review the recharge amount
5. Continue to payment
6. Complete the payment flow
7. Generate a transaction reference
8. Store the transaction in PostgreSQL
9. View the transaction through the dashboard

---

## Features

### User Features

- Mobile number based recharge
- Carrier selection
- Prepaid plan selection
- Custom recharge amount
- Plan and amount confirmation
- Payment flow
- Transaction reference generation
- Transaction status tracking
- Secure checkout session using JWT
- Responsive user interface
- Recharge confirmation flow

### Supported Carriers

The project currently includes support/demo data for carriers such as:

- Verizon
- AT&T
- T-Mobile
- Metro by T-Mobile
- Cricket
- H2O Wireless
- Boost Mobile
- Simple Mobile
- Lyca Mobile

Carrier data and plans are handled through the backend rather than being hard-coded into the frontend workflow.

---

## Transaction Dashboard

ValueRecharge also includes a dashboard for viewing recharge activity.

The dashboard retrieves transaction data from the backend and displays information such as:

- Total transactions
- Transaction status
- Mobile number
- Carrier
- Selected plan
- Payment gateway
- Transaction reference ID
- Transaction creation time
- Transaction update time

The dashboard is designed to provide a quick overview of platform activity and can be extended with additional analytics and visualizations.

---

## Security

The transaction workflow uses a JWT-based checkout verification mechanism.

Before completing a transaction:

1. The frontend initializes the checkout.
2. The backend validates the submitted recharge information.
3. A short-lived JWT checkout token is generated.
4. Protected transaction routes verify the token.
5. Verified transaction information is passed to the transaction handler.
6. The transaction is stored in PostgreSQL.

The checkout token is intentionally short-lived to reduce the risk of replaying an old checkout session.

> Note: This project contains a demonstration payment flow and should not be considered production-ready for handling real financial transactions without additional payment-provider verification, security reviews, and compliance work.

---

## Tech Stack

### Frontend

- Next.js
- React
- TypeScript
- CSS
- Responsive UI
- Client-side API integration

### Backend

- Node.js
- Express.js
- TypeScript
- PostgreSQL
- JWT
- REST APIs
- Custom middleware
- Structured logging

### Development Tools

- Git
- GitHub
- Visual Studio Code
- PostgreSQL / pgAdmin
- Postman

---

## Project Structure

```text
value-recharge/
│
├── backend/
│   │
│   ├── app/
│   │   └── api/
│   │       ├── admin/
│   │       ├── auth/
│   │       ├── payment/
│   │       ├── recharge/
│   │       ├── transactions/
│   │       └── users/
│   │
│   ├── lib/
│   │   ├── db.ts
│   │   ├── logger.ts
│   │   └── middleware/
│   │
│   ├── routes/
│   │   ├── payment.routes.ts
│   │   ├── plans.routes.ts
│   │   ├── recharge.routes.ts
│   │   └── transactions.routes.ts
│   │
│   ├── src/
│   │   ├── controllers/
│   │   ├── models/
│   │   └── utilities/
│   │
│   ├── package.json
│   └── server.ts
│
├── frontend/
│   │
│   ├── app/
│   │   ├── components/
│   │   ├── dashboard/
│   │   ├── login/
│   │   ├── payment/
│   │   ├── send-refill/
│   │   ├── globals.css
│   │   ├── layout.tsx
│   │   └── page.tsx
│   │
│   ├── public/
│   │   ├── Images/
│   │   └── carriers/
│   │
│   ├── package.json
│   └── next.config.ts
│
├── .gitignore
└── README.md
API Documentation

The backend exposes REST APIs for authentication, carriers, payments and transactions.

Authentication
Register
POST /api/auth/register

Creates a new user account.

Example request:

{
  "name": "Demo User",
  "email": "demo@example.com",
  "password": "password"
}
Login
POST /api/auth/login

Authenticates an existing user.

Recharge
Get Available Carriers
GET /api/recharge/carriers

Returns the available mobile carriers and their recharge plans.

Example response:

{
  "success": true,
  "carriers": [
    {
      "name": "Verizon",
      "plans": [
        {
          "id": "vz-1",
          "name": "Prepaid Refill $25",
          "amount": 25
        }
      ]
    }
  ]
}
Transactions
Initialize Checkout
POST /api/transactions/initiate

Initializes a recharge session and generates a short-lived checkout token.

Example request:

{
  "phone": "XXXXXXXXXX",
  "carrierName": "Verizon",
  "planName": "Prepaid Refill $25",
  "planId": "vz-1",
  "amount": 25
}
Complete Transaction
POST /api/transactions

Completes the transaction after checkout verification.

Example request:

{
  "gateway": "mock_gateway",
  "status": "SUCCESS",
  "referenceId": "transaction_reference"
}

The backend stores the transaction in PostgreSQL.

Transaction Status Check
POST /api/transactions/status-check

Checks the authenticated checkout session before allowing downstream transaction operations.

Admin Transaction Records
GET /api/admin/transactions

Returns transaction records stored in the PostgreSQL database.

The response includes fields such as:

id
phone_no
carrier_used
plan_chosen
offers
payment_gateway_used
status
ref_id
creation_time
updation_time
Database

PostgreSQL is used for storing application and transaction data.

The transaction table contains information including:

Column	Description
id	Unique transaction ID
phone_no	Customer mobile number
carrier_used	Selected mobile carrier
plan_chosen	Selected recharge plan
offers	Applied offer information
payment_gateway_used	Payment method/gateway
status	Transaction status
ref_id	Transaction reference
creation_time	Transaction creation time
updation_time	Last update time
Installation
Prerequisites

Make sure the following are installed:

Node.js
npm
PostgreSQL
Git
1. Clone the repository
git clone https://github.com/akm8613/value-recharge.git

Move into the project:

cd value-recharge
2. Install Backend Dependencies
cd backend
npm install
3. Configure Backend Environment

Create a .env.local file inside the backend directory.

Example:

PORT=5001

DATABASE_URL=your_postgresql_connection_string

TOKEN_SECRET=your_secure_jwt_secret

TOKEN_EXPIRY=10m

Do not commit your real environment variables to GitHub.

4. Start the Backend
npm run dev

The backend should start on:

http://localhost:5001

If port 5001 is already being used, stop the existing Node process or change the configured port.

5. Install Frontend Dependencies

Open another terminal:

cd frontend
npm install
6. Start the Frontend
npm run dev

The frontend will normally be available at:

http://localhost:3000
Environment Variables

Example environment variables:

DATABASE_URL=your_database_url
TOKEN_SECRET=your_secret_key
TOKEN_EXPIRY=10m
PORT=5001

Never upload:

.env
.env.local
.env.*.local

to GitHub.

Development Notes

The project currently uses a mock/demo payment flow for development and testing.

For a production deployment, the payment system would need to be connected to a real payment provider and should include:

Payment provider webhooks
Server-side payment verification
Idempotency handling
Secure secret management
Rate limiting
Input validation
Authentication improvements
Transaction rollback handling
Fraud prevention
Production monitoring
HTTPS
Proper error handling
Database backups
Future Improvements

Some features that can be added in future versions include:

Real payment gateway integration
OTP-based phone verification
User recharge history
Saved mobile numbers
Automatic recharge
Recharge reminders
Cashback system
Promotional offers
Email/SMS notifications
Advanced analytics
Exportable transaction reports
Admin authentication
Role-based access control
Better payment failure recovery
Production deployment
What I Learned

Working on ValueRecharge provided hands-on experience with several parts of modern web development:

Building interfaces with React and Next.js
Developing REST APIs using Express.js
Working with TypeScript
Designing PostgreSQL database structures
Connecting frontend applications with backend APIs
Implementing JWT-based authentication and checkout verification
Handling transaction data
Debugging API and database issues
Working with Git and GitHub
Structuring a full-stack project
Building a transaction analytics dashboard
Internship / Project Description

ValueRecharge — Full-Stack Web Development Project

Developed a full-stack prepaid mobile recharge platform using Next.js, React, TypeScript, Node.js, Express.js, and PostgreSQL. Built the recharge workflow, carrier and plan selection, payment flow, JWT-based checkout verification, transaction APIs, database integration, and transaction analytics dashboard. Worked on API integration, debugging, database operations, and responsive frontend development.

Project Status

Current Status: Development / Portfolio Project

The application is functional for demonstration and development purposes. Payment processing currently uses a mock/demo flow rather than a production payment provider.

Author

Akshat Mishra

B.Tech — Computer Science & Engineering (AIML)
Manipal University Jaipur

GitHub:
https://github.com/akm8613

Repository

GitHub Repository:

https://github.com/akm8613/value-recharge

Disclaimer

ValueRecharge is an internship and portfolio project created for learning and demonstration purposes.

The payment functionality included in the current version is intended for testing and demonstration and should not be used to process real financial transactions without implementing the required production security, payment-provider verification, compliance, and infrastructure controls.