import { useSearchParams } from 'react-router-dom';
import PrivacyData from "../../components/AccountPage/PrivacyData/PrivacyData.jsx";
import OrderHistory from "../../components/AccountPage/OrderHistory/OrderHistory.jsx";
import Support from "../../components/AccountPage/Support/Support.jsx";

import "../../components/AccountPage/AccountPage.css";
import UseBreadcrumbs from "../../components/shared/Breadcrumbs/Breadcrumbs.jsx";

function AccountPage() {
    const [searchParams] = useSearchParams();
    const content = searchParams.get('content') || 'PrivacyData';

    const renderContent = () => {
        switch (content) {
            case 'PrivacyData':
                return <PrivacyData />;
            case 'OrderHistory':
                return <OrderHistory />;
            case 'Support':
                return <Support />;
            default:
                return <PrivacyData />;
        }
    };

    const isActive = (linkContent) => content === linkContent ? 'active' : '';

    return (
        <>
            <UseBreadcrumbs/>
            <section className="account-container">
                <nav className="account-nav">
                    <div className="account-nav-item">
                        <a
                            href="?content=PrivacyData"
                            className={`account-nav-link ${isActive('PrivacyData')}`}
                        >
                            Особисті дані
                        </a>
                        <div className={`account-nav-stick ${isActive('PrivacyData')}`}></div>
                    </div>

                    <div className="account-nav-item">
                        <a
                            href="?content=OrderHistory"
                            className={`account-nav-link ${isActive('OrderHistory')}`}
                        >
                            Історія заказів
                        </a>
                        <div className={`account-nav-stick ${isActive('OrderHistory')}`}></div>
                    </div>

                    <div className="account-nav-item">
                        <a
                            href="?content=Support"
                            className={`account-nav-link ${isActive('Support')}`}
                        >
                            Служба підтримки
                        </a>
                        <div className={`account-nav-stick ${isActive('Support')}`}></div>
                    </div>
                </nav>
                <div className="account-content">{renderContent()}</div>
            </section>
        </>

    );
}

export default AccountPage;

