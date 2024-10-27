import { useLocation } from 'react-router-dom';

function UseBreadcrumbs() {
    const location = useLocation();

    const getBreadcrumbs = (path) => {
        switch (path) {
            case '/cart':
                return 'Головна / Кошик';
            case '/account':
                return 'Головна / Особистий кабінет'
            default:
                return 'Головна / Сторінка не знайдена';
        }
    };

    return (
        <>
            {getBreadcrumbs(location.pathname)}
        </>
    );
}

export default UseBreadcrumbs;