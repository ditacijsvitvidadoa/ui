

export default function CatalogBlock({ svg, title, link }) {
    return (
        <a href={link} className="catalog-block">
            <img src={svg} alt={title} className="catalog-block__img" />
            <p className="catalog-block__p">{title}</p>
        </a>
    )
}