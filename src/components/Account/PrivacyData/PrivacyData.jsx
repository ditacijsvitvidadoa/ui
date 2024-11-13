import React, { useState, useEffect } from 'react';
import "./PrivacyData.css";
import { fetchdata } from "../../../services/fetchdata.js";
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

    const handleConsentUpdate = () => {
        const formData = new FormData();
        formData.append("marketing_consent", isChecked ? "yes" : "no");

        fetchdata("/api/user-consent", {
            method: "POST",
            body: formData
        }).catch((error) => console.error("Error updating consent:", error));
    };

    useEffect(() => {
        if (user) {
            handleConsentUpdate();
        }
    }, [isChecked]);

    if (!user) {
        return <div>Loading...</div>;
    }

    return (
        <section className="privacy-data">
            <h1 className="account-content__h1"> Особисті дані </h1>
            <div className="privacy-data__content">
                <BaseElement
                    title="Ім'я"
                    title_content={user?.full_name?.first_name || "Не вказано"}
                    field="firstname"
                    validate={(value) => /^[a-zA-Zа-яА-ЯїЇєЄіІґҐ]+$/.test(value)}
                />
                <BaseElement
                    title="Прізвище"
                    title_content={user?.full_name?.last_name || "Не вказано"}
                    field="lastname"
                    validate={(value) => /^[a-zA-Zа-яА-ЯїЇєЄіІґҐ]+$/.test(value)}
                />
                <BaseElement
                    title="По батькові"
                    title_content={user?.full_name?.patronymic || "Не вказано"}
                    field="patronymic"
                    validate={(value) => /^[a-zA-Zа-яА-ЯїЇєЄіІґҐ]+$/.test(value)}
                />
                <BaseElement title="Номер телефону" title_content={user?.phone || "Не вказано"} field="phone"
                             mask="+38(099)-999-99-99"
                />
                <BaseElement title="Почта" title_content={user?.email || "Не вказано"} field="email"
                             validate={(value) => /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/.test(value)}
                />
                <BaseElement title="Пароль" title_content={"********"} field="password" />

                <EniqueElement title="Адреса доставки" postal_service_info={user.postal_service} />

                <article className="base-element checkbox-block">
                    <section>
                        <p className="base-element__content-title">Згоди:</p>
                        <div className="checkbox-block-content">
                            <button onClick={toggleCheck}
                                    className={`agree-with-notifications ${isChecked ? 'active' : ''}`}>
                                {isChecked ? '✔' : ''}
                            </button>
                            <p className="base-element__content-title-content base-element-content-p">
                                Згода на отримання маркетингових повідомлень через SMS та електронну пошту
                            </p>
                        </div>
                    </section>
                </article>
            </div>
        </section>
    );
}

export default PrivacyData;
