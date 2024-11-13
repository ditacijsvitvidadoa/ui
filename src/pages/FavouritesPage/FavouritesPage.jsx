import {useEffect, useState} from "react";
import {fetchdata} from "../../services/fetchdata.js";
import FilledFavourites from "../../components/Favourites/FilledFavourites.jsx";

import "./FavouritesPage.css";
import EmptyFavourites from "../../components/Favourites/EmptyFavourites.jsx";
import UseBreadcrumbs from "../../components/shared/Breadcrumbs/Breadcrumbs.jsx";


export default function FavouritesPage() {
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const { data, status } = await fetchdata("/api/get-favoutires-products");
            if (status !== 200) {
                throw new Error("Ошибка при получении товаров: " + status);
            }
            setProducts(data);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);


    return (
        <>
            <UseBreadcrumbs />
            {products ? (
                <FilledFavourites products={products} />
            ) : (<EmptyFavourites />)}
        </>
    )
}