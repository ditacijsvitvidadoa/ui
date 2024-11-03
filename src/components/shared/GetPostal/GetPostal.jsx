import NovaPoshta from "../../../assets/images/Postal/Nova-poshta.svg";
import UkrPoshta from "../../../assets/images/Postal/Ukr-poshta.svg";

export default function GetPostal(postalName) {
    console.log(postalName)
    if (postalName === "NovaPoshta") {
        return NovaPoshta
    } else if (postalName === "UkrPoshta") {
        return UkrPoshta
    } else {
        return null;
    }
}