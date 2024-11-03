// src/utils/validators.js

// Check if the name contains any digits
export const validateName = (name) => {
    return /\d/.test(name) ? "Ім'я не може містити цифри" : "";
};

// Check if the last name contains any digits
export const validateLastName = (lastName) => {
    return /\d/.test(lastName) ? "Прізвище не може містити цифри" : "";
};

// Check if the patronymic contains any digits
export const validatePatronymic = (patronymic) => {
    return /\d/.test(patronymic) ? "По батькові не може містити цифри" : "";
};

// Validate phone number format
export const validatePhoneNumber = (phoneNumber) => {
    const phonePattern = /^\+38\(0\d{2}\)-\d{3}-\d{2}-\d{2}$/;
    return !phonePattern.test(phoneNumber)
        ? "Номер телефону має бути у форматі: +38(0xx)-xxx-xx-xx"
        : "";
};

// Validate password length and character requirements
export const validatePassword = (password) => {
    return password.length < 8 || password.length > 18 || !/[a-zA-Z]/.test(password)
        ? "Пароль має бути від 8 до 18 символів і містити принаймні одну літеру"
        : "";
};

// Validate if passwords match
export const validateConfirmPassword = (password, confirmPassword) => {
    return password !== confirmPassword ? "Паролі не співпадають" : "";
};
