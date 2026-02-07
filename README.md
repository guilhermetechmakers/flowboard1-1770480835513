# FlowBoard

AI-assisted collaborative visual board for teams to organize ideas, research, data, and workflows as connected flowchart nodes.

## Setup

```bash
npm install
npm run build
```

> **Note:** If `vite` is not found after install, run `npm install --include=dev` to ensure devDependencies are installed.

## Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build
- `npm run lint` - Run ESLint

## Tech Stack

- React 18 + TypeScript
- Vite
- React Router 6
- Tailwind CSS v3
- Radix UI / Shadcn-style components
- Sonner (toasts)
- Recharts
- React Hook Form + Zod

## Pages

- Landing, Login, Signup, Password Reset, Email Verification
- Dashboard (Overview, Projects, Templates, Settings, Users, Billing, Profile, Admin)
- Board (Visual Canvas with nodes, AI Agent panel, Node Detail)
- Import/Export, Checkout, Transactions
- Privacy, Terms, About, Contact
- 404, 500 error pages
