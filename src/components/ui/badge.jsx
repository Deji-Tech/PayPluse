import { cn } from '../../lib/utils'

const variants = {
  default: 'bg-accent/5 text-accent border-accent/20',
  success: 'bg-success/10 text-success border-success/20',
  warning: 'bg-warning/10 text-warning border-warning/20',
  error: 'bg-error/10 text-error border-error/20',
  outline: 'bg-transparent text-muted border-border',
}

const sizes = {
  sm: 'px-2 py-0.5 text-[9px]',
  md: 'px-2.5 py-1 text-[10px]',
}

export function Badge({ className, variant = 'default', size = 'md', dot = false, children, ...props }) {
  return (
    <span
      className={cn(
        'inline-flex items-center gap-1.5 font-mono uppercase tracking-wider rounded-full border whitespace-nowrap',
        variants[variant],
        sizes[size],
        className
      )}
      {...props}
    >
      {dot && <span className={cn('w-1.5 h-1.5 rounded-full', {
        'bg-accent': variant === 'default',
        'bg-success': variant === 'success',
        'bg-warning': variant === 'warning',
        'bg-error': variant === 'error',
        'bg-muted': variant === 'outline',
      })} />}
      {children}
    </span>
  )
}
