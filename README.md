# Track-Drug: Essential Medicines Management System

This is a full-stack application built with React (Frontend) and Node.js/Express (Backend).

## Project Structure

- `server.ts`: The Express server that handles API requests and serves the frontend.
- `src/`: React frontend source code.
- `package.json`: Project dependencies and scripts.
- `vite.config.ts`: Vite configuration for the frontend.

## How to Run Locally (VS Code)

1. **Install Dependencies**:
   Open your terminal in VS Code and run:
   ```bash
   npm install
   ```

2. **Start Development Server**:
   Run the following command to start both the backend and frontend (via Vite middleware):
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:3000`.

3. **Build for Production**:
   To create a production build:
   ```bash
   npm run build
   ```
   The static files will be generated in the `dist/` folder.

## Deployment

### Render (Backend)
- Connect your GitHub repository to Render.
- Select **Web Service**.
- Build Command: `npm install && npm run build`
- Start Command: `node server.ts` (Ensure `NODE_ENV` is set to `production`)

### Vercel (Frontend)
- If you want to deploy the frontend separately to Vercel, you can connect the repo and set the build command to `npm run build` and output directory to `dist`.
- Note: You will need to update the API fetch URLs in `src/App.tsx` to point to your Render backend URL if deployed separately.

## Features

- **Inventory Management**: Track stock levels, batch numbers, and expiry dates.
- **Low Stock Alerts**: Visual indicators for items below threshold.
- **Transaction History**: Audit log of all stock additions and usage.
- **Dashboard**: High-level overview of facility health.
- **Responsive Design**: Works on desktops, tablets, and mobile devices.
