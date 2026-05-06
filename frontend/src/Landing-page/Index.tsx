import Hero from "../assets/landing/hero.webp"
import BrandSlider from "./components/BrandSlider.tsx"
import About from "./components/About.tsx"


const Index = () => {
  return (
    <>
      <section className="w-full flex  flex-col flex-wrap md:flex-row md:justify-between overflow-hidden">
            <img src={Hero} alt="Hero-image" loading="lazy" className="w-[100%] md:w-[50%] h-[100vh] object-cover"/>
            <section className="w-[100%] md:w-[50%] h-[100vh] bg-red-600 flex items-center justify-center">
              <h1 className="text-white  font-extrabold text-3xl md:text-6xl text-center  text-wrap">Unveil our stylish collections</h1>
            </section>
      </section>
      <About/>
      <BrandSlider/>       
    </>
)}
export default Index