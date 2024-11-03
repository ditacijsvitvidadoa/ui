import {
    validateName,
    validateLastName,
    validatePatronymic,
    validatePhoneNumber,
} from "../Validators/validators";
import {useState} from "react";
import InputMask from "react-input-mask";

export default function ContactInfo({ formContact, setFormContact, setPhoneNumber, phoneNumber }) {
    const [errors, setErrors] = useState({
        firstName: '',
        lastName: '',
        patronymic: '',
        phone: '',
        email: ''
    });

    const handleInputChange = (e) => {
        const { name, value } = e.target;

        setFormContact((prevData) => ({
            ...prevData,
            [name]: value,
        }));

        let error = '';
        switch (name) {
            case "firstName":
                error = validateName(value);
                break;
            case "lastName":
                error = validateLastName(value);
                break;
            case "patronymic":
                error = validatePatronymic(value);
                break;
            case "phone":
                error = validatePhoneNumber(value);
                break;
            default:
                break;
        }

        setErrors((prevErrors) => ({
            ...prevErrors,
            [name]: error
        }));
    };

    return (
        <div className="purchase-process-block">
            <h2 className="contact-data-block__h2">Особисті дані</h2>
            <article className="purchase-process-inputs">
                <div>
                    <input
                        type="text"
                        name="firstName"
                        required
                        value={formContact.firstName}
                        className="contact-data-input"
                        placeholder="Ім'я"
                        onChange={handleInputChange}
                    />
                    {errors.firstName && <p className="contact-data__error-text">{errors.firstName}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="lastName"
                        required
                        value={formContact.lastName}
                        className="contact-data-input"
                        placeholder="Прізвище"
                        onChange={handleInputChange}
                    />
                    {errors.lastName && <p className="contact-data__error-text">{errors.lastName}</p>}
                </div>
                <div>
                    <input
                        type="text"
                        name="patronymic"
                        required
                        value={formContact.patronymic}
                        className="contact-data-input"
                        placeholder="По батькові"
                        onChange={handleInputChange}
                    />
                    {errors.patronymic && <p className="contact-data__error-text">{errors.patronymic}</p>}
                </div>
                <div>
                    <InputMask
                        mask="+38(099)-999-99-99"
                        value={formContact.phone}
                        onChange={handleInputChange}
                        name="phone"
                        className={`contact-data-input ${errors.phone ? 'error-input' : ''}`}
                        placeholder="Номер телефону"
                        required
                    />
                    {errors.phone && <p className="contact-data__error-text">{errors.phone}</p>}
                </div>
                <div>
                    <input
                        type="email"
                        name="email"
                        required
                        value={formContact.email}
                        className="contact-data-input"
                        placeholder="Електронна пошта"
                        onChange={handleInputChange}
                    />
                    {errors.email && <p className="contact-data__error-text">{errors.email}</p>}
                </div>
            </article>
        </div>
    );
}