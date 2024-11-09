import React, { useEffect, useState } from 'react';
import "./ProductPage.css";

import { useParams } from 'react-router-dom';
import { fetchdata } from "../../services/fetchdata.js";
import ProductSlider from "../../components/Product/ProductSlider.jsx";
import ProductContent from "../../components/Product/ProductContent.jsx";
import Characteristics from "../../components/Product/Characteristics.jsx";
import PopularProducts from "../../components/Home/PopularProducts/PopularProducts.jsx";

export default function ProductPage() {
    const { id } = useParams();
    const [loading, setLoading] = useState(true);
    const [product, setProduct] = useState(null);

    const url = new URL(window.location);
    const size = url.searchParams.get('size');
    const color = url.searchParams.get('color');
    const encodedColor = encodeURIComponent(color);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetchdata(`/api/get-product/${id}?size=${size}&color=${encodedColor}`);
                if (response.status === 200) {
                    setProduct(response.data);
                } else {
                    console.warn(`Failed to fetch product: Status ${response.status}`);
                }
            } catch (error) {
                console.error("Error fetching product:", error.message);
            } finally {
                setLoading(false);
            }
        };
        fetchProduct();
    }, [id]);

    if (loading) {
        return <div className="loading">Loading...</div>;
    }

    if (!product) {
        return <div>No product found.</div>;
    }

    return (
        <>
            <section className="product-block" key={product.id}>
                <ProductSlider images={product.image_urls} />
                <ProductContent
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    articul={product.articul}
                    code={product.code}
                    sizes_info={product.sizes}
                    color_info={product.colors}
                    discount={product.discount}
                    price={product.price}
                    is_favourite={product.is_favourite}
                    in_cart={product.in_cart}
                />
            </section>
            {product.characteristics && product.characteristics.length > 0 && (
                <section className="characteristics-section">
                    <h1 className="characteristics-h1">Характеристики</h1>
                    <Characteristics characteristics={product.characteristics} />
                </section>
            )}
            <PopularProducts />
        </>
    );
}
