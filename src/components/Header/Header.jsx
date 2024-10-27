import React, { useState, useEffect, useRef } from 'react';

import "./Header.css"

import DesktopHeader from "./DesktopHeader/DesktopHeader.jsx";
import MobileHeader from "./MobileHeader/MobileHeader.jsx";

function Header() {
    return (
    <>
        <DesktopHeader />
        <MobileHeader />
    </>
    )
}

export default Header