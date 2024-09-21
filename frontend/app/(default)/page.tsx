import Hero from '@/components/hero';
import Features from '@/components/features';
import Testimonials from '@/components/testimonials';
import Statistics from '@/components/statustics';
import Header from '@/components/ui/header';
export const metadata = {
  title: 'Home - Open PRO',
  description: 'Page description',
}


export default function Home() {
  return (
    <>
      <Header />
      <Hero />
      <Features />
      <Statistics />
      <Testimonials />
    </>
  )
}
