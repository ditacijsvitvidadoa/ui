import React, { useState, useEffect } from 'react';
import Arrow from "../../assets/images/Arrows/default-arrow.svg";
import GetPostal from "../shared/GetPostal/GetPostal.jsx";
import GetStatus from "../shared/GetStatus/GetStatus.jsx";

export default function Orders({ orders }) {
    const [clickedOrders, setClickedOrders] = useState(new Set());
    const [expandedOrders, setExpandedOrders] = useState(new Set());

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

    return (
        <>
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
                                номер заказу: <span>{order._id}</span>
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
                                                {order.PostalInfo.street ?
                                                    <>вул. {order.PostalInfo.street}</> : <></>}

                                                {order.PostalInfo.street ?
                                                    <>, буд. {order.PostalInfo.house}</> : <></>}

                                                {order.PostalInfo.floor ?
                                                    <>, квартира {order.PostalInfo.floor}</> : <></>}

                                                {order.PostalInfo.apartment ?
                                                    <>, поверх {order.PostalInfo.apartment}</> : <></>}
                                            </p>
                                        }
                                    </article>
                                </div>

                                <div className="order-block__stick"></div>

                                {order.Products && order.Products.map((product, index) => (
                                    <React.Fragment key={product.id}>
                                        <article className="order-block_content-block">
                                            <img src={product.image_urls[0]} alt="image"
                                                 className="order-block_content-block_img"/>
                                            <div>
                                                <h1 className="order-block_content-block_title">{product.title}</h1>
                                                {product.discount ? (
                                                    <article
                                                        className="product-content__price-component product-content__price-component--with-discount">
                                                        <p className="product-content__price-component__original-price">{product.price} ₴</p>
                                                        <p className="product-content__price-component__discount">{product.discount} ₴</p>
                                                    </article>
                                                ) : (
                                                    <article
                                                        className="product-content__price-component product-content__price-component--no-discount">
                                                        <p className="product-content__price-component__price">{product.price} ₴</p>
                                                    </article>
                                                )}
                                            </div>
                                        </article>
                                        {index < order.Products.length - 1 && <div className="separator-block"></div>}
                                    </React.Fragment>
                                ))}

                                <div className="order-block__btns">
                                    <p className="order-block__btn order-block__accept">Прийняти</p>
                                    <p className="order-block__btn order-block__cansel">Відклонити</p>
                                </div>
                            </div>
                        )}
                    </article>
                ))}
            </div>
        </>
    );
}
