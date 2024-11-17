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

import NoProductsSvg from "./images/empty-products-list.svg";

export default function AllProductsPage() {
    const [products, setProducts] = useState([]);
    const [details, setDetails] = useState(null);
    const [loading, setLoading] = useState(true);
    const [filterOpen, setFilterOpen] = useState(false);
    const location = useLocation();
    const navigate = useNavigate();
    const [value, setValue] = useState([0, 0]);
    const defaultPageSize = 24;
    const [pageCount, setPageCount] = useState(0);

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
                    setProducts(products || []);
                    setDetails(details || null);

                    if (details) {
                        setValue([details.min_price_product.price, details.max_price_product.price]);
                        const params = new URLSearchParams(location.search);
                        const pageSize = params.get('pageSize') ? parseInt(params.get('pageSize'), 10) : defaultPageSize;
                        setPageCount(Math.ceil(details.total_count / pageSize));
                    }
                } else {
                    console.warn(`Failed to fetch products: Status ${response.status}`);
                    setProducts([]);
                }
            } catch (error) {
                console.error("Error fetching products:", error.message);
                setProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [location.search]);

    const handleApplyClick = () => {
        const params = new URLSearchParams(location.search);
        params.set('minPrice', value[0]);
        params.set('maxPrice', value[1]);
        navigate(`${location.pathname}?${params.toString()}`);
    };

    const handleResetClick = () => {
        const params = new URLSearchParams(location.search);
        params.delete('minPrice');
        params.delete('maxPrice');
        navigate(`${location.pathname}?${params.toString()}`);
        setValue([details.min_price_product.price, details.max_price_product.price]);
    };

    const toggleFilter = () => {
        setFilterOpen(!filterOpen);
    };

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    return (
        <>
            <section className="all-products-list__desktop-v">
                <div className="products-options">
                    <ItemsPerPage values={filters.itemsPerPage.values} defaultValue={filters.itemsPerPage.default} />
                    <SortProducts values={filters.sortOrder.values} defaultValue="popular" />
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
                    {products.length > 0 ? (
                        <ProductsList products={products} pageCount={pageCount} />
                    ) : (
                        <div className="no-products-message__desktop-v">
                            <img src={NoProductsSvg || ""} alt="no products svg" />
                            <p>На жаль, ми не знайшли жодного товару за вашим запитом. Спробуйте змінити фільтри або поверніться пізніше.</p>
                        </div>
                    )}
                </div>
            </section>

            <section className="all-products-list__mobile-v">
                <div className="products-options">
                    <img src={FilterSvg} alt="Open filter svg" onClick={toggleFilter} className="products-filters__open-burger" />
                    <article className="products-options__filters">
                        <ItemsPerPage values={filters.itemsPerPage.values} defaultValue={filters.itemsPerPage.default} />
                        <SortProducts values={filters.sortOrder.values} defaultValue="popular" />
                    </article>
                </div>
                    {products.length > 0 ? (
                        <div className="products-block">
                            <ProductsList products={products} pageCount={pageCount} />
                        </div>
                    ) : (
                        <div className="no-products-message__mobile-v">
                            <img src={NoProductsSvg || ""} alt="no products svg"/>
                            <p>На жаль, ми не знайшли жодного товару за вашим запитом. Спробуйте змінити фільтри або
                                поверніться пізніше.</p>
                        </div>
                    )}
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
