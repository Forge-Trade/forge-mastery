import Footer from './Footer'
import Nav from './Nav'

export default function Layout({ children }: { children: React.ReactNode }) {
  
  return (
    <>
      <Nav />
      <main className='mx-auto  pt-6 px-10 max-w-screen lg:min-h-screen xl:mx-auto bg-[#1c1c1b]'>
        {children}
      </main>
      <Footer />
    </>
  )
}
