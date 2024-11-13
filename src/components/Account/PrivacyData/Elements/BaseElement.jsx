import { useState, useRef, useEffect } from 'react';
import InputMask from "react-input-mask";
import AccountInfoFetch from "../../../../services/AccountFatch/AccountInfoFetch.jsx";

function BaseElement({ title, title_content, field, mask, validate }) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState("");
    const [error, setError] = useState("");
    const inputRef = useRef(null);

    const isPasswordField = field === "password";

    useEffect(() => {
        setContent(title_content);
    }, [title_content]);

    const handleConfirmBtn = () => {
        if (validate && !validate(content)) {
            setError("Невірний формат даних");
            return;
        }

        if (mask && content.includes("_")) {
            setError("Заповніть номер телефону повністю");
            return;
        }

        if (isPasswordField && (!/(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{8,}/.test(content))) {
            setError("Пароль має містити мінімум 8 символів та хоча б одну літеру");
            return;
        }

        setError("");
        const formData = new FormData();
        formData.append(field, content);
        AccountInfoFetch(field, formData);
        setIsEditing(false);
    };

    const handleEditClick = () => {
        setIsEditing(true);
        setError("");
        if (isPasswordField) setContent("");
    };

    useEffect(() => {
        if (isEditing && inputRef.current && typeof inputRef.current.focus === 'function') {
            inputRef.current.focus();
        }
    }, [isEditing]);

    const handleInputChange = (e) => {
        setContent(e.target.value);
        setError("");
    };

    return (
        <article className="base-element">
            <section className="base-element__content">
                <p className="base-element__content-title">{title}:</p>
                {isEditing ? (
                    mask ? (
                        <InputMask
                            mask={mask}
                            value={content}
                            onChange={handleInputChange}
                            inputRef={(input) => (inputRef.current = input)}
                            className={`base-element__content-title-content base-element__content-input ${error ? 'error' : ''}`}
                        />
                    ) : (
                        <input
                            ref={inputRef}
                            type={isPasswordField ? "password" : "text"}
                            value={content}
                            onChange={handleInputChange}
                            className={`base-element__content-title-content base-element__content-input ${error ? 'error' : ''}`}
                            placeholder={isPasswordField ? "Введіть пароль" : ""}
                        />
                    )
                ) : (
                    <p className="base-element__content-title-content base-element-content-p">
                        {isPasswordField ? "********" : content}
                    </p>
                )}
                {error && <p className="error-message">{error}</p>}
            </section>
            <button
                onClick={isEditing ? handleConfirmBtn : handleEditClick}
                className={`base-element-btn ${error ? 'invalid' : ''}`}
                disabled={isEditing && !!error}
            >
                {isEditing ? 'Підтвердити' : 'Змінити'}
            </button>
        </article>
    );
}

export default BaseElement;
