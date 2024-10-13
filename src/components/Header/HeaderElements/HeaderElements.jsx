import React, { useState, useRef, useEffect } from 'react';
import Arrow from "../images/arrow.svg";

function CollapsibleBlock({ img, title, children }) {
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState('0px');

    const toggleBlock = () => {
        setIsOpen(prevState => !prevState);
    };

    useEffect(() => {
        if (isOpen) {
            setContentHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setContentHeight('0px');
        }
    }, [isOpen]);

    return (
        <div className="header-burger__collapsible-block">
            <article onClick={toggleBlock} className="header-burger__collapsible-block__main">
                <img src={img} alt={title} className="header-burger__collapsible-block__main-img" />
                <h1 className="header-burger__collapsible-block__main-title">{title}</h1>
                <img src={Arrow} alt="Arrow" className={`header-burger__arrow ${isOpen ? 'open' : ''}`} style={{ marginLeft: 'auto' }} />
            </article>
            <article
                className="header-burger__expandable-content"
                style={{ height: contentHeight, opacity: isOpen ? 1 : 0 }}
                ref={contentRef}
            >
                {children}
            </article>
        </div>
    );
}

export default CollapsibleBlock;
