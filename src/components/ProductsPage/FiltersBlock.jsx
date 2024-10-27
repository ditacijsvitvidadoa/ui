import React from "react";
import RangeSlider from "./ProductsPageElements/RangeInput.jsx";
import filters from './dummy_data.json';
import FilterGroup from "./FilterGroup.jsx";
import CloseBurger from "../Header/images/close-burger.svg";

const FiltersBlock = ({ value, setValue, details, handleResetClick, handleApplyClick, filterOpen, setFilterOpen }) => {
    return (
        <div className={`products-filters ${filterOpen ? 'open' : ''}`}>
            <img
                src={CloseBurger}
                alt="Close filter burger"
                className="products-filters__close-burger"
                onClick={() => setFilterOpen(false)}
            />
            <FilterGroup title="Ціна">
                <div className="products-price-filter">
                    <p>{value[0]}</p>
                    <div className="products-price-filter-stick"></div>
                    <p>{value[1]}</p>
                </div>
                <RangeSlider
                    min={details.min_price_product.price}
                    max={details.max_price_product.price}
                    step={1}
                    value={value}
                    onChange={setValue}
                    isShowTooltip={true}
                />
                <div className="products-price-filter__buttons">
                    <button className="products-price-filter__btn" onClick={handleResetClick}>Скинути</button>
                    <button className="products-price-filter__btn" onClick={handleApplyClick}>Застосувати</button>
                </div>
            </FilterGroup>
            {["categories", "age", "brand", "material", "type"].map(key => (
                <FilterGroup filters={filters[key].items} title={filters[key].title} queryKey={key} key={key} />
            ))}
        </div>
    );
};

export default FiltersBlock;
