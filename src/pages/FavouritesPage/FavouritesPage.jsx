import { useEffect, useState } from "react";
import { fetchdata } from "../../services/fetchdata.js";
import FilledFavourites from "../../components/Favourites/FilledFavourites.jsx";
import EmptyFavourites from "../../components/Favourites/EmptyFavourites.jsx";
import UseBreadcrumbs from "../../components/shared/Breadcrumbs/Breadcrumbs.jsx";

import "./FavouritesPage.css";

export default function FavouritesPage() {
    const [isEmpty, setIsEmpty] = useState(null);
    const [products, setProducts] = useState([]);

    const fetchProducts = async () => {
        try {
            const { data, status } = await fetchdata("/api/get-favoutires-products");
            if (status === 204) {
                setIsEmpty(true);
            } else if (status === 200 && data.length > 0) {
                setProducts(data);
                setIsEmpty(false);
            } else {
                console.warn(`Failed to fetch products: Status ${status}`);
            }
        } catch (error) {
            console.error("Error:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <UseBreadcrumbs />
            {isEmpty === null ? (
                <EmptyFavourites />
            ) : isEmpty ? (
                <EmptyFavourites />
            ) : (
                <FilledFavourites products={products} />
            )}
        </>
    );
}
