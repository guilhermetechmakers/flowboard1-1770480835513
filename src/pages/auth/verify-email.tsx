import { useState } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card'
import { LayoutGrid, CheckCircle, XCircle } from 'lucide-react'
import { toast } from 'sonner'

export function VerifyEmailPage() {
  const [searchParams] = useSearchParams()
  const [isResending, setIsResending] = useState(false)
  const token = searchParams.get('token')
  const success = !!token

  const handleResend = async () => {
    setIsResending(true)
    try {
      await new Promise((r) => setTimeout(r, 500))
      toast.success('Verification email sent')
    } catch {
      toast.error('Failed to resend')
    } finally {
      setIsResending(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-muted/30 px-4">
      <div className="w-full max-w-md">
        <Link to="/" className="mb-8 flex items-center justify-center gap-2">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary">
            <LayoutGrid className="h-5 w-5 text-white" />
          </div>
          <span className="text-xl font-semibold">FlowBoard</span>
        </Link>
        <Card>
          <CardHeader>
            <div className="flex justify-center">
              {success ? (
                <CheckCircle className="h-16 w-16 text-accent" />
              ) : (
                <XCircle className="h-16 w-16 text-destructive" />
              )}
            </div>
            <CardTitle className="text-center">
              {success ? 'Email verified' : 'Verification failed'}
            </CardTitle>
            <CardDescription className="text-center">
              {success
                ? 'Your account has been verified. You can now access FlowBoard.'
                : 'The verification link may have expired or is invalid.'}
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            {success ? (
              <Link to="/dashboard">
                <Button className="w-full">Continue to Dashboard</Button>
              </Link>
            ) : (
              <>
                <Button
                  className="w-full"
                  variant="outline"
                  onClick={handleResend}
                  disabled={isResending}
                >
                  {isResending ? 'Sending...' : 'Resend verification email'}
                </Button>
                <Link to="/login">
                  <Button className="w-full">Back to login</Button>
                </Link>
              </>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
