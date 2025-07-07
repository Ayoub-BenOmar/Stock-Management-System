import * as React from "react"
import { cn } from "../../lib/utils"

interface DropdownMenuProps {
  children: React.ReactNode
}

interface DropdownMenuTriggerProps {
  children: React.ReactNode
  asChild?: boolean
  onClick?: (e?: React.MouseEvent) => void
}

interface DropdownMenuContentProps {
  children: React.ReactNode
  className?: string
  isOpen?: boolean
  align?: "start" | "center" | "end"
  side?: "top" | "right" | "bottom" | "left"
}

interface DropdownMenuItemProps {
  children: React.ReactNode
  onClick?: (e?: React.MouseEvent) => void
  className?: string
}

const DropdownMenu = ({ children }: DropdownMenuProps) => {
  const [isOpen, setIsOpen] = React.useState(false)
  const dropdownRef = React.useRef<HTMLDivElement>(null)
  
  React.useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsOpen(false)
      }
    }
    
    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    }
    
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen])
  
  const contextValue = React.useMemo(() => ({
    isOpen,
    setIsOpen
  }), [isOpen])
  
  return (
    <DropdownMenuContext.Provider value={contextValue}>
      <div ref={dropdownRef} className="relative inline-block text-left">{children}</div>
    </DropdownMenuContext.Provider>
  )
}

const DropdownMenuContext = React.createContext<{
  isOpen: boolean
  setIsOpen: (open: boolean) => void
} | null>(null)

const DropdownMenuTrigger = React.forwardRef<HTMLButtonElement, DropdownMenuTriggerProps>(
  ({ children, asChild, onClick, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext)
    if (!context) throw new Error("DropdownMenuTrigger must be used within DropdownMenu")
    
    const handleClick = (e: React.MouseEvent) => {
      context.setIsOpen(!context.isOpen)
      onClick?.(e)
    }
    
    if (asChild) {
      return React.cloneElement(children as React.ReactElement<any>, { 
        onClick: handleClick, 
        ...props 
      })
    }
    return (
      <button ref={ref} onClick={handleClick} {...props}>
        {children}
      </button>
    )
  }
)
DropdownMenuTrigger.displayName = "DropdownMenuTrigger"

const DropdownMenuContent = React.forwardRef<HTMLDivElement, DropdownMenuContentProps>(
  ({ children, className, isOpen: propIsOpen, align = "end", side = "bottom", ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext)
    const isOpen = propIsOpen ?? context?.isOpen ?? false
    
    if (!isOpen) return null
    
    const getPositionClasses = () => {
      const alignClasses = {
        start: "left-0",
        center: "left-1/2 transform -translate-x-1/2",
        end: "right-0"
      }
      
      const sideClasses = {
        top: "bottom-full mb-2",
        right: "left-full ml-2",
        bottom: "top-full mt-2",
        left: "right-full mr-2"
      }
      
      return `${alignClasses[align]} ${sideClasses[side]}`
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "absolute w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none z-50",
          getPositionClasses(),
          className
        )}
        {...props}
      >
        <div className="py-1">{children}</div>
      </div>
    )
  }
)
DropdownMenuContent.displayName = "DropdownMenuContent"

const DropdownMenuItem = React.forwardRef<HTMLDivElement, DropdownMenuItemProps>(
  ({ children, onClick, className, ...props }, ref) => {
    const context = React.useContext(DropdownMenuContext)
    
    const handleClick = (e: React.MouseEvent) => {
      context?.setIsOpen(false)
      onClick?.(e)
    }
    
    return (
      <div
        ref={ref}
        className={cn(
          "block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer",
          className
        )}
        onClick={handleClick}
        {...props}
      >
        {children}
      </div>
    )
  }
)
DropdownMenuItem.displayName = "DropdownMenuItem"

export { DropdownMenu, DropdownMenuTrigger, DropdownMenuContent, DropdownMenuItem } 