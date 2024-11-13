

export default function GetStatus(status) {
    switch (status) {
        case -1:
            return "Скасовано";
        case 1:
            return "На обробці";
        case 2:
            return "Оброблено";
        case 3:
            return "На відправці";
        case 4:
            return "Відправлено";
        case 5:
            return "Отримано";
        case 6:
            return "Повернення";
        case 7:
            return "Повернено";
        case 10:
            return "Тех обробка";
        default:
            return "Невідомий статус";
    }
}
