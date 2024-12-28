import React, {useEffect, useState} from 'react';
import "./AuthToAccountBlock.css";
import {useNavigate} from "react-router-dom";
import {fetchdata} from "../../services/fetchdata.js";
import Cross from "../../assets/images/Cross/cross.svg";

export default function AuthToAccountBlock({ isOpen, onClose }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await fetchdata("/api/login", {
                method: "POST",
                body: formData,
            });

            console.log(response.status)

            if (response.status === 200) {
                navigate("/account");
            } else {
                setError("Неправильна електронна пошта або пароль")
            }

        } catch (err) {
            setError("Неправильна електронна пошта або пароль");
        }
    };


    useEffect(() => {
        if (isOpen) {
            document.body.classList.add('no-scroll');
        } else {
            document.body.classList.remove('no-scroll');
        }

        return () => {
            document.body.classList.remove('no-scroll');
        };
    }, [isOpen]);

    if (!isOpen) return null;

    return (
        <>
            <div className="auth-account-overlay" onClick={onClose}></div>
            <div className="auth-account-block">
                <img src={Cross} onClick={onClose} alt="cross" className="auth-account-block__cross"/>
                <h1 className="auth-account-block__h1">Вхід</h1>
                <form onSubmit={handleSubmit} className="form-block">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Електронна пошта"
                        className="form-group"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Пароль"
                        className="form-group"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                    {error && <p className="error-message">{error}</p>}
                    <button type="submit" className="form-group-button">Увійти</button>
                </form>
                <p className="auth-account-block__p">Ще немає свого особистого кабінету? <a href="/account/sign-up">Зареєструвати.</a></p>
            </div>
        </>
    );
}
