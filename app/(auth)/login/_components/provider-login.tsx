'use client'

import React, { useState } from 'react'
import { FaGoogle, FaGithub, FaLinkedin } from 'react-icons/fa'
import { Button } from '@/components/ui/button'
import { useToast } from '@/hooks/use-toast'
import { Loader2 } from 'lucide-react'
import { motion } from 'framer-motion'
import { FaXTwitter } from 'react-icons/fa6'
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
  { name: 'google', icon: <FaGoogle size={24} />, color: 'bg-white', hoverColor: 'hover:bg-gray-100', textColor: 'text-gray-700' },
  { name: 'github', icon: <FaGithub size={24} />, color: 'bg-gray-800', hoverColor: 'hover:bg-gray-900', textColor: 'text-white' },
  { name: 'twitter', icon: <FaXTwitter size={24} />, color: 'bg-blue-400', hoverColor: 'hover:bg-blue-500', textColor: 'text-white' },
  { name: 'linkedin', icon: <FaLinkedin size={24} />, color: 'bg-blue-600', hoverColor: 'hover:bg-blue-700', textColor: 'text-white' },
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
    <div className="mt-8 space-y-4">
      <div className="relative">
        <div className="absolute inset-0 flex items-center">
          <div className="w-full border-t border-gray-300"></div>
        </div>
        <div className="relative flex justify-center text-sm">
          <span className="px-2 bg-white text-gray-500">Or continue with</span>
        </div>
      </div>
      <div className="grid grid-cols-2 gap-4">
        {providers.map(({ name, icon, color, hoverColor, textColor }) => (
          <motion.div
            key={name}
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.97 }}
          >
            <Button
              disabled={loadingProvider !== null}
              variant="outline"
              className={`relative h-14 w-full overflow-hidden ${color} ${hoverColor} ${textColor} transition-all duration-300 shadow-md hover:shadow-lg`}
              onClick={() => handleProviderSignIn(name)}
            >
              <div className="absolute inset-0 flex items-center justify-center">
                {loadingProvider === name ? (
                  <Loader2 className="animate-spin h-6 w-6" />
                ) : (
                  <div className="flex items-center justify-center w-full transition-colors duration-300">
                    {icon}
                    <span className="ml-3 font-semibold capitalize text-lg">{name}</span>
                  </div>
                )}
              </div>
            </Button>
          </motion.div>
        ))}
      </div>
    </div>
  )
}

