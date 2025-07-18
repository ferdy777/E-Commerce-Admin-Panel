E-Commerce Admin Panel
A lightweight admin panel for managing products in an online store. Built with React, TypeScript, Tailwind CSS, React Query, Context API, and React Toastify, this app interacts with the Platzi Fake Store API.

🚀 Features
Authentication (JWT)

Login using API credentials and store token in localStorage.

Context API manages authentication globally.

Product Management

Display product list with image, title, price, and category.

Search by title and filter by category.

Client-side pagination.

Create / Edit Products

Form to create or update products (title, price, description, category, images).

Prefill data when editing.

Delete Products

Confirmation modal and optimistic UI updates.

Notifications

Integrated React Toastify for success/error messages on login, logout, add, edit, and delete actions.

State Management

React Query for data fetching and caching.

Context API for authentication state.

Responsive UI

Built with Tailwind CSS, optimized for mobile and desktop.

🛠 Tech Stack
React 18+

TypeScript

Tailwind CSS

React Router

React Query

Context API

React Toastify (for notifications)

✅ Setup Instructions

1. Clone Repository
   git clone <your-repo-url>
   cd e-commerce-admin-panel
2. Install Dependencies
   yarn install
3. Environment Variables
   Create a .env file in the root directory and add:
   VITE_API_BASE_URL=https://api.escuelajs.co/api/v1
4. Run the App
   yarn dev
   The app will start at http://localhost:5173.

🔑 Example Login Credentials
{
"email": "john@mail.com",
"password": "changeme"
}

State Management

Auth: Context API

Data Fetching: React Query

Authentication Flow

Login → API returns JWT → stored in localStorage → Context updates → Protected routes verify token.

⚖️ Trade-Offs & Decisions
Context API for Auth: Simpler than Redux/Zustand for small-scale auth state.

React Query: Chosen for caching, refetching, and simplified API state management.

React Toastify: Provides a polished notification system with minimal setup.

Client-Side Pagination: Implemented due to API constraints; could migrate to server-side later.
