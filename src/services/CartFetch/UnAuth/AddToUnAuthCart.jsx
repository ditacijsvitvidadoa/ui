

export default async function AddToUnAuthCart(productId) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        existingProduct.count += 1;
    } else {
        cart.push({
            id: productId,
            count: 1,
        });
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}