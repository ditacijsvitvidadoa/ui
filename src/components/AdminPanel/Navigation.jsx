import React from "react";


export default function Navigation() {
    return (
        <nav className="admin-panel-nav">
            <a href="?content=orders" className="admin-panel-nav__link">Закази</a>
            <a href="?content=createProduct" className="admin-panel-nav__link">Створити продукт</a>
        </nav>
    )
}