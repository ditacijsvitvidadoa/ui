import { useEffect, useState } from "react";
import UseBreadcrumbs from "../../components/shared/Breadcrumbs/Breadcrumbs.jsx";
import EmptyFavourites from "../../components/Favourites/EmptyFavourites.jsx";
import FilledFavourites from "../../components/Favourites/FilledFavourites.jsx";
import GetFavouritesProducts from "../../services/FavouritesFetch/GetFavouritesProducts.jsx";

import "./FavouritesPage.css";

export default function FavouritesPage() {
    const [products, setProducts] = useState([]);
    const [isEmpty, setIsEmpty] = useState(false);

    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await GetFavouritesProducts();

                if (data && Array.isArray(data)) {
                    setProducts(data);
                    setIsEmpty(data.length === 0);
                } else {
                    setIsEmpty(true);
                }
            } catch (error) {
                console.error("Error fetching products from favourites:", error);
                setIsEmpty(true);
            }
        };
        fetchProducts();
    }, []);

    return (
        <>
            <UseBreadcrumbs />
            {isEmpty ? <EmptyFavourites /> : <FilledFavourites products={products} />}
        </>
    );
}
