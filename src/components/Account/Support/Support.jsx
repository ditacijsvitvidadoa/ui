import React, { useState } from 'react';
import "./Support.css";

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

        const phonePattern = /^\+\d{10,}$/;
        if (!phonePattern.test(formData.phone)) {
            newErrors.phone = 'Телефон повинен починатися з + і містити не менше 10 цифр';
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

        const urlEncodedData = new URLSearchParams(formData).toString();

        try {
            await fetch('http://localhost:5173/api/support', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'
                },
                body: urlEncodedData
            });

            setFormData({
                firstName: '',
                email: '',
                phone: '',
                title: '',
                description: ''
            });
        } catch (error) {
            console.error('Помилка:', error);
        }
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
                    <input
                        className="support-form-input support-form-input-phone"
                        type="tel"
                        name="phone"
                        placeholder="Номер телефону*"
                        value={formData.phone}
                        onChange={handleChange}
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
