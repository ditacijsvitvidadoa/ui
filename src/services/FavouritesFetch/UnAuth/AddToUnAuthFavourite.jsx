export default async function AddToUnAuthFavourite(productId) {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    if (!favourites.includes(productId)) {
        favourites.push(productId);
    }

    localStorage.setItem('favourites', JSON.stringify(favourites));
}