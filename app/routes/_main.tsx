import { useOutlet } from '@remix-run/react'
import { Header } from '~/components/ui'
import { Footer } from '~/components/ui/footer'

export default function MainLayout() {
  const outlet = useOutlet()
  return (
    <>
      <Header />
      {outlet}
      <Footer />
    </>
  )
}
