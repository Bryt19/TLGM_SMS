# TLGM SMS – React + Vite Project

Welcome to the TLGM SMS project! This web app uses React (with JSX), Vite for fast development, and connects to the TLGM SMS back-end. It's set up for easy deployment, excellent developer experience, and future feature expansion.

---

## 🚀 Getting Started

1. **Install dependencies**  
   ```bash
   npm install
   ```

2. **Start the development server**  
   ```bash
   npm run dev
   ```
   The app will be available at `http://localhost:5173` (or another port if in use).

3. **Build for production**  
   ```bash
   npm run build
   ```
   Output goes to the `dist` directory.

---

## 🌐 Project Structure

- `src/` — Main source code
  - `pages/` — Major page components (e.g., Register)
  - `components/` — Reusable UI components
  - `services/` — API connection logic
- `public/` — Static assets (favicons, etc.)
- `index.html` — App HTML entry

---

## 🔐 Environment Variables

Set required API endpoint and config in a `.env` file (see `.env.example`).  
**Example:**
```
VITE_API_BASE_URL=https://your-api-url.example.com
```

---

## ⚠️ Troubleshooting

- If you get CORS or "ngrok" warnings, check your API base URL and use the correct development endpoint.
- For issues with dependencies, run `npm install` again or delete `node_modules` and reinstall.

---

## 🛡️ Linting & Code Quality

- ESLint is set up for React and JS/JSX best practices.
- To lint:  
  ```bash
  npm run lint
  ```
- You can add further lint plugins for React as needed. See the [eslint-plugin-react-x](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-x) and [eslint-plugin-react-dom](https://github.com/Rel1cx/eslint-react/tree/main/packages/plugins/eslint-plugin-react-dom) docs if you want stricter rules.

---

## 📝 Customizing & Extending

- Update the `src/pages/Register.jsx` and `src/services/api.jsx` files to match your backend and desired fields.
- To add additional ESLint or Vite plugins, update your config files (`vite.config.js`, etc).

---

## 🚀 Deployment to Vercel

This project is ready to deploy on Vercel. Follow these steps:

1. **Push your code to GitHub/GitLab/Bitbucket**

2. **Import your repository to Vercel:**
   - Go to [vercel.com](https://vercel.com)
   - Click "Add New Project"
   - Import your repository

3. **Configure Environment Variables:**
   - In Vercel project settings, go to "Environment Variables"
   - Add `VITE_API_BASE_URL` with your production API URL
   - Example: `VITE_API_BASE_URL=https://your-production-api.com`

4. **Deploy:**
   - Vercel will automatically detect Vite and deploy
   - The `vercel.json` file is already configured
   - Build command: `npm run build`
   - Output directory: `dist`

5. **Verify:**
   - After deployment, check that all routes work correctly
   - Test the API connection with your production backend

**Note:** Make sure your backend API has CORS configured to allow requests from your Vercel domain.

---

## 📋 More

- Designed for easy deployment to static hosts (like Netlify, Vercel, etc.).
- For accessibility, testing or other best practices, consider integrating more tools as your project grows.

---

**Feel free to contribute or open issues if you find any bugs or have suggestions.**

