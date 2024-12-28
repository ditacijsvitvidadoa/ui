import Trash from "../../assets/images/CartImages/trash.svg";
import DeleteFromFavourite from "../../services/FavouritesFetch/Auth/DeleteFromFavourite.jsx";
import AddToCart from "../../services/CartFetch/Auth/AddToCart.jsx";
import {useAuth} from "../shared/context/AuthContext.jsx";
import AddToUnAuthCart from "../../services/CartFetch/UnAuth/AddToUnAuthCart.jsx";
import DeleteFromUnAuthCart from "../../services/CartFetch/UnAuth/DeleteFromUnAuthCart.jsx";
import DeleteFromUnAuthFavourite from "../../services/FavouritesFetch/UnAuth/DeleteFromUnAuthFavourite.jsx";
import AddToUnAuthFavourite from "../../services/FavouritesFetch/UnAuth/AddToUnAuthFavourite.jsx";

export default function FilledFavourites({ products }) {
    const { isAuthenticated } = useAuth();

    const RemoveFromFavourites = (id) => {
        if (!isAuthenticated) {
            DeleteFromUnAuthFavourite(id);
            return window.location.reload();
        }
        DeleteFromFavourite(id)
        window.location.reload()
    }

    const AddToCartHandle = (id) => {
        if (!isAuthenticated) {
            AddToUnAuthFavourite(id);
            DeleteFromUnAuthCart(id);
            return window.location.reload();
        }
        AddToCart(id)
        DeleteFromFavourite(id)
        window.location.reload()
    }

    return (
        <section className="filled-favourites">
            <h1 className="filled-favourites__h1">Улюблені товари</h1>
            <div className="filled-favourites__block">
                {products.map(product => (
                    <article key={product.id} className="filled-favourites__item">
                        <img src={product.image_urls[0] || ""} alt={product.title} className="filled-favourites__item-img"/>
                        <div className="filled-favourites__item-content">
                            <img src={Trash || ""} alt="trash"
                                 className="filled-favourites__item-trash-svg"
                                 onClick={() => RemoveFromFavourites(product.id)} />
                            <h2 className="filled-favourites__item-title">{product.title}</h2>
                            <p className="filled-favourites__item-desc">
                                {product.description.length > 100 ? `${product.description.slice(0, 100)}...` : product.description}
                            </p>
                            <p className="filled-favourites__item-in-cart"
                               onClick={() => AddToCartHandle(product.id)}>В корзину</p>
                        </div>
                    </article>
                ))}
            </div>
        </section>
    )
}