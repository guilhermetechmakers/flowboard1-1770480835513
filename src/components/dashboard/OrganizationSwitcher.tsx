import { useState } from 'react'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Button } from '@/components/ui/button'
import { ChevronDown, Building2, Check } from 'lucide-react'
import { cn } from '@/lib/utils'
import type { Organization } from '@/types'

export interface OrganizationSwitcherProps {
  organizations: Organization[]
  currentOrganization?: Organization
  onOrganizationChange?: (org: Organization) => void
  emptyMessage?: string
  className?: string
}

export function OrganizationSwitcher({
  organizations,
  currentOrganization,
  onOrganizationChange,
  emptyMessage = 'No organizations',
  className,
}: OrganizationSwitcherProps) {
  const [open, setOpen] = useState(false)
  const selected = currentOrganization ?? organizations[0]

  if (organizations.length === 0) {
    return (
      <div
        className={cn(
          'flex items-center gap-2 rounded-md border border-border px-3 py-2 text-sm text-muted-foreground',
          className
        )}
      >
        <Building2 className="h-4 w-4" />
        <span>{emptyMessage}</span>
      </div>
    )
  }

  return (
    <DropdownMenu open={open} onOpenChange={setOpen}>
      <DropdownMenuTrigger asChild>
        <Button
          variant="outline"
          className={cn(
            'flex items-center gap-2 min-w-[180px] justify-between transition-all duration-200 hover:scale-[1.01]',
            className
          )}
          aria-label="Switch organization"
        >
          <div className="flex items-center gap-2 min-w-0">
            <Building2 className="h-4 w-4 shrink-0 text-muted-foreground" />
            <span className="truncate">{selected?.name ?? 'Select organization'}</span>
          </div>
          <ChevronDown className="h-4 w-4 shrink-0" />
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="start" className="w-[var(--radix-dropdown-menu-trigger-width)]">
        <DropdownMenuLabel>Organizations</DropdownMenuLabel>
        <DropdownMenuSeparator />
        {organizations.map((org) => (
          <DropdownMenuItem
            key={org.id}
            onClick={() => {
              onOrganizationChange?.(org)
              setOpen(false)
            }}
            className="flex items-center justify-between cursor-pointer"
          >
            <span className="truncate">{org.name}</span>
            {selected?.id === org.id && (
              <Check className="h-4 w-4 shrink-0 text-primary" />
            )}
          </DropdownMenuItem>
        ))}
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
