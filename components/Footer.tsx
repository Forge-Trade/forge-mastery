const Footer = () => (
  <footer
    className="!hidden lg:h-auto sm:h-40 h-30 max-w-screen-xl xl:mx-auto mx-5 rounded-lg px-5 lg:pt-4 pt-0 pb-3 flex flex-col lg:flex-row space-y-3 lg:space-y-0 justify-between items-center sticky bottom-5 bg-[#313130] border-t-4 border-black drop-shadow-lg transition-all ease-in-out duration-150"
  >
    <div className="text-center lg:text-left">
      <p className="font-cal text-lg sm:text-2xl text-white">
        Keep track of your progress by signing in Metamask.
      </p>
      <p
        className="text-sm text-gray-100 mt-2 lg:mt-0"
      >
        Although we can&apos;t promise rewards, we can promise that you&apos;ll gain our respect and internet brownie points 😎{" "}
      </p>
    </div>
    <div
      className="grid space-y-3 sm:space-y-0 sm:flex-row flex-col lg:w-auto w-full text-center"
    >
      <a
        className="flex-auto font-cal text-lg bg-[#df4a32] text-white border border-[#df4a32] rounded-md py-1 sm:py-3 px-5 hover:text-gray-100 hover:bg-[#a8402d] transition-all ease-in-out duration-150 whitespace-no-wrap"
        href="#"
        rel="noreferrer"
        target="_blank"
      >
        Sign in with Evmos
      </a>
    </div>
    <div
      className="block"
    >
      <button
        className="text-sm py-1 px-1 text-center text-gray-600 hover:text-gray-100 transition-all self-center ease-in-out duration-150 whitespace-no-wrap"
      >
        x
      </button>
    </div>
  </footer>
)

export default Footer;