import React, {useEffect, useState} from "react";
import RangeSlider from "./ProductsPageElements/RangeInput.jsx";
import FilterGroup from "./FilterGroup.jsx";
import CloseBurger from "../../assets/images/Cross/cross.svg";
import {fetchdata} from "../../services/fetchdata.js";

const FiltersBlock = ({ value, setValue, details, handleResetClick, handleApplyClick, filterOpen, setFilterOpen }) => {
    const [filters, setFilters] = useState([]);

    useEffect(() => {
        const fetchFilters = async () => {
            try {
                const response = await fetchdata(`/api/get-products-filter`);
                if (response.status === 200) {
                    const filters = response.data || {};
                    setFilters(filters);

                } else {
                    console.warn(`Failed to fetch filters: Status ${response.status}`);
                    setFilters([]);
                }
            } catch (error) {
                console.error("Error fetching filters:", error.message);
                setFilters([]);
            }
        };

        fetchFilters();
    }, []);

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
                    min={details?.min_price_product?.price || 0}
                    max={details?.max_price_product?.price || 0}
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
            {["categories", "age", "brand", "material", "type"].map(key => {
                const group = filters[key];
                return group ? (
                    <FilterGroup filters={group.items} title={group.title} queryKey={key} key={key} />
                ) : null;
            })}
        </div>
    );
};

export default FiltersBlock;
