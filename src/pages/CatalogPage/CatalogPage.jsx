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
            <CatalogBlock svg={ForBoys} title={"Для хлопців"} link={"/products?categories="} />
            <CatalogBlock svg={ForGirls} title={"Для дівчат"} link={"/products?categories="} />
            <CatalogBlock svg={ForInfants} title={"Для немовлят"} link={"/products?categories="} />
            <CatalogBlock svg={SoftToys} title={"М’які іграшки"} link={"/products?categories="} />
            <CatalogBlock svg={BuildingSets} title={"Конструктори"} link={"/products?categories="} />
            <CatalogBlock svg={Bookstore} title={"Книгарня"} link={"/products?categories="} />
            <CatalogBlock svg={Art} title={"Творчість"} link={"/products?categories="} />
            <CatalogBlock svg={ForSchool} title={"Шкільне"} link={"/products?categories="} />
            <CatalogBlock svg={ForSport} title={"Спорт"} link={"/products?categories="} />
            <CatalogBlock svg={Footswear} title={"Взуття"} link={"/products?categories="} />
            <CatalogBlock svg={Accessories} title={"Аксесуари"} link={"/products?categories="} />
        </section>
    )
}