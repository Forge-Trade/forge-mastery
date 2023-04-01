import Head from 'next/head'
import Link from 'next/link'
import Image from "next/image"
import { useSession, signIn, signOut } from "next-auth/react"

const Nav = () => {
const { data: session } = useSession()

return (
<>

  <Head>
    <title>Forge | Getting Started</title>
    <meta name="description" content="Getting started with Forge, IBCs first UniV3 DEX." />
    <link rel="icon" href="/images/favicon.png" />
  </Head>

  <div className="navbar bg-[#0d0e0e] md:px-10">
    <div className="navbar-start w-3/4">
      <div className="dropdown">
        <label tabIndex={0} className="btn btn-ghost lg:hidden">
          <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24"
            stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h8m-8 6h16" /></svg>
        </label>
        <ul tabIndex={0} className="menu menu-compact dropdown-content mt-3 p-2 shadow bg-base-100 rounded-box w-52">
        <li><a>Docs</a></li>
        <li><a>Tools & Resources</a></li>
        <li><a>Partnerships & Grants</a></li>
        <li><a>Project Listing</a></li>
        </ul>
      </div>
      <Link href="/" passHref>
      <a className="flex justify-center items-center">
        <Image alt="ForgeDEX" height={40} src="https://testnet.forge.trade/images/ForgeIcon.png" width={40} />
      </a>
      </Link>
      <a className="hidden md:flex ml-3 normal-case text-2xl font-bold mr-1">IRON<span className="font-medium">WORKS</span></a>
      <div className="hidden lg:flex divider divider-horizontal"></div>
      <ul className="hidden lg:flex menu menu-horizontal rounded-md">
        <li><a>Docs</a></li>
        <li><a>Tools & Resources</a></li>
        <li><a>Partnerships & Grants</a></li>
        <li><a>Project Listing</a></li>
      </ul>
    </div>

    <div className="navbar-end">
      <a className="btn btn-sm btn-header bg-[#e04a32] hover:bg-[#b33825] px-3 text-base rounded-md font-medium">ENTER THE FORGE →</a>
    </div>
  </div>

</>
)
}

export default Nav;