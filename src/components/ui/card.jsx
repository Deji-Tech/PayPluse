import { cn } from '../../lib/utils'

export function Card({ className, ...props }) {
  return <div className={cn('bg-surface-card border border-border rounded-2xl', className)} {...props} />
}

export function CardHeader({ className, ...props }) {
  return <div className={cn('p-6 pb-0', className)} {...props} />
}

export function CardTitle({ className, ...props }) {
  return <h3 className={cn('text-base font-semibold text-accent', className)} {...props} />
}

export function CardDescription({ className, ...props }) {
  return <p className={cn('text-sm text-muted mt-1', className)} {...props} />
}

export function CardContent({ className, ...props }) {
  return <div className={cn('p-6', className)} {...props} />
}

export function CardFooter({ className, ...props }) {
  return <div className={cn('p-6 pt-0 flex items-center gap-3', className)} {...props} />
}
