# ZOHAR INSPIRED 2026 Registration Portal

Welcome to the **INSPIRED 2026** registration and landing page repository, built by ZOHAR. This application provides a beautiful, animated landing page to inspire the next generation of legacy builders, alongside a robust registration system to secure seats for the event.

## 🚀 Tech Stack

- **Frontend Framework**: [React 19](https://react.dev/)
- **Routing & SSR**: [TanStack Start](https://tanstack.com/start/latest) & [TanStack Router](https://tanstack.com/router/latest)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Animations**: [Framer Motion](https://motion.dev/)
- **Backend & Database**: [Supabase](https://supabase.com/) (PostgreSQL)
- **Tooling**: [Vite](https://vitejs.dev/), TypeScript, ESLint

## ✨ Key Features

- **Animated Hero Section**: Built using customized framer-motion and parallax floating components for an engaging user experience.
- **Seat-limited Registration**: The backend explicitly limits registrations to 100 seats using a PostgreSQL advisory lock and transaction logic to prevent overbooking.
- **Admin Dashboard**: A protected `/admin` route that verifies user roles via Supabase RLS. Authorized admins can view all registered attendees and instantly download the list as an Excel (`.xlsx`) file.

## 🛠️ Getting Started

### Prerequisites
- Node.js (v18+)
- A [Supabase](https://supabase.com/) account and project.

### Environment Setup

Create a `.env` file in the root of the project with your Supabase credentials:

```env
SUPABASE_PROJECT_ID="your_project_id"
SUPABASE_URL="https://your_project_id.supabase.co"
SUPABASE_PUBLISHABLE_KEY="your_anon_key"
SUPABASE_SERVICE_ROLE_KEY="your_service_role_key"

VITE_SUPABASE_PROJECT_ID="your_project_id"
VITE_SUPABASE_URL="https://your_project_id.supabase.co"
VITE_SUPABASE_PUBLISHABLE_KEY="your_anon_key"
```

> **Security Note:** The `SUPABASE_SERVICE_ROLE_KEY` bypasses Row Level Security (RLS) and is strictly required for the server-side registration handler and admin role checks. Never expose this key to the browser!

### Database Setup

You must push the required schema and functions to your Supabase instance:

```bash
# Link your local project to your remote Supabase instance
npx supabase link --project-ref your_project_id

# Push the database migrations
npx supabase db push
```

### Installation & Running Locally

1. Install NPM dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Open your browser and navigate to `http://localhost:8080`

### Making a User an Admin

To grant a user access to the `/admin` dashboard, their UUID must be added to the `user_roles` table with the `admin` role. You can do this via the Supabase Dashboard, or by executing a query against your database:

```sql
INSERT INTO public.user_roles (user_id, role) 
VALUES ('user-uuid-here', 'admin');
```

## 📜 License
© 2026 ZOHAR. All rights reserved.
