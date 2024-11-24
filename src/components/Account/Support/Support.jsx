import React, { useState } from 'react';
import InputMask from 'react-input-mask';
import "./Support.css";
import SendSupportFetch from "../../../services/AccountFatch/SendSupportFetch.jsx";

function Support() {
    const [formData, setFormData] = useState({
        firstName: '',
        email: '',
        phone: '',
        title: '',
        description: ''
    });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData((prevData) => ({
            ...prevData,
            [name]: value
        }));
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.firstName) {
            newErrors.firstName = 'Ім\'я обов\'язкове';
        }

        const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailPattern.test(formData.email)) {
            newErrors.email = 'Введіть коректну електронну пошту';
        }

        const phonePattern = /^\+38\(0\d{2}\)-\d{3}-\d{2}-\d{2}$/;
        if (!phonePattern.test(formData.phone)) {
            newErrors.phone = 'Телефон має відповідати формату +38(099)-999-99-99';
        }

        if (!formData.title) {
            newErrors.title = 'Тема запиту обов\'язкова';
        }

        if (!formData.description) {
            newErrors.description = 'Опис обов\'язковий';
        }

        return newErrors;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const validationErrors = validateForm();
        if (Object.keys(validationErrors).length > 0) {
            console.error('Помилки валідації:', validationErrors);
            return;
        }

        const formDataToSend = new FormData();
        formDataToSend.append('Name', formData.firstName);
        formDataToSend.append('Email', formData.email);
        formDataToSend.append('Phone', formData.phone);
        formDataToSend.append('Title', formData.title);
        formDataToSend.append('Description', formData.description);

        SendSupportFetch(formDataToSend)
        window.location.reload();
    };

    return (
        <form className="support-form" onSubmit={handleSubmit}>
            <h1 className="account-content__h1">Служба підтримки</h1>
            <article className="support-block">
                <section>
                    <input
                        className="support-form-input support-form-input-firstname"
                        type="text"
                        name="firstName"
                        placeholder="Ім'я*"
                        value={formData.firstName}
                        onChange={handleChange}
                        required
                    />
                    <input
                        className="support-form-input support-form-input-email"
                        type="email"
                        name="email"
                        placeholder="Електронна пошта*"
                        value={formData.email}
                        onChange={handleChange}
                        required
                    />
                    <InputMask
                        mask="+38(099)-999-99-99"
                        value={formData.phone}
                        onChange={handleChange}
                        name="phone"
                        className="support-form-input support-form-input-phone"
                        placeholder="Номер телефону*"
                        required
                    />
                </section>
                <input
                    className="support-form-input support-form-input-title"
                    type="text"
                    name="title"
                    placeholder="Тема запиту*"
                    value={formData.title}
                    onChange={handleChange}
                    required
                />
                <textarea
                    className="support-form-textarea support-form-textarea-description"
                    name="description"
                    placeholder="Деталі запиту*"
                    rows="4"
                    value={formData.description}
                    onChange={handleChange}
                    required
                />
                <button type="submit" className="support-form-btn">
                    Надіслати
                </button>
            </article>
        </form>
    );
}

export default Support;
