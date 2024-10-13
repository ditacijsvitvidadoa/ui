function FooterBlock({ title, content }) {
    const isTextContent = content && content.every(item => item.text);

    return (
        <div className="footer-block">
            <article className="footer-block-head">
                <h1>{title}</h1>
                <div className="footer-block-head__stick"></div>
            </article>
            <article className={`footer-block__content ${isTextContent ? 'text' : 'images'}`}>
                {content && content.map((item, index) => {
                    // Рендерим текстовые элементы
                    if (item.text && item.link) {
                        return (
                            <a key={index} href={item.link} className="footer-block__content-link">
                                {item.text}
                            </a>
                        );
                    }
                    // Рендерим изображения
                    else if (item.type === "image" && item.link) {
                        return (
                            <a key={index} href={item.link} target="_blank" rel="noopener noreferrer">
                                <img src={item.src} alt={item.alt} className="footer-block__content-img" />
                            </a>
                        );
                    } else {
                        return null;
                    }
                })}
            </article>
        </div>
    );
}

export default FooterBlock;
