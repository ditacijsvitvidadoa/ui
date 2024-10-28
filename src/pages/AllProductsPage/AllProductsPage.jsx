import React, { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchdata } from "../../services/fetchdata.js";
import "./AllProductsPage.css";

import ItemsPerPage from "../../components/ProductsPage/ProductsPageElements/itemsPerPage.jsx";
import filters from "../../components/ProductsPage/dummy_data.json";
import SortProducts from "../../components/ProductsPage/ProductsPageElements/sortProducts.jsx";
import ProductsList from "../../components/ProductsPage/ProductsList.jsx";
import FiltersBlock from "../../components/ProductsPage/FiltersBlock.jsx";
import FilterSvg from "../../assets/images/ProductFilter/product-filter.svg";

export default function AllProductsPage() {
    const [products, setProducts] = useState([]);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filterOpen, setFilterOpen] = useState(false); // Состояние для открытия фильтров
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = useState([0, 0]);

    useEffect(() => {
        if (filterOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [filterOpen]);

    useEffect(() => {
        const fetchProducts = async () => {
            setLoading(true);
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

    const toggleFilter = () => {
        setFilterOpen(!filterOpen);
    };

    return (
        <>
            <section className="all-products-list__desktop-v">
                <div className="products-options">
                    <ItemsPerPage values={filters.itemsPerPage.values} defaultValue={filters.itemsPerPage.default}/>
                    <SortProducts values={filters.sortOrder.values} defaultValue="popular"/>
                </div>
                <div className="products-block">
                    <FiltersBlock
                        value={value}
                        setValue={setValue}
                        details={details}
                        handleResetClick={handleResetClick}
                        handleApplyClick={handleApplyClick}
                        filterOpen={filterOpen}
                        setFilterOpen={setFilterOpen}
                    />
                    <ProductsList products={products}/>
                </div>
            </section>

            <section className="all-products-list__mobile-v">
                <div className="products-options">
                    <img src={FilterSvg} alt="Open filter svg" onClick={toggleFilter} className="products-filters__open-burger" />
                    <article className="products-options__filters">
                        <ItemsPerPage values={filters.itemsPerPage.values} defaultValue={filters.itemsPerPage.default}/>
                        <SortProducts values={filters.sortOrder.values} defaultValue="popular"/>
                    </article>
                </div>
                <div className="products-block">
                    <ProductsList products={products}/>
                </div>
                <FiltersBlock
                    value={value}
                    setValue={setValue}
                    details={details}
                    handleResetClick={handleResetClick}
                    handleApplyClick={handleApplyClick}
                    filterOpen={filterOpen}
                    setFilterOpen={setFilterOpen}
                />
                {filterOpen && (
                    <div className="mobile-header-menu-overlay" onClick={toggleFilter}></div>
                )}
            </section>
        </>
    );
}
