import { useEffect, useState } from "react";
import { fetchdata } from "../../services/fetchdata.js";
import leftArrow from "../../assets/images/LeftArrow/leftArrow.svg";
import "./PurchaseProcessPage.css";
import CartList from "../../components/PurchaseProcess/CartList.jsx";
import ContactInfo from "../../components/PurchaseProcess/ContactInfo.jsx";
import PostalInfo from "../../components/PurchaseProcess/PostalInfo.jsx";
import GetCartProducts from "../../services/CartFetch/GetCartProducts.jsx";
import CreateOrder from "../../services/OrderFetch/CreateOrder.jsx";
import DeleteFromCart from "../../services/CartFetch/DeleteFromCart.jsx";
import SuccessfulPurchase from "../../components/PurchaseProcess/SuccessfulPurchase.jsx";

export default function PurchaseProcessPage() {
    const [account, setAccount] = useState();
    const [products, setProducts] = useState([]);
    const [phoneNumber, setPhoneNumber] = useState('');
    const [formContact, setFormContact] = useState({
        firstName: '',
        lastName: '',
        patronymic: '',
        phone: '',
        email: '',
    });
    const [formPostal, setFormPostal] = useState({
        postal_type: '',
        city: '',
        receiving_type: '',
        postal_info: '',
        street: '',
        house: '',
        apartment: '',
        floor: ''
    });
    const [totalSum, setTotalSum] = useState(0);
    const [isPurchaseSuccessful, setIsPurchaseSuccessful] = useState(false);
    const [isValidCity, setValidCity] = useState(true)


    useEffect(() => {
        const fetchProducts = async () => {
            try {
                const data = await GetCartProducts();
                setProducts(data);
            } catch (error) {
                console.error("Error to get products from cart:", error);
            }
        };
        fetchProducts();
    }, []);

    useEffect(() => {
        const fetchProduct = async () => {
            try {
                const response = await fetchdata(`/api/user-account`);
                if (response.status === 200) {
                    setAccount(response.data);
                } else if (response.status === 401) {
                    setAccount(null);
                } else {
                    console.warn(`Failed to fetch product: Status ${response.status}`);
                }
            } catch (error) {
                if (error.message !== 'Unauthorized') {
                    console.error("Error fetching product:", error.message);
                }
            }
        };
        fetchProduct();
    }, []);

    useEffect(() => {
        const initialTotal = products.reduce((sum, product) => {
            const productPrice = product.discount ? product.discount : product.price;
            return sum + productPrice;
        }, 0);
        setTotalSum(initialTotal);
    }, [products]);

    const handleConfirmOrder = async () => {
        if (!isValidCity) {
            return;
        }

        const formData = new FormData();
        formData.append("firstName", formContact.firstName);
        formData.append("lastName", formContact.lastName);
        formData.append("patronymic", formContact.patronymic);
        formData.append("phone", formContact.phone);
        formData.append("email", formContact.email);
        formData.append("postal_type", formPostal.postal_type);
        formData.append("city", formPostal.city);
        formData.append("postal_info", formPostal.postal_info);
        formData.append("receiving_type", formPostal.receiving_type);
        formData.append("street", formPostal.street);
        formData.append("house", formPostal.house);
        formData.append("apartment", formPostal.apartment);
        formData.append("floor", formPostal.floor);

        products.forEach((product, index) => {
            product.image_urls.forEach((url) => {
                formData.append(`products[${index}][image_urls][]`, url);
            });
            formData.append(`products[${index}][title]`, product.title);
            formData.append(`products[${index}][price]`, product.price);
            formData.append(`products[${index}][discount]`, product.discount || 0);
        });

        const status = await CreateOrder(formData);
        if (status === 200) {
            products.forEach(product => {
                DeleteFromCart(product.id);
            });
            setIsPurchaseSuccessful(true);

            setTimeout(() => {
                window.location.href = '/';
            }, 2000);
        }
    };

    const handleFillInputs = () => {
        if (account) {
            setFormContact({
                firstName: account.full_name.first_name || '',
                lastName: account.full_name.last_name || '',
                patronymic: account.full_name.patronymic || '',
                phone: account.phone || '',
                email: account.email || '',
            });
            const postalInfo = account.postal_service.postal_info || [];
            let street = '';
            let house = '';
            let apartment = '';
            let floor = '';
            if (account.postal_service.receiving_type === 'Courier') {
                street = postalInfo.find(info => info.Key === 'street')?.Value || '';
                house = postalInfo.find(info => info.Key === 'house')?.Value || '';
                apartment = postalInfo.find(info => info.Key === 'apartment')?.Value || '';
                floor = postalInfo.find(info => info.Key === 'floor')?.Value || '';
            }
            setFormPostal({
                postal_type: account.postal_service.postal_type || '',
                city: account.postal_service.city || '',
                receiving_type: account.postal_service.receiving_type || '',
                postal_info: account.postal_service.postal_info || '',
                street,
                house,
                apartment,
                floor
            });
        }
    };

    return (
        <section className="purchase-process-section">
            <div className="purchase-process-content">
                <h1 className="purchase-process-h1">Оформлення замовлення</h1>
                <article>
                    {account ? (
                        <div>
                            <article onClick={handleFillInputs} className="purchase-process__autofill-data-block">
                                <p>Заповнити дані з аккаунту</p>
                            </article>
                        </div>
                    ) : null}
                    <CartList products={products} />
                    <ContactInfo formContact={formContact} setFormContact={setFormContact} setPhoneNumber={setPhoneNumber} phoneNumber={phoneNumber} />
                    <PostalInfo formPostal={formPostal} setFormPostal={setFormPostal}
                                isValidCity={isValidCity} setIsValidCity={setValidCity}/>
                </article>
            </div>
            <div className="order-summary">
                <h2 className="order-summary__h2">Всього</h2>
                <article className="order-summary__item">
                    <p className="order-summary__text">Товару на сумму</p>
                    <p className="order-summary__value">{totalSum} ₴</p>
                </article>
                <div className="separator-block"></div>
                <article className="order-summary__item">
                    <p className="order-summary__text">До сплати</p>
                    <p className="order-summary__totaly-sum">{totalSum} ₴</p>
                </article>
                <div className="separator-block"></div>
                <p className="order-summary__confirm-purchase" onClick={handleConfirmOrder}>Підтвердити</p>
                <p className="order-summary__notice">
                    Отримання замовлення від 5 000 ₴ до 30 000 ₴ можливе за наявності документів. При оплаті готівкою
                    від 30 000 ₴ необхідно надати документи для верифікації згідно з вимогами Закону України від
                    06.12.2019 №361-IX.

                    <br/><br/>
                    Підтверджуючи замовлення, я приймаю всі умови та правила сайту, включно з положенням про обробку і
                    захист персональних даних, а також угодою користувача.
                </p>
            </div>

            {isPurchaseSuccessful && <SuccessfulPurchase />}
        </section>
    );
}
