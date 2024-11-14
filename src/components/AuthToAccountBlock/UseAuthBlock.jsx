import {useState} from "react";


export default function useAuthBlock() {
    const [showAuthBlock, setShowAuthBlock] = useState(false);

    const openAuthBlock = () => setShowAuthBlock(true);
    const closeAuthBlock = () => setShowAuthBlock(false);
    const toggleAuthBlock = () => setShowAuthBlock(prev => !prev);

    return { showAuthBlock, openAuthBlock, closeAuthBlock, toggleAuthBlock };
}