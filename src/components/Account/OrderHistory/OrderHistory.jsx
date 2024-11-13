import "./OrderHistory.css";
import { useEffect, useState } from "react";
import { fetchdata } from "../../../services/fetchdata.js";

function OrderHistory() {
    const [orders, setOrders] = useState([])

    const fetchProducts = async () => {
        try {
            const { data, status } = await fetchdata("/api/get-purchases-history", {
                method: 'GET',
            });
            if (status !== 200) {
                throw new Error("Ошибка при получении товаров: " + status);
            }

            setOrders(data);
        } catch (error) {
            console.error("Ошибка:", error);
        }
    };

    useEffect(() => {
        fetchProducts();
    }, []);

    return (
        <>
            <h1 className="account-content__h1">Історія замовлень</h1>
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
            </div>
        </>
    );
}

const getStatusText = (status) => {
    switch (status) {
        case 0: return "Не обработано";
        case 1: return "В процессе";
        case 2: return "Завершено";
        default: return "Неизвестно";
    }
}

export default OrderHistory;
