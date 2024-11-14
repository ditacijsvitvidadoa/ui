import MainSlider from "../../components/Home/MainSlider/MainSlider.jsx";
import PopularProducts from "../../components/Home/PopularProducts/PopularProducts.jsx";
import DiscountProducts from "../../components/Home/DiscountProducts/DiscountProducts.jsx";
import WhoAreWe from "../../components/Home/WhoAreWe/WhoAreWe.jsx";
import WhereAreWe from "../../components/Home/WhereAreWe/WhereAreWe.jsx";
import AuthToAccountBlock from "../../components/AuthToAccountBlock/AuthToAccountBlock.jsx";

function MainPage() {
    return (
        <>
            <MainSlider />
            <PopularProducts />
            <DiscountProducts />
            <WhoAreWe />
            <WhereAreWe />
        </>
    )
}

export default MainPage;