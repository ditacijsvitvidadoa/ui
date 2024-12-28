import { useEffect, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import NotFound from '../../components/NotFound/NotFound';
import Orders from '../../components/AdminPanel/Orders';
import CreateProduct from '../../components/AdminPanel/CreateProduct.jsx';
import Navigation from '../../components/AdminPanel/Navigation';
import {fetchdata} from "../../services/fetchdata.js";

import "./AdminPanelPage.css";
import AdminPanelLogin from "../../components/AdminPanel/AdminPanelLogin.jsx";
import GetOrder from "../../services/OrderFetch/GetOrder.jsx";
import CheckAdminSession from "../../services/AdminPanelFetch/CheckAdminSession.jsx";
// import orders_data from "./dummy_data.json";

export default function AdminPanelPage() {
    const [searchParams] = useSearchParams();
    const content = searchParams.get('content') || 'orders';

    const [orders, setOrders] = useState([]);
    const [filters, setFilters] = useState(null);
    const [accessGranted, setAccessGranted] = useState(null);

    useEffect(() => {
        const checkSession = async () => {
            const isLoggedIn = await CheckAdminSession();
            setAccessGranted(isLoggedIn);
        };

        checkSession();
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

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const response = await fetchdata(`/api/get-products-filter`);
                if (response.status === 200) {
                    const filters = response.data || {};
                    setFilters(filters);
                }
            } catch (error) {
                console.error('Error fetching filters:', error);
            }
        };

        fetchFilters();
    }, []);

    if (accessGranted === false) {
        return <><AdminPanelLogin /> </>;
    }

    if (accessGranted === null) {
        return <div>Loading...</div>;
    }

    const renderContent = () => {
        switch (content) {
            case 'orders':
                return <Orders orders={orders} />;
            case 'createProduct':
                return <CreateProduct filters={filters} />;
            default:
                return <Orders orders={orders} />;
        }
    };

    return (
        <>
            <Navigation />
            <div className="account-content">{renderContent()}</div>
        </>
    );
}
