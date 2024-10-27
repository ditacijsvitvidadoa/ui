function PriceComponent({ price, discount }) {
    return (
        <>
            {discount ? (
                <div className="price-component price-component--with-discount">
                    <p className="price-component__original-price">{price} ₴</p>
                    <p className="price-component__discount">{discount} ₴</p>
                </div>
            ) : (
                <div className="price-component price-component--no-discount">
                    <p className="price-component__price">{price} ₴</p>
                </div>
            )}
        </>
    );
}

export default PriceComponent;