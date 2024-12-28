import MainProductsSlider from "../MainProductsSlider/MainProductsSlider.jsx";
import {useEffect, useState} from "react";
import {fetchdata} from "../../../services/fetchdata.js";
import {AuthProvider} from "../../shared/context/AuthContext.jsx";

function PopularProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetchdata(`/api/get-products?pageSize=24`);
                if (response.status === 200) {
                    const { products } = response.data;
                    setProducts(products || []);
                } else {
                    console.warn(`Failed to fetch products: Status ${response.status}`);
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching products:", error.message);
                setProducts([]);
            } finally {
            }
        };

        fetchProducts();
    }, []);

    return(
        <>
            <AuthProvider>
                <div className="popular-products-block">
                    <MainProductsSlider title="ПОПУЛЯРНІ ТОВАРИ" products={products} />
                </div>
            </AuthProvider>
        </>
    )
}

export default PopularProducts;