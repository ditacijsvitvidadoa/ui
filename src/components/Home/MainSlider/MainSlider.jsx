import React from "react";
import Slider from "react-slick";
import "./css/MainSlider.css";

// Slides
import Slide1 from "../../../assets/images/MainSlide/slide1.jpg";
import Slide2 from "../../../assets/images/MainSlide/slide2.jpg";
import Slide3 from "../../../assets/images/MainSlide/slide3.jpg";
import Slide4 from "../../../assets/images/MainSlide/slide4.jpg";
import Slide5 from "../../../assets/images/MainSlide/slide5.jpg";


function MainSlider() {
    const sliderSettings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true
    };

    return (
        <>
            <section className="main-slider">
                <Slider {...sliderSettings}>
                    <div className="main-slide">
                        <img src={Slide1} alt="Slide 1" className="main-slider__img"/>
                    </div>
                    <div className="main-slide">
                        <img src={Slide2} alt="Slide 2" className="main-slider__img"/>
                    </div>
                    <div className="main-slide">
                        <img src={Slide3} alt="Slide 3" className="main-slider__img"/>
                    </div>
                    <div className="main-slide">
                        <img src={Slide4} alt="Slide 3" className="main-slider__img"/>
                    </div>
                    <div className="main-slide">
                        <img src={Slide5} alt="Slide 3" className="main-slider__img"/>
                    </div>
                </Slider>
            </section>
        </>
    )
}

export default MainSlider;