/**
 * SuccessToast Component
 *
 * A component that renders a success toast message using either `shadcn` or `react-hot-toast` styles.
 * The toast can be customized by setting the `variant` and `className` props.
 * 
 * @param {Object} props - The properties object.
 * @param {string} props.message - The success message to display in the toast.
 * @param {string} [props.className] - Additional CSS classes to apply to the toast container (optional).
 * @param {'shadcn' | 'hot-toast'} [props.variant='shadcn'] - Specifies which toast style variant to use, 
 *      either 'shadcn' (default) or 'hot-toast'.
 * 
 * @returns {JSX.Element|null} The JSX element for the toast provider and viewport if `shadcn` variant is selected; 
 *      otherwise, returns `null`.
 * 
 * @example
 * // Render a toast with a message using the default `shadcn` variant.
 * <SuccessToast message="Operation successful!" />
 * 
 * @example
 * // Render a toast with a message using the `hot-toast` variant.
 * <SuccessToast message="Saved successfully!" variant="hot-toast" />
 */
'use client'

import { useState, useEffect } from 'react'
import { ToastProvider, ToastViewport } from "@/components/ui/toast"
import { useToast } from "@/hooks/use-toast"
import { CheckCircle } from "lucide-react"
import { toast as hotToast } from 'react-hot-toast'

type SuccessToastProps = {
  message: string | undefined
  className?: string
  variant?: 'shadcn' | 'hot-toast'
}

export default function SuccessToast({ message, className = '', variant = 'shadcn' }: SuccessToastProps) {
  const { toast } = useToast()
  const [isClient, setIsClient] = useState(false)

  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    if (isClient && message) {
      if (variant === 'shadcn') {
        toast({
          description: (
            <div className="flex items-center">
              <CheckCircle className="mr-2 h-4 w-4 text-green-500" />
              <span>{message}</span>
            </div>
          ),
          className: `bg-white text-green-800 border-green-500 ${className}`,
        })
      } else if (variant === 'hot-toast') {
        hotToast.success(message, {
          style: {
            background: '#10B981',
            color: '#FFFFFF',
          },
          icon: '✅',
        })
      }
    }
  }, [message, variant, className, toast, isClient])

  if (variant === 'shadcn') {
    return (
      <ToastProvider>
        <ToastViewport />
      </ToastProvider>
    )
  }

  return null
}