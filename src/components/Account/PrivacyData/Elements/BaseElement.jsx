import { useState, useRef, useEffect } from 'react';

function BaseElement({ title, title_content }) {
    const [isEditing, setIsEditing] = useState(false);
    const [content, setContent] = useState("");
    const inputRef = useRef(null);

    useEffect(() => {
        setContent(title_content);
    }, [title_content]);

    const handleEditClick = () => {
        setContent("");
        setIsEditing(true);
    };

    const handleConfirmClick = () => {
        setIsEditing(false);
    };

    useEffect(() => {
        if (isEditing && inputRef.current) {
            inputRef.current.focus();
        }
    }, [isEditing]);

    return (
        <article className="base-element">
            <section className="base-element__content">
                <p className="base-element__content-title">{title}:</p>
                {isEditing ? (
                    <input
                        ref={inputRef}
                        type="text"
                        value={content}
                        onChange={(e) => setContent(e.target.value)}
                        className="base-element__content-title-content base-element__content-input"
                    />
                ) : (
                    <p className="base-element__content-title-content base-element-content-p">{content}</p>
                )}
            </section>
            <button onClick={isEditing ? handleConfirmClick : handleEditClick} className="base-element-btn">
                {isEditing ? 'Підтвердити' : 'Змінити'}
            </button>
        </article>
    );
}

export default BaseElement;
