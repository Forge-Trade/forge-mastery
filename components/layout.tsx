import Footer from './Footer'
import Nav from './Nav'

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Nav />
      <main className='mx-auto min-h-screen pt-6 max-w-screen xl:mx-auto bg-[#1c1c1b]'>
        {children}
      </main>
      <Footer />
    </>
  )
}
