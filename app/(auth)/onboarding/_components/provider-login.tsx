'use client'

import React, { useState } from 'react'
import { FaGoogle, FaGithub } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { signInProvider } from '@/actions/auth/login'

type Provider = 'google' | 'github' | 'twitter' | 'linkedin'

type ProviderInfo = {
  name: Provider
  icon: React.ReactNode
  color: string
  hoverColor: string
  textColor: string
}

const providers: ProviderInfo[] = [
  { name: 'google', icon: <FaGoogle className="h-5 w-5" />, color: 'bg-background', hoverColor: 'hover:bg-secondary', textColor: 'text-foreground' },
  { name: 'github', icon: <FaGithub className="h-5 w-5" />, color: 'bg-black', hoverColor: 'hover:bg-gray-800', textColor: 'text-white' },
]

export default function ProviderSignIn() {
  const [loadingProvider, setLoadingProvider] = useState<Provider | null>(null)
  const { toast } = useToast()

  const handleProviderSignIn = async (provider: Provider) => {
    setLoadingProvider(provider)

    try {
      const data = await signInProvider(provider)
      if (data?.error) {
        throw new Error(data.error)
      }
      toast({
        title: 'Success',
        description: `Signed in with ${provider} successfully!`,
        duration: 3000,
      })
    } catch (err) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: err instanceof Error ? err.message : 'An unexpected error occurred',
        duration: 5000,
      })
    } finally {
      setLoadingProvider(null)
    }
  }

  return (
    <div className="space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <span className="w-full border-t border-muted" />
        </div>
        <div className="relative flex justify-center text-xs uppercase">
          <span className="bg-background px-2 text-muted-foreground">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-3">
        {providers.map(({ name, icon, color, hoverColor, textColor }) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <Button
              disabled={loadingProvider !== null}
              variant="outline"
              className={`h-11 w-full ${color} ${hoverColor} ${textColor}`}
              onClick={() => handleProviderSignIn(name)}
            >
              {loadingProvider === name ? (
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              ) : (
                <>
                  {icon}
                  <span className="ml-2 font-semibold capitalize">{name}</span>
                </>
              )}
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

