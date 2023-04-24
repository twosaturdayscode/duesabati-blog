export function Footer() {
  return (
    <footer className="footer-component flex h-[5.25rem] w-full max-w-screen-xl shrink-0 items-center justify-between border-t-2 border-stone-400 border-opacity-20 bg-orange-50 px-4 md:h-[6.25rem]">
      <div className="flex items-center text-stone-400">
        <div className="text-xs">
          <span>Powered by chocolate 🍫 and coffee ☕</span>

          <span> - ©️ {new Date().getFullYear()} Duesabati </span>
        </div>
      </div>
      <div className="flex items-center space-x-7"></div>
    </footer>
  )
}
