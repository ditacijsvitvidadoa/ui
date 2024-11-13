import React, { useState, useEffect } from 'react';
import Arrow from "../../assets/images/Arrows/default-arrow.svg";
import GetPostal from "../shared/GetPostal/GetPostal.jsx";
import GetStatus from "../shared/GetStatus/GetStatus.jsx";
import UpdateStatus from "../../services/OrderFetch/UpdateStatus.jsx";

export default function Orders({ orders }) {
    const [clickedOrders, setClickedOrders] = useState(new Set());
    const [expandedOrders, setExpandedOrders] = useState(new Set());
    const [orderStatuses, setOrderStatuses] = useState({});

    const updateLocalStorage = (clickedOrders) => {
        localStorage.setItem('clickedOrders', JSON.stringify(Array.from(clickedOrders)));
    };

    useEffect(() => {
        const storedClickedOrders = localStorage.getItem('clickedOrders');
        if (storedClickedOrders) {
            const parsedOrders = JSON.parse(storedClickedOrders);
            setClickedOrders(new Set(parsedOrders));
        }
    }, []);

    const handleOrderClick = (orderId) => {
        setClickedOrders((prevClickedOrders) => {
            const newClickedOrders = new Set(prevClickedOrders);
            newClickedOrders.add(orderId);
            updateLocalStorage(newClickedOrders);
            return newClickedOrders;
        });

        setExpandedOrders((prevExpandedOrders) => {
            const newExpandedOrders = new Set(prevExpandedOrders);
            if (newExpandedOrders.has(orderId)) {
                newExpandedOrders.delete(orderId);
            } else {
                newExpandedOrders.add(orderId);
            }
            return newExpandedOrders;
        });
    };

    const handleOrderButton = (orderId, status) => {
        UpdateStatus(orderId, status);
        setOrderStatuses((prevStatuses) => ({
            ...prevStatuses,
            [orderId]: status,
        }));
    };

    const getButtonsForStatus = (status, orderId) => {
        console.log(status)
        switch (status) {
            case 1:
                return (
                    <div className="order-block__btns">
                        <p className="order-block__btn order-block__accept"
                           onClick={() => handleOrderButton(orderId, 2)}>Прийняти</p>
                        <p className="order-block__btn order-block__cansel"
                           onClick={() => handleOrderButton(orderId, -1)}>Відклонити</p>
                    </div>
                );
            case 2:
                return (
                    <div className="order-block__btns order-block__section">
                        <p className="order-block__btn order-block__accept"
                           onClick={() => handleOrderButton(orderId, 5)}>Отримано</p>
                        <p className="order-block__btn order-block__return"
                           onClick={() => handleOrderButton(orderId, 6)}>Повернення</p>
                        <p className="order-block__btn order-block__cansel"
                           onClick={() => handleOrderButton(orderId, -1)}>Відклонити</p>
                    </div>
                );
            case -1:
                return (
                    <div className="order-block__btns">
                        <p className="order-block__btn">Відклонено</p>
                    </div>
                );
            default:
                return null;
        }
    };

    return (
        <div className="orders-block">
            {orders.map(order => (
                <article
                    key={order._id}
                    className="order-block"
                    style={{cursor: 'pointer'}}
                >
                    {!clickedOrders.has(order._id) && <div className="new-order">!</div>}
                    <div
                        className="order-block__main"
                        onClick={() => handleOrderClick(order._id)}
                    >
                        <p className="order-block_order-id"></p>
                        <article className="order-block_detail">
                            номер заказу: <span>{order.OrderId}</span>
                        </article>
                        <article className="order-block_detail order-block_status">
                            статус: <span>{GetStatus(order.Status)}</span>
                        </article>
                        <img
                            src={Arrow}
                            alt="arrow"
                            className={`order-block-arrow ${expandedOrders.has(order._id) ? 'open' : ''}`}
                        />
                    </div>
                    {expandedOrders.has(order._id) && (
                        <div className="order-block__content">
                            <div className="order-block__stick"></div>
                            <article className="order-block_content-detail">
                                Номер телефону: <span>{order.Phone}</span>
                            </article>
                            <article className="order-block_content-detail">
                                ПІБ: <span>{order.FirstName} {order.LastName} {order.Patronymic}</span>
                            </article>
                            <article className="order-block_content-detail">
                                Пошта: <span>{order.Email}</span>
                            </article>

                            <div className="order-block__stick"></div>

                            <div className="for-dispatch-block">
                                <h1 className="for-dispatch-h1">Дані на відправку</h1>

                                <article className="order-block_content-detail">
                                    Тип: {order.ReceivingType === "Branches" ? <span>На відділення</span> :
                                    <span>За адресою</span>}
                                </article>

                                <article className="for-dispatch-info">
                                    <img src={GetPostal(order.PostalType)} alt="postal"/>
                                    <p className="for-dispatch-info-p">{order.City}</p>,
                                    {order.ReceivingType === "Branches" ?
                                        <p className="for-dispatch-info-p">{order.PostalInfo}</p>
                                        :
                                        <p className="for-dispatch-info-p">
                                            {order.PostalInfo.Street ? <>вул. {order.PostalInfo.Street}</> : ""}
                                            {order.PostalInfo.House ? <>, буд. {order.PostalInfo.House}</> : ""}
                                            {order.PostalInfo.Floor ? <>, квартира {order.PostalInfo.Floor}</> : ""}
                                            {order.PostalInfo.Apartment ? <>, поверх {order.PostalInfo.Apartment}</> : ""}
                                        </p>
                                    }
                                </article>
                            </div>

                            <div className="order-block__stick"></div>

                            {order.Products && order.Products.map((product, index) => (
                                <React.Fragment key={product.Id}>
                                    <article className="order-block_content-block">
                                        <img src={product.Image_urls[0]} alt="image"
                                             className="order-block_content-block_img"/>
                                        <div>
                                            <h1 className="order-block_content-block_title">{product.Title}</h1>
                                            {product.Discount ? (
                                                <article
                                                    className="product-content__price-component product-content__price-component--with-discount">
                                                    <p className="product-content__price-component__original-price">{product.Price} ₴</p>
                                                    <p className="product-content__price-component__discount">{product.Discount} ₴</p>
                                                </article>
                                            ) : (
                                                <article
                                                    className="product-content__price-component product-content__price-component--no-discount">
                                                    <p className="product-content__price-component__price">{product.Price} ₴</p>
                                                </article>
                                            )}
                                        </div>
                                    </article>
                                    {index < order.Products.length - 1 && <div className="separator-block"></div>}
                                </React.Fragment>
                            ))}

                            {getButtonsForStatus(orderStatuses[order._id] || order.Status, order._id)}
                        </div>
                    )}
                </article>
            ))}
        </div>
    );
}
