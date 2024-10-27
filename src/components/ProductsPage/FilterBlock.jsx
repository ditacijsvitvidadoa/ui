import React, { useState, useEffect, useRef } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Arrow from "../../components/Header/images/arrow.svg";

const FilterBlock = ({ filters, title, queryKey, children }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const [activeFilters, setActiveFilters] = useState([]);
    const [checkedFilters, setCheckedFilters] = useState({});
    const [isOpen, setIsOpen] = useState(false);
    const contentRef = useRef(null);
    const [contentHeight, setContentHeight] = useState('0px');

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const filterParam = queryParams.get(queryKey);
        if (filterParam) {
            const selectedFilters = filterParam.split(";");
            setActiveFilters(selectedFilters);
            const checked = {};
            selectedFilters.forEach(filter => {
                checked[filter] = true;
            });
            setCheckedFilters(checked);
        } else {
            setActiveFilters([]);
            setCheckedFilters({});
        }

        const savedIsOpen = localStorage.getItem(`filterBlockOpen_${queryKey}`);
        setIsOpen(savedIsOpen === 'true');
    }, [location.search, queryKey]);

    useEffect(() => {
        if (isOpen) {
            setContentHeight(`${contentRef.current.scrollHeight}px`);
        } else {
            setContentHeight('0px');
        }
        localStorage.setItem(`filterBlockOpen_${queryKey}`, isOpen);
    }, [isOpen]);

    const toggleBlock = () => {
        setIsOpen(prevState => !prevState);
    };

    const handleFilterClick = (filter) => {
        let updatedFilters = [...activeFilters];
        let updatedCheckedFilters = { ...checkedFilters };
        if (updatedFilters.includes(filter)) {
            updatedFilters = updatedFilters.filter((f) => f !== filter);
            updatedCheckedFilters[filter] = false;
        } else {
            updatedFilters.push(filter);
            updatedCheckedFilters[filter] = true;
        }
        setActiveFilters(updatedFilters);
        setCheckedFilters(updatedCheckedFilters);
        const newFilters = updatedFilters.join(";");
        const currentParams = new URLSearchParams(location.search);
        currentParams.set(queryKey, newFilters);
        navigate(`?${currentParams.toString()}`);
        window.location.reload();
    };

    return (
        <div className="filter-block">
            <div className="filters-title-block" onClick={toggleBlock}>
                <span className="filters-title">{title}</span>
                <img className={`filters-arrow ${isOpen ? 'open' : ''}`} src={Arrow} alt="arrow" />
            </div>
            <div className="filters-content" ref={contentRef} style={{ height: contentHeight, transition: 'height 0.5s ease' }}>
                {children ? (
                    <>
                        {children}
                    </>
                ) : (
                    filters.map(({ labelEN, labelUA, value }) => (
                        <article key={value} className="filter-item">
                            <button
                                onClick={() => handleFilterClick(value)}
                                className={`filter-checkbox ${checkedFilters[value] ? 'active' : ''}`}
                            >
                                {checkedFilters[value] ? '✔' : ''}
                            </button>
                            <span className="filter-label">{labelUA}</span>
                        </article>
                    ))
                )}
            </div>
        </div>
    );
};

export default FilterBlock;
