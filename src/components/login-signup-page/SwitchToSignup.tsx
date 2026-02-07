import { Button } from '@/components/ui/button'

export interface SwitchToSignupProps {
  mode: 'login' | 'signup'
  onToggle: () => void
}

export function SwitchToSignup({ mode, onToggle }: SwitchToSignupProps) {
  return (
    <p className="text-center text-sm text-muted-foreground">
      {mode === 'login' ? (
        <>
          Don&apos;t have an account?{' '}
          <Button
            type="button"
            variant="link"
            className="h-auto p-0 text-primary hover:underline"
            onClick={onToggle}
          >
            Sign up
          </Button>
        </>
      ) : (
        <>
          Already have an account?{' '}
          <Button
            type="button"
            variant="link"
            className="h-auto p-0 text-primary hover:underline"
            onClick={onToggle}
          >
            Log in
          </Button>
        </>
      )}
    </p>
  )
}
