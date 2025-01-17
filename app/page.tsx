import Link from 'next/link'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Shield, Cloud, Upload, Layers, ArrowRight, Book, Github, Rss } from 'lucide-react'

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-950 to-slate-900">
      <div className="absolute inset-0 bg-[url('/stars.svg')] opacity-20" />
      <main className="relative container mx-auto px-4 py-24">
        <div className="max-w-2xl">
          <h1 className="text-5xl font-bold text-white mb-6">
            Next.js Starter:{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400">
              Full Control
            </span>
          </h1>
          <p className="text-xl text-slate-400 mb-12">
            Empower your projects with modern tools and libraries. Fast, beautiful, and completely essential.
          </p>

          <div className="flex gap-4 mb-16">
            <div className="flex-1 max-w-sm">
              <Input
                type="email"
                placeholder="Email address"
                className="h-12 bg-slate-900/50 border-slate-800 text-white placeholder:text-slate-500"
              />
            </div>
            <Button size="lg" className="bg-blue-500 hover:bg-blue-600">
              Get updates <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 mb-16">
            <FeatureCard
              icon={<Layers className="h-6 w-6 text-blue-400" />}
              title="ShadCN UI"
              description="Beautiful, customizable components built with Radix UI and Tailwind CSS"
              link='https://ui.shadcn.com/'
            />
            <FeatureCard
              icon={<Cloud className="h-6 w-6 text-blue-400" />}
              title="R2 Cloudflare CDN"
              description="Lightning-fast content delivery powered by Cloudflare's global network"
              link='https://developers.cloudflare.com/r2/'
            />
            <FeatureCard
              icon={<Shield className="h-6 w-6 text-blue-400" />}
              title="Auth.js"
              description="Secure authentication with support for multiple providers"
              link='https://authjs.dev/'
            />
            <FeatureCard
              icon={<Upload className="h-6 w-6 text-blue-400" />}
              title="File Uploads"
              description="Seamless file management with cloud storage integration"
              link='/files'
            />
            <FeatureCard
              icon={<Upload className="h-6 w-6 text-blue-400" />}
              title="Auth"
              description="Seamless Authentication using multiple providers."
              link='/onboarding'
            />
          </div>

          <div className="flex gap-6 text-slate-400">
            <Link href="/docs" className="flex items-center gap-2 hover:text-white transition-colors">
              <Book className="h-5 w-5" />
              Documentation
            </Link>
            <Link href="https://github.com/sarvagyakrcs/Next.js-Starter-Full-Control-with-ShadCN-UI-R2-Cloudflare-CDN-Auth.js-File-Uploads" className="flex items-center gap-2 hover:text-white transition-colors">
              <Github className="h-5 w-5" />
              GitHub
            </Link>
            <Link href="/rss" className="flex items-center gap-2 hover:text-white transition-colors">
              <Rss className="h-5 w-5" />
              RSS
            </Link>
          </div>
        </div>
      </main>
    </div>
  )
}

interface FeatureCardProps {
  icon: React.ReactNode
  title: string
  description: string,
  link?: string
}

function FeatureCard({ icon, title, description, link }: FeatureCardProps) {
  return (
    <Link href={link || "/"}>
      <Card className="p-6 bg-slate-900/50 border-slate-800 hover:bg-slate-900/75 transition-colors">
        <div className="flex items-start gap-4">
          <div className="p-2 bg-slate-900 rounded-lg">
            {icon}
          </div>
          <div>
            <h3 className="font-semibold text-white mb-1">{title}</h3>
            <p className="text-sm text-slate-400">{description}</p>
          </div>
        </div>
      </Card>
    </Link>
  )
}

