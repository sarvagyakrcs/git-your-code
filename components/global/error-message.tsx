import { ExclamationTriangleIcon } from '@radix-ui/react-icons'
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert"
import { cn } from "@/lib/utils"

type ErrorMessageProps = {
  message: string | undefined
  className?: string
}

export function ErrorMessage({ message, className }: ErrorMessageProps) {
  if (!message) {
    return null
  }

  return (
    <Alert variant="destructive" className={cn("mt-4", className)}>
      <ExclamationTriangleIcon className="h-4 w-4" />
      <AlertTitle className="sr-only">Error</AlertTitle>
      <AlertDescription>{message}</AlertDescription>
    </Alert>
  )
}