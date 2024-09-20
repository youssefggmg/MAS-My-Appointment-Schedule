import Hero from '@/components/hero';
import Features from '@/components/features';
import Testimonials from '@/components/testimonials';
import Statistics from '@/components/statustics';
export const metadata = {
  title: 'Home - Open PRO',
  description: 'Page description',
}


export default function Home() {
  return (
    <>
      <Hero />
      <Features />
      <Statistics/>
      <Testimonials />
    </>
  )
}
