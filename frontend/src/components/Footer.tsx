import { Link } from "react-router-dom"
import kickova from "../assets/kickova_logo.svg"

const Footer = () => {
  return (
    <footer className="w-full bg-[#111] text-white relative bottom-0 px-6 pt-12 pb-7 md:px-16">

      <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-10 pb-10 border-b border-white/10">

        <div className="flex flex-col gap-3">
          <img src={kickova} alt="Kickova logo" className="w-[60%] h-15 md:w-full md:h-20  object-fit-contain" />
          <p className="text-sm text-white/40 leading-relaxed max-w-[200px]">
            Your home for authentic sneakers. Every drop, every style.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          <p className="text-[11px] font-medium tracking-[0.2em] uppercase text-white/35 mb-2">
            Navigate
          </p>
          {[
            { to: "/",label: "Home"},
            { to: "/products/?page=1&skip=0", label:"Products"},
            { to: "/cart",label: "Cart"},
          ].map(({ to, label }) => (
            <Link
              key={label}
              to={to}
              className="text-sm text-white/60 hover:text-white transition-colors duration-150"
            >
              {label}
            </Link>
          ))}
        </div>

      </div>

      <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 pt-6">
        <p className="text-xs text-white/30">
          &copy; 2026 Kickova. All rights reserved.
        </p>
        <p className="flex items-center gap-2 text-xs text-white/25">
          <span className="w-1.5 h-1.5 rounded-full bg-red-600 inline-block" />
          Authentic kicks only
        </p>
      </div>

    </footer>
  )
}

export default Footer