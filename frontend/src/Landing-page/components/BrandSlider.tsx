import Slider from "react-slick"
import "slick-carousel/slick/slick.css"
import "slick-carousel/slick/slick-theme.css"

import Nike from "../../assets/landing/nike.png"
import Adidas from "../../assets/landing/adidas.png"
import Converse from "../../assets/landing/converse.png"
import Puma from "../../assets/landing/puma.png"
import Jordan from "../../assets/landing/jordan.png"
import Reebok from "../../assets/landing/reebok.png"
import NewBalance from "../../assets/landing/newbalance.png"

const brands = [
  { src: Nike,       alt: "Nike"        },
  { src: Adidas,     alt: "Adidas"      },
  { src: Jordan,     alt: "Jordan"      },
  { src: Puma,       alt: "Puma"        },
  { src: Reebok,     alt: "Reebok"      },
  { src: Converse,   alt: "Converse"    },
  { src: NewBalance, alt: "New Balance" },
]

const settings = {
  dots: false,
  infinite: true,
  slidesToShow: 4,
  slidesToScroll: 1,
  autoplay: true,
  speed: 2000,
  autoplaySpeed: 2000,
  arrows: false,
  cssEase: "linear",
  responsive: [
    {
      breakpoint: 768,
      settings: { slidesToShow: 3 },
    },
    {
      breakpoint: 480,
      settings: { slidesToShow: 2 },
    },
  ],
}

const BrandSlider = () => {
  return (
    <section id="brands" className="bg-red-600 w-full py-10">
      <Slider {...settings}>
        {brands.map(({ src, alt }) => (
          <div key={alt}>
            <div className="flex items-center justify-center px-6 py-4">
              <img
                src={src}
                alt={`${alt} logo`}
                className="h-16 w-auto object-contain opacity-90 hover:opacity-100
                  transition-opacity duration-200 filter brightness-0 invert"
                loading="lazy"
              />
            </div>
          </div>
        ))}
      </Slider>
    </section>
  )
}

export default BrandSlider