import { Link } from 'react-router-dom'

export interface LegalNoticeProps {
  /** When true, shows as a checkbox for signup terms acceptance */
  asCheckbox?: boolean
  checked?: boolean
  onCheckedChange?: (checked: boolean) => void
}

export function LegalNotice({ asCheckbox = false }: LegalNoticeProps) {
  if (asCheckbox) {
    return null
  }

  return (
    <p className="text-center text-xs text-muted-foreground">
      By continuing, you agree to our{' '}
      <Link
        to="/terms"
        className="text-primary transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
      >
        Terms
      </Link>{' '}
      and{' '}
      <Link
        to="/privacy"
        className="text-primary transition-colors duration-200 hover:underline focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:ring-offset-2 rounded"
      >
        Privacy Policy
      </Link>
      .
    </p>
  )
}
