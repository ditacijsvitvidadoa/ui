import React, { useState, useEffect } from 'react';
import "./PrivacyData.css";
import { fetchdata } from "../../shared/fetchData/fetchdata.js";
import BaseElement from "./Elements/BaseElement.jsx";
import EniqueElement from "./Elements/EniqueElement.jsx";

function PrivacyData() {
    const [user, setUser] = useState(null);
    const [isChecked, setIsChecked] = useState(false);

    useEffect(() => {
        const getUserData = async () => {
            try {
                const { data } = await fetchdata("/api/user-account", { method: "GET" });
                console.log("Fetched user data:", data);
                setUser(data);
                setIsChecked(data.marketing_consent);
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        };
        getUserData();
    }, []);

    const toggleCheck = () => {
        setIsChecked(!isChecked);
    };

    if (!user) {
        return <div>Loading...</div>;
    }

    console.log(user.postal_service)

    return (
        <section className="privacy-data">
            <h1 className="account-content__h1"> Особисті дані </h1>
            <div className="privacy-data__content">
                <BaseElement title="Ім'я" title_content={user?.full_name?.first_name || "Не вказано"} />
                <BaseElement title="Прізвище" title_content={user?.full_name?.last_name || "Не вказано"} />
                <BaseElement title="По батькові" title_content={user?.full_name?.patronymic || "Не вказано"} />
                <BaseElement title="Номер телефону" title_content={user?.phone || "Не вказано"} />
                <BaseElement title="Почта" title_content={user?.email || "Не вказано"} />
                <BaseElement title="Пароль" title_content={"********"} />
                <EniqueElement title="Адреса доставки" postal_service_info={user.postal_service} />
                <article className="base-element checkbox-block">
                    <p className="base-element__content-title">Згоди:</p>
                    <section className="checkbox-block-content">
                        <button onClick={toggleCheck} className={`agree-with-notifications ${isChecked ? 'active' : ''}`}>
                            {isChecked ? '✔' : ''}
                        </button>
                        <p className="base-element__content-title-content base-element-content-p">
                            Згода на отримання маркетингових повідомлень через SMS та електронну пошту
                        </p>
                    </section>
                </article>
            </div>
        </section>
    );
}

export default PrivacyData;
