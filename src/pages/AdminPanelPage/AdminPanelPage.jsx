import { useEffect, useState } from 'react';
import GetOrder from "../../services/OrderFetch/GetOrder.jsx";
import NotFound from "../../components/NotFound/NotFound.jsx";

import "./AdminPanelPage.css";
import Orders from "../../components/AdminPanel/Orders.jsx";
import Navigation from "../../components/AdminPanel/Navigation.jsx";
import PrivacyData from "../../components/Account/PrivacyData/PrivacyData.jsx";
import OrderHistory from "../../components/Account/OrderHistory/OrderHistory.jsx";
import Support from "../../components/Account/Support/Support.jsx";
import {useSearchParams} from "react-router-dom";
import CreateProduct from "../../components/AdminPanel/CreateProduct.jsx";

const allowedIPs = ['192.168.1.1', '203.0.113.5', '195.43.70.169', '188.163.69.35'];

export default function AdminPanelPage() {
    const [accessGranted, setAccessGranted] = useState(false);
    const [searchParams] = useSearchParams();
    const content = searchParams.get('content') || 'orders';
    const [orders, setOrders] = useState([])

    useEffect(() => {
        const getUserIP = async () => {
            try {
                const response = await fetch('https://api.ipify.org?format=json');
                const data = await response.json();
                const userIP = data.ip;

                if (allowedIPs.includes(userIP)) {
                    setAccessGranted(true);
                } else {
                    setAccessGranted(false);
                }
            } catch (error) {
                console.error('Error fetching IP:', error);
                setAccessGranted(false);
            }
        };

        getUserIP();
    }, []);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await GetOrder();
                if (response) {
                    setOrders(response);
                }
            } catch (error) {
                console.error('Error fetching orders:', error);
            }
        };

        fetchData();
    }, []);

    if (!accessGranted) {
        return <><NotFound /></>;
    }

    const renderContent = () => {
        switch (content) {
            case 'orders':
                return <Orders orders={orders}/>;
            case 'createProduct':
                return <CreateProduct />;
            case 'Support':
                return <Support />;
            default:
                return <Orders orders={orders}/>;
        }
    };

    return (
        <>
            <Navigation/>

            <div className="account-content">{renderContent()}</div>

        </>
    );
}
