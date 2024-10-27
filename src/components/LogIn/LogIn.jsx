import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { fetchdata } from "../shared/fetchData/fetchdata.js";
import "./css/LogIn.css";

function LogIn() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(null);

        const formData = new FormData();
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await fetchdata("/api/login", {
                method: "POST",
                body: formData,
            });

            navigate("/account");
        } catch (err) {
            setError("Неправильна електронна пошта або пароль");
        }
    };

    return (
        <div className="form-container">
            <h1 className="form-container-h1">Вхід в профіль</h1>
            <form onSubmit={handleSubmit} className="form-block">
                    <input
                        type="email"
                        id="email"
                        value={email}
                        placeholder="Електронна пошта"
                        className="form-group"
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                    <input
                        type="password"
                        id="password"
                        value={password}
                        placeholder="Пароль"
                        className="form-group"
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                {error && <p className="error-message">{error}</p>}
                <button type="submit" className="form-group-button">Log In</button>
            </form>
        </div>
    );
}

export default LogIn;
