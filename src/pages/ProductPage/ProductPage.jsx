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

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const response = await fetchdata(`/api/get-product/${id}`);
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
            <section className="product-block">
                <ProductSlider images={product.image_urls}/>
                <ProductContent
                    id={product.id}
                    title={product.title}
                    description={product.description}
                    articul={product.articul}
                    code={product.code}
                    size_info={product.size_info}
                    discount={product.discount}
                    price={product.price}
                    is_favourite={product.is_favourite}
                    in_cart={product.in_cart}
                />
            </section>
            {product.characteristic ? (
                <section className="characteristics-section">
                    <h1 className="characteristics-h1">Характеристики</h1>
                    <Characteristics characteristic={product.characteristic}/>
                </section>
            ) : (<></>)}
            <PopularProducts />
        </>

    )
        ;
}
