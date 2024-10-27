import React, { useEffect, useState } from "react";
import FilterBlock from "./FilterBlock.jsx";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchdata } from "../shared/fetchData/fetchdata.js";
import filters from './dummy_data.json';
import "./css/ProductsPage.css";
import Favourite from "../../assets/images/Product/Favourite.svg";
import Cart from "../../assets/images/Product/Cart.svg";
import { addToCart } from "../shared/managementCart/addToCart.jsx";
import ItemsPerPage from "./ProductsPageElements/itemsPerPage.jsx";
import RangeSlider from "./ProductsPageElements/RangeInput.jsx";
import SortProducts from "./ProductsPageElements/sortProducts.jsx";


function ProductsPage() {
    const [products, setProducts] = useState([]);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = useState([0, 0]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true); // Початок завантаження
            try {
                const response = await fetchdata(`/api/get-products${location.search}`);
                if (response.status === 200) {
                    const { products, details } = response.data;
                    setProducts(products);
                    setDetails(details);
                    setValue([details.min_price_product.price, details.max_price_product.price]);
                } else {
                    console.warn(`Failed to fetch products: Status ${response.status}`);
                }
            } catch (error) {
                console.error("Error fetching products:", error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProducts();
    }, [location.search]);


    if (loading) {
        return <div className="loading"></div>;
    }

    const handleApplyClick = () => {
        const params = new URLSearchParams(location.search);
        params.set('minPrice', value[0]);
        params.set('maxPrice', value[1]);
        navigate(`${location.pathname}?${params.toString()}`);
    };

    const handleResetClick = () => {
        const url = new URL(window.location.href);
        const params = new URLSearchParams(url.search);

        params.delete('minPrice');
        params.delete('maxPrice');

        window.history.replaceState({}, '', `${url.pathname}?${params.toString()}`);

        setValue([details.min_price_product.price, details.max_price_product.price]);

        window.location.reload();
    };

    return (
        <>
            <div className="products-options">
                <ItemsPerPage values={filters.itemsPerPage.values} defaultValue={filters.itemsPerPage.default} />
                <SortProducts values={filters.sortOrder.values} defaultValue="popular" />
            </div>
        </>
    );
}

export default ProductsPage;
