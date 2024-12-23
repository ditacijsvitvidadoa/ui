import CatalogBlock from "../../components/Catalog/CatalogBlock.jsx";

// Catalog Svgs
import ForBoys from "../../assets/images/Catalog/for-boys.svg";
import ForGirls from "../../assets/images/Catalog/for-girls.svg";
import ForInfants from "../../assets/images/Catalog/for-infants.svg";
import SoftToys from "../../assets/images/Catalog/soft-toys.svg";
import BuildingSets from "../../assets/images/Catalog/building-sets.svg";
import Bookstore from "../../assets/images/Catalog/bookstore.svg";
import Art from "../../assets/images/Catalog/art.svg";
import ForSchool from "../../assets/images/Catalog/for-school.svg";
import ForSport from "../../assets/images/Catalog/for-sport.svg";
import Footswear from "../../assets/images/Catalog/footswear.svg"
import Accessories from "../../assets/images/Catalog/accessories.svg";

import "./CatalogPage.css";


export default function CatalogPage() {
    return (
        <section className="catalog-section">
            <CatalogBlock svg={ForBoys} title={"Для хлопців"} link={"/products?categories=Khloptsiam"} />
            <CatalogBlock svg={ForGirls} title={"Для дівчат"} link={"/products?categories=Divchatam"} />
            <CatalogBlock svg={ForInfants} title={"Для немовлят"} link={"/products?categories=Nemovliatam"} />
            <CatalogBlock svg={SoftToys} title={"М’які іграшки"} link={"/products?categories=M'iaki igrashki"} />
            <CatalogBlock svg={BuildingSets} title={"Конструктори"} link={"/products?categories=Konstruktori"} />
            <CatalogBlock svg={Bookstore} title={"Книгарня"} link={"/products?categories=Knigarnia"} />
            <CatalogBlock svg={Art} title={"Творчість"} link={"/products?categories=Tvorchist'"} />
            <CatalogBlock svg={ForSchool} title={"Шкільне"} link={"/products?categories=Shkil'ne"} />
            <CatalogBlock svg={ForSport} title={"Спорт"} link={"/products?categories=Sport"} />
            <CatalogBlock svg={Footswear} title={"Взуття"} link={"/products?categories=Vzuttia"} />
            <CatalogBlock svg={Accessories} title={"Аксесуари"} link={"/products?categories=Aksesuari"} />
        </section>
    )
}