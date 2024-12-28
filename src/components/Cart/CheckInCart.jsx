import {useAuth} from "../shared/context/AuthContext.jsx";


export default function CheckInCart(product, isAuthenticated) {

    if (!isAuthenticated) {
        const cart = JSON.parse(localStorage.getItem("cart")) || [];
        const foundProduct = cart.find(item => item.id === product.id);

        return !!foundProduct;
    }

    return product.in_cart;
}