import { useLocation } from 'react-router-dom';

function UseBreadcrumbs() {
    const location = useLocation();

    const getBreadcrumbs = (path) => {
        switch (path) {
            case '/cart':
                return 'Головна / Кошик';
            case '/account':
                return 'Головна / Особистий кабінет';
            case '/favourites':
                return 'Головна / Улюблені товари';
            default:
                return 'Головна / Сторінка не знайдена';
        }
    };

    return (
        <div className="breadcrumbs">
            {getBreadcrumbs(location.pathname)}
        </div>
    );
}

export default UseBreadcrumbs;