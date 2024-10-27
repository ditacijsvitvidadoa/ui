import MainProductsSlider from "../MainProductsSlider/MainProductsSlider.jsx";
import product from "../MainProductsSlider/dummy_data.json"

function DiscountProducts() {
    return (
        <>
            <MainProductsSlider title="ТОВАРИ ЗІ ЗНИЖКОЮ" products={product} />
        </>
    )
}

export default DiscountProducts;