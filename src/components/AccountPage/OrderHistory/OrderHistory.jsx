import "./css/OrderHistory.css";
import order_products from "./dummy_data.json";

function OrderHistory() {
    return (
        <>
            <h1 className="account-content__h1"> Історія заказів </h1>
            <div className="table-container">
                <table className="order-history-table">
                    <thead>
                    <tr>
                        <th>№ замовлення</th>
                        <th>Фото</th>
                        <th>Товар</th>
                        <th>Статус</th>
                        <th>Дата</th>
                    </tr>
                    </thead>
                    <tbody>
                    {order_products.map((product) => (
                        <tr key={product.orderId}>
                            <td>{product.orderId}</td>
                            <td><img src={product.imageUrl} alt={product.title} className="product-image" /></td>
                            <td className="product-title">{product.title}</td>
                            <td>{product.statusText}</td>
                            <td>{product.date}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </>
    );
}

export default OrderHistory;
