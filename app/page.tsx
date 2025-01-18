import { auth } from '@/auth'
import Footer from '@/components/global/footer';
import Header from '@/components/landing-page/header'
import LandingPageHero from '@/components/landing-page/hero'

function classNames(...classes: string[]) {
  return classes.filter(Boolean).join(' ')
}

export default async function LandingPage() {
  const session = await auth();
  return (
    <div className="bg-white">
      <Header session={session} />
      <LandingPageHero session={session} />
      <Footer />
    </div>
  )
}
