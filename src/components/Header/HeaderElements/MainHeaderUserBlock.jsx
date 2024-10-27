import React from "react";


function MainHeaderUserBlock() {
    return (
        <div className="main-header-container">
            <div className="main-header-user-block">
                <a href="/account/login" className="main-header-user-block__item">Війти</a>
                <div className="main-header-user-block__stick"></div>
                <a href="/account/sign-up" className="main-header-user-block__item">Зареєструватись</a>
            </div>
        </div>
    )
}

export default MainHeaderUserBlock;
