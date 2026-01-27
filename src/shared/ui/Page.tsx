import type { ReactNode } from 'react'

interface PageProps {
  children: ReactNode
  className?: string
}

/**
 * Shared page layout wrapper
 */
export default function Page({ children, className = '' }: PageProps) {
  return (
    <div className={`max-w-md mx-auto p-4 ${className}`}>
      {children}
    </div>
  )
}

