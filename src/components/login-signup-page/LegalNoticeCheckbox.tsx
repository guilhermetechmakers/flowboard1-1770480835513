import { Link } from 'react-router-dom'
import { Controller } from 'react-hook-form'
import { Checkbox } from '@/components/ui/checkbox'
import type { Control, FieldErrors } from 'react-hook-form'
import type { SignupFormData } from './EmailPasswordForm'

export interface LegalNoticeCheckboxProps {
  control: Control<SignupFormData>
  errors: FieldErrors<SignupFormData>
}

export function LegalNoticeCheckbox({ control, errors }: LegalNoticeCheckboxProps) {
  return (
    <div>
      <Controller
        name="terms"
        control={control}
        render={({ field }) => (
          <label className="flex cursor-pointer items-start gap-2">
            <Checkbox
              className="mt-0.5 transition-transform duration-200 hover:scale-105"
              checked={field.value}
              onCheckedChange={field.onChange}
            />
            <span className="text-sm">
              I agree to the{' '}
              <Link
                to="/terms"
                className="text-primary transition-colors duration-200 hover:underline"
              >
                Terms
              </Link>{' '}
              and{' '}
              <Link
                to="/privacy"
                className="text-primary transition-colors duration-200 hover:underline"
              >
                Privacy Policy
              </Link>
            </span>
          </label>
        )}
      />
      {errors.terms && (
        <p className="mt-1 text-sm text-destructive animate-fade-in">
          {errors.terms.message}
        </p>
      )}
    </div>
  )
}
