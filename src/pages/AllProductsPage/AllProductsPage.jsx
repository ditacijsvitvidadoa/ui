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
                console.log("Fetching products...");
                const response = await fetchdata(`/api/get-products${location.search}`);
                console.log("API response:", response);  // Логируем весь ответ

                if (response.status === 200) {
                    const { products, details } = response.data;

                    // Проверка на структуру данных
                    console.log("Products:", products);  // Логируем только товары
                    console.log("Details:", details);  // Логируем детали

                    if (!products || products.length === 0) {
                        console.log("No products found");
                        setProducts([]);
                    } else {
                        setProducts(products);
                    }

                    setDetails(details);

                    if (details) {
                        setValue([details.min_price_product.price, details.max_price_product.price]);

                        const params = new URLSearchParams(location.search);
                        const pageSize = params.get('pageSize') ? parseInt(params.get('pageSize'), 10) : defaultPageSize;

                        const pageCount = Math.ceil(details.total_count / pageSize);
                        setPageCount(pageCount);
                    }
                } else {
                    console.warn(`Failed to fetch products: Status ${response.status}`);
                    setProducts([]); // Поставим пустой массив на случай ошибки
                }
            } catch (error) {
                console.error("Error fetching products:", error.message);
                setProducts([]); // Поставим пустой массив в случае ошибки запроса
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [location.search]);

    if (loading) {
        return <div className="loading">Загрузка...</div>;
    }

    if (products.length === 0) {
        return (
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
                    <div className="no-products-message">
                        <p>К сожалению, мы не нашли ни одного товара по вашему запросу. Попробуйте изменить фильтры или вернуться позже.</p>
                    </div>
                </div>
            </section>
        );
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
                    <ProductsList products={products} pageCount={pageCount}/>
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
                    <ProductsList products={products} pageCount={pageCount}/>
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
