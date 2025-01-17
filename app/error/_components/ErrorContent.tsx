'use client'

import { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import { toast, Toaster } from 'react-hot-toast'

type ValidError = {
  type: string
  icon: React.ComponentType<{ className?: string }>
  description: string
}

export default function ErrorContent({ validErrors }: { validErrors: ValidError[] }) {
  const searchParams = useSearchParams()
  const [errorType, setErrorType] = useState<string | null>(null)

  useEffect(() => {
    const error = searchParams.get('error')
    setErrorType(error)
    if (error) {
      toast.error(`Error: ${error}`, {
        duration: 5000,
        position: 'top-right',
      })
    }
  }, [searchParams])

  const errorInfo = validErrors.find(e => e.type === errorType) || validErrors[0]

  return (
    <>
      <Toaster />
      <div className="p-6">
        <div className="flex items-center space-x-4 mb-6">
          <errorInfo.icon className="w-10 h-10 text-red-500" />
          <h2 className="text-2xl font-semibold text-gray-900">
            {errorType || 'Unknown'} Error
          </h2>
        </div>
        <p className="text-gray-600 mb-6">{errorInfo.description}</p>
        <h3 className="text-lg font-semibold text-gray-900 mb-4">Valid Error Types:</h3>
        <ul className="list-disc pl-5 space-y-2">
          {validErrors.map((error) => (
            <li key={error.type} className="text-gray-600">
              <span className="font-semibold">{error.type}</span>: {error.description}
            </li>
          ))}
        </ul>
      </div>
    </>
  )
}