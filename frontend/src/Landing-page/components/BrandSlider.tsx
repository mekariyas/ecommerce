import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Nike from "../../assets/landing/nike.png"
import Adidas from "../../assets/landing/adidas.png"
import Converse from "../../assets/landing/converse.png"
import Puma from "../../assets/landing/puma.png"
import Jordan from "../../assets/landing/jordan.png"
import Reebok from "../../assets/landing/reebok.png"
import NewBalance from"../../assets/landing/newbalance.png"

const BrandSlider = ()=>{

    const settings = {
        dots: false,
        infinite: true,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay: true,
        speed: 2000,
        autoplaySpeed: 2000,
        arrows: false,
    }
    return(
        <section id="brands" className="bg-amber-700 w-full h-[60vh] space-x-4">
            <Slider {...settings}>
                <div>
                    <div className="w-[60%] h-[60vh] flex items-center justify-center ml-6">
                        <img src={Nike} alt="Nike_logo" className="w-full [35%] object-contain" loading="lazy"/>
                    </div>
                </div>
                <div>
                    <div className="w-[60%] h-[60vh] flex items-center justify-center ml-6">
                        <img src={Adidas} alt="adidas_logo" className="w-full h-[35%]  object-contain" loading="lazy"/> 
                    </div>
                </div>
                <div>
                    <div className="w-[60%] h-[60vh] flex items-center justify-center ml-6">
                        <img src={Jordan} alt="jordan_logo" className="w-full h-[35%] object-contain" loading="lazy"/>
                    </div>
                </div>
                <div>
                    <div className="w-[60%] h-[60vh] flex items-center justify-center ml-6">
                        <img src={Puma} alt="puma_logo" className="w-full h-[35%] object-contain" loading="lazy"/>
                    </div>
                </div>
                <div>
                    <div className="w-[60%] h-[60vh] flex items-center justify-center ml-6">
                        <img src={Reebok} alt="reebok_logo" className="w-full h-[35%]  object-contain" loading="lazy"/>
                    </div>
                </div>
                <div >
                    <div className="w-[60%] h-[60vh] flex items-center justify-center ml-6">
                        <img src={Converse} alt="converse_logo" className="w-full h-[35%]  object-contain" loading="lazy"/>
                    </div>
                </div>
                <div >
                    <div className="w-[60%] h-[60vh] flex items-center justify-center ml-6">
                        <img src={NewBalance} alt="newBalance_logo" className="w-full h-[35%]  object-contain" loading="lazy"/>
                    </div>
                </div>
            </Slider>
        </section>
    )
}

export default BrandSlider