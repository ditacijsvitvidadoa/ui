import {useAuth} from "../shared/context/AuthContext.jsx";

export default function CheckInFavourites(product, isAuthenticated) {

    if (!isAuthenticated) {
        const favourites = JSON.parse(localStorage.getItem("favourites")) || [];
        const foundProduct = favourites.find(item => item === product.id);

        return !!foundProduct;
    }

    return product.is_favourite;
}