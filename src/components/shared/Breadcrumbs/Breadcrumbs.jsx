import { useLocation } from 'react-router-dom';

function UseBreadcrumbs() {
    const location = useLocation();

    const getBreadcrumbs = (path) => {
        switch (path) {
            case '/cart':
                return 'Головна / Кошик';
            default:
                return 'Головна / Сторінка не знайдена';
        }
    };

    return (
        <div>
            {getBreadcrumbs(location.pathname)}
        </div>
    );
}

export default UseBreadcrumbs;