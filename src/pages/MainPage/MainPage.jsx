import MainSlider from "../../components/Home/MainSlider/MainSlider.jsx";
import PopularProducts from "../../components/Home/PopularProducts/PopularProducts.jsx";
import WhoAreWe from "../../components/Home/WhoAreWe/WhoAreWe.jsx";
import WhereAreWe from "../../components/Home/WhereAreWe/WhereAreWe.jsx";
import NewProducts from "../../components/Home/NewProducts/NewProducts.jsx";

function MainPage() {
    return (
        <>
            <MainSlider />
            <PopularProducts />
            {/*<DiscountProducts />*/}
            <NewProducts />
            <WhoAreWe />
            <WhereAreWe />
        </>
    )
}

export default MainPage;