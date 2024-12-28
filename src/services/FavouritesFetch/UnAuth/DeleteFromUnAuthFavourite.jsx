export default async function DeleteFromUnAuthFavourite(productId) {
    let favourites = JSON.parse(localStorage.getItem('favourites')) || [];

    favourites = favourites.filter(id => id !== productId);

    localStorage.setItem('favourites', JSON.stringify(favourites));
}