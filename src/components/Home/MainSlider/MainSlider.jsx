import React from "react";
import Slider from "react-slick";
import "./css/MainSlider.css";

// Slides
import Slide1Desktop from "../../../assets/images/MainSlide/slide1-desktop.jpg";
import Slide1Laptop from "../../../assets/images/MainSlide/slide1-laptop.jpg";
import Slide1Mobile from "../../../assets/images/MainSlide/slide1-mobile.jpg";
import Slide2Desktop from "../../../assets/images/MainSlide/slide2-desktop.jpg";
import Slide2Laptop from "../../../assets/images/MainSlide/slide2-laptop.jpg";
import Slide2Mobile from "../../../assets/images/MainSlide/slide2-mobile.jpg";

import Slide3Desktop from "../../../assets/images/MainSlide/slide3-desktop.jpg";
import Slide4Desktop from "../../../assets/images/MainSlide/slide4-desktop.jpg";
import Slide5Desktop from "../../../assets/images/MainSlide/slide5-desktop.jpg";

function MainSlider() {
    const sliderSettings = {
        arrows: false,
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        autoplay: true,
        autoplaySpeed: 2500
    };

    return (
        <>
            <section className="main-slider">
                <Slider {...sliderSettings}>
                    <div className="main-slide">
                        <img src={Slide1Desktop || ""} alt="Slide 1" className="main-slider__img"/>
                        <img src={Slide1Laptop || ""} alt="Slide 1" className="main-slider__img-laptop"/>
                        <img src={Slide1Mobile || ""} alt="Slide 1" className="main-slider__img-mobile"/>
                    </div>
                    <div className="main-slide">
                        <img src={Slide2Desktop || ""} alt="Slide 2" className="main-slider__img"/>
                        <img src={Slide2Laptop || ""} alt="Slide 2" className="main-slider__img-laptop"/>
                        <img src={Slide2Mobile || ""} alt="Slide 2" className="main-slider__img-mobile"/>
                    </div>
                    {/*<div className="main-slide">*/}
                    {/*    <img src={Slide3Desktop || ""} alt="Slide 2" className="main-slider__img"/>*/}
                    {/*</div>*/}
                    {/*<div className="main-slide">*/}
                    {/*    <img src={Slide4Desktop || ""} alt="Slide 2" className="main-slider__img"/>*/}
                    {/*</div>*/}
                    {/*<div className="main-slide">*/}
                    {/*    <img src={Slide5Desktop || ""} alt="Slide 2" className="main-slider__img"/>*/}
                    {/*</div>*/}
                </Slider>
            </section>
        </>
    )
}

export default MainSlider;