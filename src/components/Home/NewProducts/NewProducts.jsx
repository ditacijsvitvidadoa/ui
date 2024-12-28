import { useEffect, useState } from "react";
import { fetchdata } from "../../../services/fetchdata.js";
import { AuthProvider } from "../../shared/context/AuthContext.jsx";
import MainProductsSlider from "../MainProductsSlider/MainProductsSlider.jsx";

export default function NewProducts() {
    const [products, setProducts] = useState([]);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const response = await fetchdata(`/api/get-products?sortOrder=newest`);
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
            }
        };

        fetchProducts();
    }, []);

    return (
        <AuthProvider>
            <div className="popular-products-block">
                {products.length > 0 && <MainProductsSlider title="НОВИНКИ" products={products} />}
            </div>
        </AuthProvider>
    );
}
