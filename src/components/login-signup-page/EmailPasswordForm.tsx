import { Controller, type UseFormRegister, type Control, type FieldErrors, type UseFormHandleSubmit } from 'react-hook-form'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'

export const loginSchema = z.object({
  email: z.string().email('Invalid email'),
  password: z.string().min(1, 'Password required'),
  remember: z.boolean().optional(),
})

export const signupSchema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'At least 8 characters'),
  org: z.string().optional(),
  terms: z.boolean().refine((v) => v === true, 'You must accept the terms'),
})

export type LoginFormData = z.infer<typeof loginSchema>
export type SignupFormData = z.infer<typeof signupSchema>

interface EmailPasswordFormPropsBase {
  onSubmit: (data: LoginFormData | SignupFormData) => void
  isLoading?: boolean
  passwordResetSlot?: React.ReactNode
  legalNoticeSlot?: React.ReactNode
}

export interface EmailPasswordFormPropsLogin extends EmailPasswordFormPropsBase {
  mode: 'login'
  register: UseFormRegister<LoginFormData>
  control: Control<LoginFormData>
  errors: FieldErrors<LoginFormData>
  handleSubmit: UseFormHandleSubmit<LoginFormData>
}

export interface EmailPasswordFormPropsSignup extends EmailPasswordFormPropsBase {
  mode: 'signup'
  register: UseFormRegister<SignupFormData>
  control: Control<SignupFormData>
  errors: FieldErrors<SignupFormData>
  handleSubmit: UseFormHandleSubmit<SignupFormData>
}

export type EmailPasswordFormProps = EmailPasswordFormPropsLogin | EmailPasswordFormPropsSignup

type CombinedFormData = LoginFormData | SignupFormData

export function EmailPasswordForm({
  mode,
  onSubmit,
  isLoading,
  register,
  control,
  errors,
  handleSubmit,
  passwordResetSlot,
  legalNoticeSlot,
}: EmailPasswordFormProps) {
  const reg = register as UseFormRegister<CombinedFormData>
  const ctrl = control as Control<CombinedFormData>

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      {mode === 'signup' && (
        <div className="animate-fade-in">
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Jane Doe"
            className="mt-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary"
            {...reg('name')}
          />
          {'name' in errors && errors.name && (
            <p className="mt-1 text-sm text-destructive animate-fade-in">
              {(errors.name as { message?: string }).message}
            </p>
          )}
        </div>
      )}
      <div>
        <Label htmlFor="email">Email</Label>
        <Input
          id="email"
          type="email"
          placeholder="you@example.com"
          className="mt-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary"
          {...reg('email')}
        />
        {errors.email && (
          <p className="mt-1 text-sm text-destructive animate-fade-in">
            {(errors.email as { message?: string }).message}
          </p>
        )}
      </div>
      <div>
        <Label htmlFor="password">Password</Label>
        <Input
          id="password"
          type="password"
          placeholder="••••••••"
          className="mt-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary"
          {...reg('password')}
        />
        {errors.password && (
          <p className="mt-1 text-sm text-destructive animate-fade-in">
            {(errors.password as { message?: string }).message}
          </p>
        )}
      </div>
      {mode === 'signup' && (
        <div className="animate-fade-in">
          <Label htmlFor="org">Organization (optional)</Label>
          <Input
            id="org"
            placeholder="Acme Inc"
            className="mt-2 transition-colors duration-200 focus-visible:ring-2 focus-visible:ring-primary"
            {...reg('org')}
          />
        </div>
      )}
      {mode === 'login' && (
        <div className="flex items-center justify-between">
          <Controller
            name="remember"
            control={ctrl}
            render={({ field }) => (
              <label className="flex cursor-pointer items-center gap-2">
                <Checkbox
                  checked={field.value}
                  onCheckedChange={field.onChange}
                  className="transition-transform duration-200 hover:scale-105"
                />
                <span className="text-sm">Remember me</span>
              </label>
            )}
          />
          {passwordResetSlot}
        </div>
      )}
      {mode === 'signup' && legalNoticeSlot}
      <Button
        type="submit"
        className="w-full transition-all duration-200 hover:scale-[1.02] hover:shadow-card-hover active:scale-[0.98]"
        disabled={isLoading}
      >
        {isLoading
          ? mode === 'login'
            ? 'Signing in...'
            : 'Creating account...'
          : mode === 'login'
            ? 'Log in'
            : 'Sign up'}
      </Button>
    </form>
  )
}
