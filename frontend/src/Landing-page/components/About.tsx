import { useNavigate } from "react-router-dom"

const About = () => {

  const navigate= useNavigate()
  
  return (
    <section className="w-full bg-red-600 text-white px-6 py-20 md:px-16 md:py-24">

      <p className="text-xs font-medium tracking-[0.2em] uppercase text-white/60 mb-4">
        Our story
      </p>

      <h2 className="text-4xl md:text-6xl font-extrabold leading-tight mb-12">
        Built for sneaker <br />
        <span className="text-white/30">culture.</span>
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">

        <div>
          <p className="text-base md:text-lg leading-relaxed text-white/85">
            Kickova was born from a simple obsession — the perfect pair of sneakers.
            We curate the best drops from iconic brands and emerging names, making it
            easy to find exactly what your collection is missing.
          </p>

          <div className="w-12 h-[3px] bg-white/40 rounded-full my-7" />

          <p className="text-base md:text-lg leading-relaxed text-white/85">
            Whether you're chasing grails or building your everyday rotation, Kickova
            delivers authentic kicks with a seamless shopping experience — from first
            click to doorstep.
          </p>

          <button
            className="mt-8 inline-flex items-center gap-2 bg-white text-red-600
              font-semibold text-sm px-6 py-3 rounded-lg hover:bg-white/90
              transition-colors duration-200 cursor-pointer"
              onClick={()=>navigate("/products?page=1&skip=0")}
          >
            Shop collection
            <svg xmlns="http://www.w3.org/2000/svg" className="w-4 h-4" viewBox="0 0 24 24"
              fill="none" stroke="currentColor" strokeWidth={2} strokeLinecap="round" strokeLinejoin="round">
              <path d="M5 12h14M13 6l6 6-6 6" />
            </svg>
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4">
          {[
            { num: "500+", label: "Sneaker styles" },
            { num: "12k+", label: "Happy customers" },
            { num: "100%", label: "Authentic only" },
            { num: "48h",  label: "Fast delivery" },
          ].map(({ num, label }) => (
            <div
              key={label}
              className="bg-white/10 border border-white/20 rounded-xl p-5"
            >
              <p className="text-3xl font-extrabold text-white">{num}</p>
              <p className="text-sm text-white/60 mt-1">{label}</p>
            </div>
          ))}
        </div>

      </div>
    </section>
  )
}

export default About