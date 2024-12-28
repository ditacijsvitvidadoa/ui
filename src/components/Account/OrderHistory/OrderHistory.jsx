import "./OrderHistory.css";
import { useEffect, useState } from "react";
import { fetchdata } from "../../../services/fetchdata.js";

function OrderHistory() {
    const [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [errorMessage, setErrorMessage] = useState("");

    const fetchProducts = async () => {
        try {
            setIsLoading(true);
            const { data, status } = await fetchdata("/api/get-purchases-history", {
                method: 'GET',
            });
            if (status !== 200) {
                throw new Error("Помилка при отриманні замовлень: " + status);
            }

            setOrders(data || []);
        } catch (error) {
            setErrorMessage("Не вдалося завантажити історію замовлень. Спробуйте пізніше.");
            console.error("Помилка:", error);
        } finally {
            setIsLoading(false);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    console.log(orders.length)

    return (
        <>
            <h1 className="account-content__h1">Історія замовлень</h1>
            <div className="table-container">
                {isLoading ? (
                    <p>Завантаження...</p>
                ) : errorMessage ? (
                    <p className="error-message">{errorMessage}</p>
                ) : orders.length === 0 ? (
                    <p className="no-orders-message">Немає замовлень</p>
                ) : (
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
                        {orders.map((order) => (
                            order.products.map((product) => (
                                <tr key={product.id}>
                                    <td>{order.order_details.order_id}</td>
                                    <td>
                                        <img
                                            src={product.image_urls[0]}
                                            alt={product.title}
                                            className="product-image"
                                        />
                                    </td>
                                    <td className="product-title">{product.title}</td>
                                    <td>{order.order_details.status}</td>
                                    <td>{order.order_details.date}</td>
                                </tr>
                            ))
                        ))}
                        </tbody>
                    </table>
                )}
            </div>
        </>
    );
}

export default OrderHistory;
