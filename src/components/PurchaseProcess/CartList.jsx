export default function CartList({ products }) {

    return (
        <div className="purchase-process-block">
            <h2>Замовлення</h2>
            {products.map((product, index) => (
                <div key={product.id}>
                    <article className="purchase-process__product">
                        <img src={product.image_urls[0] || ""} alt={product.title} className="purchase-process__product-img" />
                        <p className="purchase-process__product-title">{product.title} x {product.count}</p>
                        {product.discount ? (
                            <article className="purchase-process__product-price-component purchase-process__product-component--with-discount">
                                <p className="purchase-process__product-component__original-price">{product.price} ₴</p>
                                <p className="purchase-process__product-component__discount">{product.discount} ₴</p>
                            </article>
                        ) : (
                            <article className="purchase-process__product-component purchase-process__product-component--no-discount">
                                <p className="purchase-process__product-component__price">{product.price} ₴</p>
                            </article>
                        )}
                    </article>
                    {index < products.length - 1 && <div className="separator-block"></div>}
                </div>
            ))}
        </div>
    );
}
