import { useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { LayoutGrid } from 'lucide-react'
import { toast } from 'sonner'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import {
  EmailPasswordForm,
  loginSchema,
  signupSchema,
  SocialSSOButtons,
  SwitchToSignup,
  PasswordResetLink,
  LegalNotice,
  LegalNoticeCheckbox,
} from '@/components/login-signup-page'
import type { LoginFormData, SignupFormData } from '@/components/login-signup-page'

export function LoginSignupPage() {
  const [mode, setMode] = useState<'login' | 'signup'>('login')
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()

  const loginForm = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
    defaultValues: { email: '', password: '', remember: false },
  })

  const signupForm = useForm<SignupFormData>({
    resolver: zodResolver(signupSchema),
    defaultValues: { name: '', email: '', password: '', org: '', terms: false },
  })

  const handleToggleMode = () => {
    setMode((prev) => (prev === 'login' ? 'signup' : 'login'))
  }

  useEffect(() => {
    document.title = 'Log in or Sign up — FlowBoard'
  }, [])

  const handleLoginSubmit = async (data: LoginFormData) => {
    setIsLoading(true)
    try {
      localStorage.setItem('token', 'mock-token')
      localStorage.setItem('user', JSON.stringify({ email: data.email, name: 'User' }))
      toast.success('Welcome back!')
      navigate('/dashboard')
    } catch {
      toast.error('Invalid email or password')
    } finally {
      setIsLoading(false)
    }
  }

  const handleSignupSubmit = async (data: SignupFormData) => {
    setIsLoading(true)
    try {
      localStorage.setItem('token', 'mock-token')
      localStorage.setItem(
        'user',
        JSON.stringify({ email: data.email, name: data.name, org: data.org })
      )
      toast.success('Account created!')
      navigate('/verify-email')
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  const onSubmit = (data: LoginFormData | SignupFormData) => {
    if (mode === 'login') {
      handleLoginSubmit(data as LoginFormData)
    } else {
      handleSignupSubmit(data as SignupFormData)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-accent/5 pointer-events-none" />
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_bottom_left,_var(--tw-gradient-stops))] from-primary/10 via-transparent to-transparent pointer-events-none" />

      <div className="relative w-full max-w-md animate-fade-in-up">
        <Link
          to="/"
          className="mb-8 flex items-center justify-center gap-2 transition-opacity duration-200 hover:opacity-80"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary shadow-card">
            <LayoutGrid className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold">FlowBoard</span>
        </Link>

        <Card className="border-border shadow-card transition-all duration-300 hover:shadow-card-hover">
          <CardHeader>
            <CardTitle className="text-2xl">
              {mode === 'login' ? 'Log in' : 'Create an account'}
            </CardTitle>
            <CardDescription>
              {mode === 'login'
                ? 'Enter your credentials to access your account'
                : 'Get started with FlowBoard'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {mode === 'login' ? (
              <EmailPasswordForm
                mode="login"
                onSubmit={onSubmit}
                isLoading={isLoading}
                register={loginForm.register}
                control={loginForm.control}
                errors={loginForm.formState.errors}
                handleSubmit={loginForm.handleSubmit}
                passwordResetSlot={<PasswordResetLink />}
              />
            ) : (
              <>
                <EmailPasswordForm
                  mode="signup"
                  onSubmit={onSubmit}
                  isLoading={isLoading}
                  register={signupForm.register}
                  control={signupForm.control}
                  errors={signupForm.formState.errors}
                  handleSubmit={signupForm.handleSubmit}
                />
                <div className="animate-fade-in">
                  <LegalNoticeCheckbox
                    control={signupForm.control}
                    errors={signupForm.formState.errors}
                  />
                </div>
              </>
            )}

            <SocialSSOButtons />

            <SwitchToSignup mode={mode} onToggle={handleToggleMode} />
          </CardContent>
        </Card>

        <div className="mt-6">
          <LegalNotice />
        </div>
      </div>
    </div>
  )
}
