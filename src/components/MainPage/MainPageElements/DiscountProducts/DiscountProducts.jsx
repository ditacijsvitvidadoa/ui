import MainProductsSlider from "../../../shared/MainProductsSlider/MainProductsSlider.jsx";
import product from "../../../shared/MainProductsSlider/dummy_data.json"

function DiscountProducts() {
    return (
        <>
            <MainProductsSlider title="ТОВАРИ ЗІ ЗНИЖКОЮ" products={product} />
        </>
    )
}

export default DiscountProducts;