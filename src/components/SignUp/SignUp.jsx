import { useState } from "react";
import { useNavigate } from "react-router-dom";
import InputMask from "react-input-mask";
import { fetchdata } from "../../services/fetchdata.js";
import {
    validateName,
    validateLastName,
    validatePatronymic,
    validatePhoneNumber,
    validatePassword,
    validateConfirmPassword,
} from "../Validators/validators.jsx";

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

        newErrors.firstName = validateName(firstName);
        newErrors.lastName = validateLastName(lastName);
        newErrors.patronymic = validatePatronymic(patronymic);
        newErrors.phoneNumber = validatePhoneNumber(phoneNumber);
        newErrors.password = validatePassword(password);
        newErrors.confirmPassword = validateConfirmPassword(password, confirmPassword);

        setErrors(newErrors);
        return Object.keys(newErrors).every((key) => newErrors[key] === "");
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
                setErrors({ email: "Аккаунт з такою електронною адресою вже існує" });
            } else if (response.status === 200) {
                navigate("/account/login");
            } else {
                const result = await response.json();
                console.log("Error: ", result);
                setErrors({ form: result.message || "Не вдалося створити акаунт" });
            }
        } catch (err) {
            console.log("Catch error: ", err);
            setErrors({ form: "Не вдалося створити акаунт через помилку сервера. Спробуйте пізніше." });
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
