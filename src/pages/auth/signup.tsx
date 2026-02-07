import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useForm, Controller } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { Checkbox } from '@/components/ui/checkbox'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LayoutGrid } from 'lucide-react'
import { toast } from 'sonner'

const schema = z.object({
  name: z.string().min(1, 'Name required'),
  email: z.string().email('Invalid email'),
  password: z.string().min(8, 'At least 8 characters'),
  org: z.string().optional(),
  terms: z.boolean().refine((v) => v === true, 'You must accept the terms'),
})

type FormData = z.infer<typeof schema>

export function SignupPage() {
  const [isLoading, setIsLoading] = useState(false)
  const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  })

  const onSubmit = async (data: FormData) => {
    setIsLoading(true)
    try {
      localStorage.setItem('token', 'mock-token')
      localStorage.setItem('user', JSON.stringify({ email: data.email, name: data.name }))
      toast.success('Account created!')
      navigate('/dashboard')
    } catch {
      toast.error('Something went wrong')
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4 py-12">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <LayoutGrid className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold">FlowBoard</span>
        </Link>
        <Card>
          <CardHeader>
            <CardTitle>Create an account</CardTitle>
            <CardDescription>Get started with FlowBoard</CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
              <div>
                <Label htmlFor="name">Name</Label>
                <Input id="name" placeholder="Jane Doe" className="mt-2" {...register('name')} />
                {errors.name && (
                  <p className="mt-1 text-sm text-destructive">{errors.name.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="email">Email</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="you@example.com"
                  className="mt-2"
                  {...register('email')}
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-destructive">{errors.email.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="password">Password</Label>
                <Input
                  id="password"
                  type="password"
                  placeholder="••••••••"
                  className="mt-2"
                  {...register('password')}
                />
                {errors.password && (
                  <p className="mt-1 text-sm text-destructive">{errors.password.message}</p>
                )}
              </div>
              <div>
                <Label htmlFor="org">Organization (optional)</Label>
                <Input id="org" placeholder="Acme Inc" className="mt-2" {...register('org')} />
              </div>
              <div>
                <Controller
                  name="terms"
                  control={control}
                  render={({ field }) => (
                    <label className="flex items-start gap-2 cursor-pointer">
                      <Checkbox
                        className="mt-0.5"
                        checked={field.value}
                        onCheckedChange={field.onChange}
                      />
                      <span className="text-sm">
                        I agree to the{' '}
                        <Link to="/terms" className="text-primary hover:underline">Terms</Link> and{' '}
                        <Link to="/privacy" className="text-primary hover:underline">Privacy Policy</Link>
                      </span>
                    </label>
                  )}
                />
                {errors.terms && (
                  <p className="mt-1 text-sm text-destructive">{errors.terms.message}</p>
                )}
              </div>
              <Button type="submit" className="w-full" disabled={isLoading}>
                {isLoading ? 'Creating account...' : 'Sign up'}
              </Button>
            </form>
            <div className="mt-6">
              <div className="relative">
                <div className="absolute inset-0 flex items-center">
                  <span className="w-full border-t border-border" />
                </div>
                <div className="relative flex justify-center text-xs uppercase">
                  <span className="bg-card px-2 text-muted-foreground">Or continue with</span>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-4">
                <Button variant="outline" type="button" disabled>
                  Google
                </Button>
                <Button variant="outline" type="button" disabled>
                  Microsoft
                </Button>
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-muted-foreground">
              Already have an account?{' '}
              <Link to="/login" className="text-primary hover:underline">
                Log in
              </Link>
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
