import { auth } from '@/auth'
import Header from '@/components/landing-page/header'
import LandingPageHero from '@/components/landing-page/hero'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default async function LandingPage() {
  const session = await auth();
  return (
    <div className="bg-white pb-10">
      <Header session={session} />
      <LandingPageHero />
    </div>
  )
}
