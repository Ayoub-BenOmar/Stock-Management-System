import * as React from "react"
import { cn } from "../../lib/utils"
import { ChevronDown } from "lucide-react"

interface SelectProps {
  value?: string
  onValueChange?: (value: string) => void
  children: React.ReactNode
  className?: string
}

const Select = React.forwardRef<HTMLDivElement, SelectProps>(
  ({ value, onValueChange, children, className, ...props }, ref) => {
    const [isOpen, setIsOpen] = React.useState(false)
    return (
      <div ref={ref} className={cn("relative", className)} {...props}>
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child) && child.type === SelectTrigger) {
            return React.cloneElement(child as React.ReactElement<any>, {
              isOpen,
              setIsOpen,
              value,
            } as any)
          }
          if (React.isValidElement(child) && child.type === SelectContent) {
            return React.cloneElement(child as React.ReactElement<any>, {
              isOpen,
              setIsOpen,
              value,
              onValueChange,
            } as any)
          }
          return child
        })}
      </div>
    )
  }
)
Select.displayName = "Select"

interface SelectTriggerProps {
  children: React.ReactNode
  className?: string
  value?: string
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
}

const SelectTrigger = React.forwardRef<HTMLButtonElement, SelectTriggerProps>(
  ({ className, children, value, isOpen, setIsOpen, ...props }, ref) => {
    const triggerRef = React.useRef<HTMLDivElement>(null)
    React.useEffect(() => {
      const handleClickOutside = (event: MouseEvent) => {
        if (triggerRef.current && !triggerRef.current.contains(event.target as Node)) {
          setIsOpen && setIsOpen(false)
        }
      }
      if (isOpen) {
        document.addEventListener('mousedown', handleClickOutside)
      }
      return () => {
        document.removeEventListener('mousedown', handleClickOutside)
      }
    }, [isOpen, setIsOpen])
    return (
      <div className="relative" ref={triggerRef}>
        <button
          ref={ref}
          type="button"
          className={cn(
            "flex h-10 w-full items-center justify-between rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50",
            className
          )}
          onClick={() => setIsOpen && setIsOpen(!isOpen)}
          {...props}
        >
          {children}
          <ChevronDown className={cn("h-4 w-4 opacity-50 transition-transform", isOpen && "rotate-180")} />
        </button>
      </div>
    )
  }
)
SelectTrigger.displayName = "SelectTrigger"

interface SelectContentProps {
  children: React.ReactNode
  className?: string
  value?: string
  onValueChange?: (value: string) => void
  isOpen?: boolean
  setIsOpen?: (open: boolean) => void
}

const SelectContent = React.forwardRef<HTMLDivElement, SelectContentProps>(
  ({ className, children, value, onValueChange, isOpen, setIsOpen, ...props }, ref) => {
    if (!isOpen) return null
    return (
      <div
        ref={ref}
        className={cn(
          "absolute top-full left-0 right-0 z-50 mt-1 max-h-60 overflow-auto rounded-md border bg-popover text-popover-foreground shadow-md",
          className
        )}
        {...props}
      >
        {React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            const c = child as React.ReactElement<any>;
            return React.cloneElement(c, {
              isSelected: c.props.value === value,
              onSelect: () => {
                onValueChange && onValueChange(c.props.value)
                setIsOpen && setIsOpen(false)
              },
            } as any)
          }
          return child
        })}
      </div>
    )
  }
)
SelectContent.displayName = "SelectContent"

interface SelectItemProps {
  children: React.ReactNode
  value: string
  className?: string
  isSelected?: boolean
  onSelect?: () => void
}

const SelectItem = React.forwardRef<HTMLDivElement, SelectItemProps>(
  ({ className, children, value, isSelected, onSelect, ...props }, ref) => (
    <div
      ref={ref}
      className={cn(
        "relative flex w-full cursor-pointer select-none items-center rounded-sm py-1.5 pl-8 pr-2 text-sm outline-none hover:bg-accent hover:text-accent-foreground focus:bg-accent focus:text-accent-foreground data-[disabled]:pointer-events-none data-[disabled]:opacity-50",
        isSelected && "bg-accent text-accent-foreground",
        className
      )}
      onClick={onSelect}
      tabIndex={0}
      role="option"
      {...props}
    >
      {isSelected && (
        <span className="absolute left-2 flex h-3.5 w-3.5 items-center justify-center">
          <svg
            className="h-4 w-4"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        </span>
      )}
      {children}
    </div>
  )
)
SelectItem.displayName = "SelectItem"

interface SelectValueProps {
  children?: React.ReactNode
  placeholder?: string
  className?: string
  value?: string
}

const SelectValue = React.forwardRef<HTMLSpanElement, SelectValueProps>(
  ({ className, children, placeholder, value, ...props }, ref) => (
    <span
      ref={ref}
      className={cn("block truncate", className)}
      {...props}
    >
      {value || children || placeholder}
    </span>
  )
)
SelectValue.displayName = "SelectValue"

export {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
}