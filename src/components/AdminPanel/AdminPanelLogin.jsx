import { useState } from 'react';
import InputMask from 'react-input-mask';
import AdminLoginFetch from "../../services/AdminPanelFetch/AdminLoginFetch.jsx";

export default function AdminPanelLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [phone, setPhone] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        const formdata = new FormData();
        formdata.append("Email", email);
        formdata.append("Password", password);
        formdata.append("Phone", phone);

        try {
            const response = await AdminLoginFetch(formdata);
            if (response && response.status === 200) {
                window.location.reload();
            } else {
                console.error("Login failed with status:", response?.status);
            }
        } catch (error) {
            console.error("Error during login:", error.message || error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        if (name === "phone") {
            setPhone(value);
        }
    };

    return (
        <section className="admin-panel-login">
            <form onSubmit={handleSubmit}>
                <div>
                    <input
                        type="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Введіть електронну пошту"
                        className="admin-panel-login__input"
                        required
                    />
                </div>
                <div>
                    <input
                        type="password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Введіть пароль"
                        className="admin-panel-login__input"
                        required
                    />
                </div>
                <div>
                    <InputMask
                        mask="+38(099)-999-99-99"
                        value={phone}
                        onChange={handleInputChange}
                        name="phone"
                        placeholder="Введіть номер телефону"
                        className="admin-panel-login__input"
                        required
                    />
                </div>
                <button style={{ cursor: "pointer" }} type="submit" className="admin-panel-login__submit">Увійти</button>
            </form>
        </section>
    );
}