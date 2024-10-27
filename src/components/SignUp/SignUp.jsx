import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { fetchdata } from "../shared/fetchData/fetchdata.js";

function SignUp() {
        const [firstName, setFirstName] = useState("");
        const [lastName, setLastName] = useState("");
        const [patronymic, setPatronymic] = useState("");
        const [phoneNumber, setPhoneNumber] = useState("");
        const [email, setEmail] = useState("");
        const [password, setPassword] = useState("");
        const [confirmPassword, setConfirmPassword] = useState("");
        const [errors, setErrors] = useState({});
        const navigate = useNavigate();

        const validateForm = () => {
            const newErrors = {};

            if (/\d/.test(firstName)) {
                newErrors.firstName = "Ім'я не може містити цифри";
            }
            if (/\d/.test(lastName)) {
                newErrors.lastName = "Прізвище не може містити цифри";
            }
            if (/\d/.test(patronymic)) {
                newErrors.patronymic = "По батькові не може містити цифри";
            }

            // Проверка номера телефона
            const phonePattern = /^\+38\(0\d{2}\)-\d{3}-\d{2}-\d{2}$/;
            if (!phonePattern.test(phoneNumber)) {
                newErrors.phoneNumber = "Номер телефону повинен бути в форматі: +38(0xx)-xxx-xx-xx";
            }

            // Проверка пароля
            if (password.length < 8 || password.length > 18 || !/[a-zA-Z]/.test(password)) {
                newErrors.password = "Пароль повинен містити від 8 до 18 символів і включати хоча б одну букву";
            }

            // Проверка подтверждения пароля
            if (password !== confirmPassword) {
                newErrors.confirmPassword = "Паролі не співпадають";
            }

            setErrors(newErrors);
            return Object.keys(newErrors).length === 0;
        };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setErrors({});
        if (!validateForm()) {
            return;
        }

        const formData = new FormData();
        formData.append("firstName", firstName);
        formData.append("lastName", lastName);
        formData.append("patronymic", patronymic);
        formData.append("phoneNumber", phoneNumber);
        formData.append("email", email);
        formData.append("password", password);

        try {
            const response = await fetchdata("/api/create-account", {
                method: "POST",
                body: formData,
                credentials: 'include'
            });

            if (response.status === 409) {
                const result = await response.json();
                console.log("Conflict: ", result);
                setErrors({email: "Аккаунт з такою електронною адресою вже існує"});
            } else if (response.status === 200) {
                navigate("/account/login");
            } else {
                const result = await response.json();
                console.log("Error: ", result);
                setErrors({form: result.message || "Не вдалося створити акаунт"});
            }
        } catch (err) {
            console.log("Catch error: ", err);
            setErrors({form: "Не вдалося створити акаунт через помилку сервера. Спробуйте пізніше."});
        }
    };



        return (
        <div className="form-container">
            <h1 className="form-container-h1">Реєстрація</h1>
            <form onSubmit={handleSubmit} className="form-block">
                <input
                    type="text"
                    placeholder="Ім'я"
                    value={firstName}
                    className={`form-group ${errors.firstName ? 'error-input' : ''}`}
                    onChange={(e) => setFirstName(e.target.value)}
                    required
                />
                {errors.firstName && <p className="error-message">{errors.firstName}</p>}
                <input
                    type="text"
                    placeholder="Прізвище"
                    value={lastName}
                    className={`form-group ${errors.lastName ? 'error-input' : ''}`}
                    onChange={(e) => setLastName(e.target.value)}
                    required
                />
                {errors.lastName && <p className="error-message">{errors.lastName}</p>}
                <input
                    type="text"
                    placeholder="По батькові"
                    value={patronymic}
                    className={`form-group ${errors.patronymic ? 'error-input' : ''}`}
                    onChange={(e) => setPatronymic(e.target.value)}
                    required
                />
                {errors.patronymic && <p className="error-message">{errors.patronymic}</p>}
                <InputMask
                    mask="+38(099)-999-99-99"
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                    className={`form-group ${errors.phoneNumber ? 'error-input' : ''}`}
                    placeholder="Номер телефону"
                    required
                />
                {errors.phoneNumber && <p className="error-message">{errors.phoneNumber}</p>}
                <input
                    type="email"
                    placeholder="Електронна пошта"
                    value={email}
                    className="form-group"
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                {errors.email && <p className="error-message">{errors.email}</p>}
                <input
                    type="password"
                    placeholder="Пароль"
                    value={password}
                    className={`form-group ${errors.password ? 'error-input' : ''}`}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                {errors.password && <p className="error-message">{errors.password}</p>}
                <input
                    type="password"
                    placeholder="Повторіть пароль"
                    value={confirmPassword}
                    className={`form-group ${errors.confirmPassword ? 'error-input' : ''}`}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                />
                {errors.confirmPassword && <p className="error-message">{errors.confirmPassword}</p>}
                {errors.form && <p className="error-message">{errors.form}</p>}
                <button type="submit" className="form-group-button">Зареєструватися</button>
            </form>
        </div>
    );
}

export default SignUp;
