import Slider from "react-slick";
import Arrow from "../../assets/images/LeftArrow/leftArrow.svg";

const PrevArrow = ({ className, onClick }) => (
    <img
        src={Arrow}
        alt="prev arrow"
        className={`${className} product-slider__arrow`}
        style={{ transform: 'rotate(180deg)', cursor: 'pointer' }}
        onClick={onClick}
    />
);

const NextArrow = ({ className, onClick }) => (
    <img
        src={Arrow}
        alt="next arrow"
        className={`${className} product-slider__arrow`}
        style={{ cursor: 'pointer' }}
        onClick={onClick}
    />
);

export default function ProductSlider({ images }) {
    const sliderSettings = {
        arrows: true,
        dots: false,
        speed: 200,
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        prevArrow: <PrevArrow />,
        nextArrow: <NextArrow />,
    };

    return (
        <div className="slider-container">
            <Slider {...sliderSettings}>
                {images.map((slide, index) => (
                    <img key={index} src={slide} alt={`slide-${index}`} className="image"/>
                ))}
            </Slider>
        </div>
    );
}
