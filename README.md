# Track-Drug: Essential Medicines Management System

This is a full-stack application built with React (Frontend) and Node.js/Express (Backend).

## Tech Stack
- **Frontend**: React, Vite, Tailwind CSS, Lucide Icons, Framer Motion
- **Backend**: Node.js, Express, PostgreSQL
- **Authentication**: JWT (JSON Web Tokens), Bcryptjs
- **Validation**: Zod

---

## Local Setup

### 1. Clone the Repository
```bash
git clone <your-repo-url>
cd <your-repo-name>
```

### 2. Install Dependencies
```bash
npm install
```

### 3. Environment Variables
Create a `.env` file in the root directory and add the following:
```env
DATABASE_URL=postgresql://user:password@localhost:5432/med_db
JWT_SECRET=your_super_secret_key
```

### 4. Run the Application
```bash
npm run dev
```
The application will be available at `http://localhost:3000`.

---

## Deployment

### 1. Database Setup
This application requires a PostgreSQL database. You can use services like:
- **Render (PostgreSQL)**: Free tier available.
- **Supabase**: Managed PostgreSQL.
- **Neon**: Serverless PostgreSQL.

Once you have your database, copy the **Connection String** (e.g., `postgresql://...`).

### 2. Deploy on Render (Full-Stack)
Render is great for hosting both the backend and the database.

1.  **Create a New Web Service** on Render.
2.  **Connect your GitHub repository**.
3.  **Configure the Service**:
    -   **Environment**: `Node`
    -   **Build Command**: `npm install && npm run build`
    -   **Start Command**: `npm start`
4.  **Add Environment Variables**:
    -   `DATABASE_URL`: (Your PostgreSQL connection string)
    -   `JWT_SECRET`: (A random secret string)
    -   `NODE_ENV`: `production`

### 3. Deploy on Vercel
Vercel is optimized for frontend and serverless functions.

1.  **Import your project** to Vercel.
2.  **Configure the Project**:
    -   **Framework Preset**: `Vite`
    -   **Build Command**: `npm run build`
    -   **Output Directory**: `dist`
3.  **Add Environment Variables**:
    -   `DATABASE_URL`: (Your PostgreSQL connection string)
    -   `JWT_SECRET`: (A random secret string)
    -   `VERCEL`: `1` (This tells the server to skip the standard `app.listen()` call)
4.  **Deploy**.

---

## Database Connection Details
The application uses the `pg` library to connect to PostgreSQL.

- **Initialization**: On the first run, the application will automatically create the necessary tables (`users`, `medicines`, `transactions`) and seed initial data if the database is empty.


## Features

- **Inventory Management**: Track stock levels, batch numbers, and expiry dates.
- **Low Stock Alerts**: Visual indicators for items below threshold.
- **Transaction History**: Audit log of all stock additions and usage.
- **User Management**: Manage system users and access rights.
- **Dashboard**: High-level overview of facility health.
- **Responsive Design**: Works on desktops, tablets, and mobile devices.
- **Data Backup & Recovery**: All inventory data is automatically stored in the database.
