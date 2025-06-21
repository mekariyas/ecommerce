import Hero from "../assets/landing/hero.jpg"
import BrandSlider from "./components/BrandSlider.tsx"
import About from "./components/About.tsx"


const Index = () => {
  return (
    <>
    <section className="w-full h-[100vh]">
            <img src={Hero} alt="Hero-image" loading="lazy" className="w-[100%] object-cover h-full"/>
            <section className="w-full h-[100vh]  absolute z-[2] top-0 flex items-center justify-center">
              <h1 className="text-white text-shadow-lg text-shadow-black font-extrabold text-6xl text-center  md:text-8xl text-wrap">Unveil our stylish collections</h1>
            </section>
        </section>
        <About/>
        <BrandSlider/>       
    </>
)}
export default Index