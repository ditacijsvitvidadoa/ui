

export default async function UpdateUnAuthCount(productId, newCount) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const existingProduct = cart.find(item => item.id === productId);

    if (existingProduct) {
        if (newCount > 0) {
            existingProduct.count = newCount;
        } else {
            cart = cart.filter(item => item.id !== productId);
        }
    } else {
        console.log('Product not found in cart');
    }

    localStorage.setItem('cart', JSON.stringify(cart));
}