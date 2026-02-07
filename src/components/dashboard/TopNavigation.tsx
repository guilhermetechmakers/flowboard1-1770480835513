import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { Search, Bell, Plus, User, Settings, LogOut } from 'lucide-react'
import { cn } from '@/lib/utils'
import { OrganizationSwitcher } from './OrganizationSwitcher'
import type { Organization } from '@/types'

const DEFAULT_ORGS: Organization[] = [
  { id: '1', name: 'Personal', plan: 'Free' },
  { id: '2', name: 'Acme Corp', plan: 'Pro' },
]

export interface TopNavigationProps {
  className?: string
  /** Optional slot for mobile menu button (renders on left on mobile) */
  mobileMenuSlot?: React.ReactNode
}

export function TopNavigation({ className, mobileMenuSlot }: TopNavigationProps) {
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header
      className={cn(
        'sticky top-0 z-30 flex h-16 items-center gap-4 border-b border-border bg-background px-4 shadow-sm',
        className
      )}
    >
      {mobileMenuSlot}
      <div className="flex flex-1 items-center gap-4">
        <div className="relative flex-1 max-w-md">
          <Search
            className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground"
            aria-hidden
          />
          <Input
            type="search"
            placeholder="Search projects..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-9 h-10 rounded-md border border-border bg-background focus-visible:ring-2 focus-visible:ring-primary"
            aria-label="Search projects"
          />
        </div>
        <Link to="/board-visual-canvas">
          <Button size="sm" className="transition-all duration-200 hover:scale-[1.02] active:scale-[0.98] hover:shadow-md">
            <Plus className="h-4 w-4 mr-2" aria-hidden />
            Create Project
          </Button>
        </Link>
      </div>

      <div className="flex items-center gap-2">
        <OrganizationSwitcher organizations={DEFAULT_ORGS} />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" size="icon" aria-label="Notifications">
              <Bell className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-80">
            <DropdownMenuLabel>Notifications</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <div className="p-4 text-sm text-muted-foreground">
              No new notifications
            </div>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <button
              className="flex h-9 w-9 items-center justify-center rounded-full bg-primary/20 text-primary font-medium transition-all hover:bg-primary/30 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary"
              aria-label="Profile menu"
            >
              <User className="h-4 w-4" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-56">
            <DropdownMenuLabel>My Account</DropdownMenuLabel>
            <DropdownMenuSeparator />
            <DropdownMenuItem asChild>
              <Link to="/dashboard/profile" className="cursor-pointer">
                <User className="mr-2 h-4 w-4" />
                Profile
              </Link>
            </DropdownMenuItem>
            <DropdownMenuItem asChild>
              <Link to="/dashboard/settings" className="cursor-pointer">
                <Settings className="mr-2 h-4 w-4" />
                Settings
              </Link>
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem className="cursor-pointer text-destructive focus:text-destructive">
              <LogOut className="mr-2 h-4 w-4" />
              Log out
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </header>
  )
}
