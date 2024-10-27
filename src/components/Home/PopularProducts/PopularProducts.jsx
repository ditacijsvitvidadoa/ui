import MainProductsSlider from "../MainProductsSlider/MainProductsSlider.jsx";
import product from "../MainProductsSlider/dummy_data.json"

function PopularProducts() {
    return(
        <>
            <div className="popular-products-block">
                <MainProductsSlider title="ПОПУЛЯРНІ ТОВАРИ" products={product} />
            </div>
        </>
    )
}

export default PopularProducts;