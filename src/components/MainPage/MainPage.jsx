import MainSlider from "./MainPageElements/MainSlider/MainSlider.jsx";
import PopularProducts from "./MainPageElements/PopularProducts/PopularProducts.jsx";
import DiscountProducts from "./MainPageElements/DiscountProducts/DiscountProducts.jsx";
import WhoAreWe from "./MainPageElements/WhoAreWe/WhoAreWe.jsx";
import WhereAreWe from "./MainPageElements/WhereAreWe/WhereAreWe.jsx";

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