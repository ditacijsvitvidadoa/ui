

export default async function DeleteFromUnAuthCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        cart.splice(productIndex, 1);

        localStorage.setItem('cart', JSON.stringify(cart));
    } else {
        console.log('Product not found in cart');
    }
}
