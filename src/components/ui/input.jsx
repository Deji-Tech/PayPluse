import { forwardRef } from 'react'
import { cn } from '../../lib/utils'

const Input = forwardRef(({ className, label, icon: Icon, ...props }, ref) => {
  return (
    <div className="space-y-1.5">
      {label && (
        <label className="text-[10px] font-mono text-muted uppercase tracking-wider">{label}</label>
      )}
      <div className="relative">
        {Icon && (
          <Icon size={16} className="absolute left-3.5 top-1/2 -translate-y-1/2 text-muted pointer-events-none" />
        )}
        <input
          ref={ref}
          className={cn(
            'w-full px-4 py-2.5 rounded-lg border border-border bg-surface text-text-primary text-sm placeholder:text-muted/50',
            'focus:outline-none focus:border-accent focus:ring-2 focus:ring-accent/10',
            'transition-all disabled:opacity-50 disabled:cursor-not-allowed',
            Icon && 'pl-10',
            className
          )}
          {...props}
        />
      </div>
    </div>
  )
})
Input.displayName = 'Input'

export { Input }
