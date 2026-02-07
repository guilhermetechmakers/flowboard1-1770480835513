import { createBrowserRouter, Navigate } from 'react-router-dom'
import { DashboardLayout } from '@/components/layout/dashboard-layout'
import { LandingPage } from '@/pages/landing'
import { LoginPage } from '@/pages/auth/login'
import { SignupPage } from '@/pages/auth/signup'
import { LoginSignupPage } from '@/pages/Login/SignupPage'
import { PasswordResetPage } from '@/pages/auth/password-reset'
import { VerifyEmailPage } from '@/pages/auth/verify-email'
import DashboardPage from '@/pages/Dashboard'
import { ProjectsPage } from '@/pages/dashboard/projects'
import { TemplatesPage } from '@/pages/dashboard/templates'
import { SettingsPage } from '@/pages/dashboard/settings'
import { UsersPage } from '@/pages/dashboard/users'
import { BillingPage } from '@/pages/dashboard/billing'
import { ProfilePage } from '@/pages/dashboard/profile'
import { AdminDashboardPage } from '@/pages/dashboard/admin'
import { ImportExportPage } from '@/pages/dashboard/import-export'
import { TransactionsPage } from '@/pages/dashboard/transactions'
import { BoardPage } from '@/pages/board/board'
import { CheckoutPage } from '@/pages/checkout'
import { NotFoundPage } from '@/pages/errors/not-found'
import { ServerErrorPage } from '@/pages/errors/server-error'
import { PrivacyPolicyPage } from '@/pages/legal/privacy'
import { TermsOfServicePage } from '@/pages/legal/terms'
import { AboutPage } from '@/pages/about'
import { DemoPage } from '@/pages/demo'
import { ContactPage } from '@/pages/contact'

export const router = createBrowserRouter([
  { path: '/', element: <LandingPage /> },
  { path: '/login', element: <LoginPage /> },
  { path: '/signup', element: <SignupPage /> },
  { path: '/login-/-signup-page', element: <LoginSignupPage /> },
  { path: '/login-signup', element: <LoginSignupPage /> },
  { path: '/password-reset', element: <PasswordResetPage /> },
  { path: '/verify-email', element: <VerifyEmailPage /> },
  { path: '/demo', element: <DemoPage /> },
  { path: '/about', element: <AboutPage /> },
  { path: '/contact', element: <ContactPage /> },
  { path: '/privacy', element: <PrivacyPolicyPage /> },
  { path: '/terms', element: <TermsOfServicePage /> },
  { path: '/checkout', element: <CheckoutPage /> },
  { path: '/500', element: <ServerErrorPage /> },
  {
    path: '/dashboard',
    element: <DashboardLayout />,
    children: [
      { index: true, element: <DashboardPage /> },
      { path: 'projects', element: <ProjectsPage /> },
      { path: 'projects/new', element: <Navigate to="/board/new" replace /> },
      { path: 'templates', element: <TemplatesPage /> },
      { path: 'settings', element: <SettingsPage /> },
      { path: 'users', element: <UsersPage /> },
      { path: 'billing', element: <BillingPage /> },
      { path: 'profile', element: <ProfilePage /> },
      { path: 'admin', element: <AdminDashboardPage /> },
      { path: 'import', element: <ImportExportPage /> },
      { path: 'transactions', element: <TransactionsPage /> },
    ],
  },
  { path: '/board/:boardId', element: <BoardPage /> },
  { path: '/docs', element: <Navigate to="/about" replace /> },
  { path: '*', element: <NotFoundPage /> },
])
