import React, { useState, useEffect, useCallback } from "react";
import Trash from "../../assets/images/CartImages/trash.svg";
import CreateOrder from "../../services/OrderFetch/CreateOrder.jsx";
import CreateProductFetch from "../../services/ProductsFetch/CreateProduct.jsx";

const sizes = ["XXS", "XS", "S", "M", "L", "XL", "XXL"];
const availableColors = ["#ffffff", "#000", "#d30000", "#878787", "#FFFF00"];

const CustomInput = ({ label, options, value, onChange }) => {
    const [inputValue, setInputValue] = useState(value || "");
    const [filteredOptions, setFilteredOptions] = useState(options);
    const [showSuggestions, setShowSuggestions] = useState(false);
    const [searchTimeout, setSearchTimeout] = useState(null);

    const handleInputChange = (e) => {
        const { value } = e.target;
        setInputValue(value);

        setShowSuggestions(true);

        if (searchTimeout) clearTimeout(searchTimeout);
        setSearchTimeout(setTimeout(() => filterOptions(value), 500));

        if (onChange) onChange(value);
    };

    const filterOptions = (query) => {
        const lowercasedQuery = query.toLowerCase();
        const filtered = options.filter(option =>
            option.labelUA.toLowerCase().includes(lowercasedQuery)
        );
        setFilteredOptions(filtered);
    };

    const handleSelect = (option) => {
        setInputValue(option.labelUA);
        if (onChange) onChange(option.labelUA);
        setFilteredOptions([]);
        setShowSuggestions(false);
    };

    useEffect(() => {
        setInputValue(value);
    }, [value]);

    const handleFocus = () => {
        setShowSuggestions(true);
        setFilteredOptions(options);
    };

    return (
        <div>
            <input
                placeholder={label}
                type="text"
                value={inputValue}
                onChange={handleInputChange}
                onFocus={handleFocus}
                onBlur={() => setTimeout(() => setShowSuggestions(false), 100)}
                className="create-product__input"
            />
            {showSuggestions && filteredOptions.length > 0 && (
                <div className="create-product__suggestions">
                    {filteredOptions.map((option, index) => (
                        <p
                            key={index}
                            onClick={() => handleSelect(option)}
                            style={{ cursor: "pointer" }}
                        >
                            {option.labelUA}
                        </p>
                    ))}
                </div>
            )}
        </div>
    );
};


const CreateProduct = ({ filters }) => {
    const [images, setImages] = useState([]);
    const [previews, setPreviews] = useState([]);
    const [activeIndex, setActiveIndex] = useState(0);
    const [isSizeChecked, setIsSizeChecked] = useState(false);
    const [isColorChecked, setIsColorChecked] = useState(false);
    const [selectedSizes, setSelectedSizes] = useState([]);
    const [type, setType] = useState('');
    const [productColors, setProductColors] = useState([]);
    const [customColor, setCustomColor] = useState("#000000");
    const [characteristics, setCharacteristics] = useState([]);
    const [showMessage, setShowMessage] = useState(false);
    const [newCharacteristic, setNewCharacteristic] = useState({ key: '', value: '' });
    const [customValues, setCustomValues] = useState({
        material: '',
        age: '',
        category: '',
        brand: '',
        type: ''
    });
    const [isSizeTableChecked, setIsSizeTableChecked] = useState(false);

    const [categories] = useState(filters?.categories?.items || []);
    console.log(categories)
    const [materials] = useState(filters?.material?.items || []);
    const [ages] = useState(filters?.age?.items || []);
    console.log(ages)
    const [brands] = useState(filters?.brand?.items || []);
    const [types] = useState(filters?.type?.items || []);

    const handleSizeTableChange = (event) => {
        setIsSizeTableChecked(event.target.checked);
    };

    const handleSizeCheckboxChange = (e) => {
        setIsSizeChecked(e.target.checked);
        if (!e.target.checked) {
            setType('');
            setSelectedSizes([]);
        }
    };

    const handleColorCheckboxChange = (e) => {
        setIsColorChecked(e.target.checked);
        if (!e.target.checked) {
            setProductColors([]);
        }
    };

    const handleSizeToggle = (size) => {
        setSelectedSizes((prevSelectedSizes) =>
            prevSelectedSizes.includes(size)
                ? prevSelectedSizes.filter((s) => s !== size)
                : [...prevSelectedSizes, size]
        );
    };

    const handleImagesChange = (e) => {
        const files = Array.from(e.target.files);
        const newImages = files.slice(0, 5 - images.length);
        setImages((prevImages) => [...prevImages, ...newImages]);
        const newPreviews = newImages.map((file) => URL.createObjectURL(file));
        setPreviews((prevPreviews) => [...prevPreviews, ...newPreviews]);
        if (images.length === 0) {
            setActiveIndex(0);
        }
    };

    const handleRemoveImage = () => {
        const updatedImages = images.filter((_, i) => i !== activeIndex);
        const updatedPreviews = previews.filter((_, i) => i !== activeIndex);
        setImages(updatedImages);
        setPreviews(updatedPreviews);
        setActiveIndex(0);
    };

    const handleImageClick = (index) => {
        setActiveIndex(index);
    };

    const handleTypeChange = (event) => {
        setType(event.target.value === "Одяг" ? "clothing" : "footwear");
    };

    const addColorToProduct = (color) => {
        setProductColors((prevColors) => [...prevColors, color]);
    };

    const removeColorFromProduct = (color) => {
        setProductColors((prevColors) => prevColors.filter((c) => c !== color));
    };

    const handleCustomColorChange = (e) => {
        setCustomColor(e.target.value);
    };

    const handleAddCustomColor = () => {
        if (!productColors.includes(customColor)) {
            addColorToProduct(customColor);
        }
    };

    const handleCharacteristicChange = (e) => {
        const { name, value } = e.target;
        setNewCharacteristic((prev) => ({ ...prev, [name]: value }));
    };

    const addCharacteristic = () => {
        if (newCharacteristic.key && newCharacteristic.value) {
            setCharacteristics((prev) => [...prev, newCharacteristic]);
            setNewCharacteristic({ key: '', value: '' });
        }
    };

    const removeCharacteristic = (index) => {
        setCharacteristics((prev) => prev.filter((_, i) => i !== index));
    };

    const handleCustomValueChange = (key, value) => {
        console.log(key, value)
        setCustomValues((prevValues) => ({
            ...prevValues,
            [key]: value
        }));
    };

    async function handleSubmit(e) {
        e.preventDefault();
        const formData = new FormData();

        console.log('title:', e.target.title.value);
        formData.append('title', e.target.title.value);

        console.log('articul:', e.target.articul.value);
        formData.append('articul', e.target.articul.value);

        console.log('code:', e.target.code.value);
        formData.append('code', e.target.code.value);

        console.log('description:', e.target.description.value);
        formData.append('description', e.target.description.value);

        console.log('price:', e.target.price.value);
        formData.append('price', e.target.price.value);

        console.log('category:', customValues.category);
        formData.append('category', customValues.category);

        console.log('material:', customValues.material);
        formData.append('material', customValues.material);

        console.log('brand:', customValues.brand);
        formData.append('brand', customValues.brand);

        console.log('age:', customValues.age);
        formData.append('age', customValues.age);

        console.log('type:', customValues.type);
        formData.append('type', customValues.type);

        console.log('discount:', e.target.discount.value);
        formData.append('discount', e.target.discount.value);

        console.log('has_sizes:', isSizeChecked);
        formData.append("has_sizes", isSizeChecked);

        console.log('has_table:', isSizeTableChecked);
        formData.append("has_table", isSizeTableChecked);

        console.log('table.category:', type);
        formData.append("table.category", type);


        selectedSizes.forEach((size) => formData.append('size_value', size));
        productColors.forEach((color) => formData.append('colors', color));
        characteristics.forEach((characteristic) => {
            formData.append('characteristic_key', characteristic.key);
            formData.append('characteristic_value', characteristic.value);
        });
        images.forEach((image) => formData.append('images', image));

        try {
            const status = await CreateProductFetch(formData);

            if (status === 200) {
                window.location.reload();
                setShowMessage(true);

                setTimeout(() => {
                    setShowMessage(false);
                }, 3000);
            } else if (status === 400) {
                console.error("Error: Bad Request");
            } else if (status === 500) {
                console.error("Server error occurred");
            } else {
                console.error("Unexpected error occurred");
            }
        } catch (error) {
            console.error("Error during the request:", error);
        }
    }

    return (
        <form onSubmit={handleSubmit} className="create-product">
            {showMessage && (
                <div className="successful-creating-order-message">
                    Товар успішно створено!
                </div>
            )}
            <div className="create-product__image">
                <div className="upload-images">
                    <input
                        type="file"
                        accept="image/*"
                        multiple
                        onChange={handleImagesChange}
                        required
                    />
                </div>

                <div className="active-image">
                    {previews.length > 0 && (
                        <article className="active-image-wrapper">
                            <img src={previews[activeIndex]} alt="Active Preview" className="large-image"/>
                            <img src={Trash || ""} alt="remove" className="delete-active-image"
                                 onClick={handleRemoveImage} style={{cursor: "pointer"}}/>
                        </article>
                    )}
                </div>

                <div className="images-preview">
                    {previews.length > 0 && previews.map((preview, index) => (
                        <div key={index} className="thumbnail-wrapper">
                            <img
                                src={preview}
                                alt={`Preview ${index + 1}`}
                                className={`thumbnail-image ${index === activeIndex ? "active" : ""}`}
                                onClick={() => handleImageClick(index)}
                                style={{cursor: "pointer"}}
                            />
                        </div>
                    ))}
                </div>
            </div>

            <div className="create-product__inputs">
                <input
                    type="text"
                    name="title"
                    required
                    className="create-product__input"
                    placeholder="*Назва товару"
                />
                <textarea
                    name="description"
                    required
                    className="create-product__input create-product__textarea"
                    placeholder="*Опис товару"
                />
                <article>
                    <div>
                        <CustomInput
                            label="*Виберіть матеріал"
                            options={materials}
                            value={customValues.material}
                            onChange={(value) => handleCustomValueChange('material', value)}
                        />
                    </div>

                    <select
                        id="age"
                        value={customValues.age}
                        onChange={(e) => handleCustomValueChange('age', e.target.value)}
                        className='create-product__input'
                    >
                        <option value="" disabled selected>
                            *Виберіть вік
                        </option>
                        {ages.map((age) => (
                            <option key={age.value} value={age.value}>
                                {age.labelUA}
                            </option>
                        ))}
                    </select>

                    <select
                        aria-placeholder="saasd"
                        id="category"
                        value={customValues.category}
                        onChange={(e) => handleCustomValueChange('category', e.target.value)}
                        className='create-product__input'
                    >
                        <option value="" disabled selected>
                            *Виберіть категорію
                        </option>
                        {categories.map((category) => (
                            <option key={category.value} value={category.value}>
                                {category.labelUA}
                            </option>
                        ))}
                    </select>


                    <div>
                        <CustomInput
                            label="Виберіть бренд"
                            options={brands}
                            value={customValues.brand}
                            onChange={(value) => handleCustomValueChange('brand', value)}
                        />
                    </div>

                    <div>
                        <CustomInput
                            label="Виберіть тип"
                            options={types}
                            value={customValues.type}
                            onChange={(value) => handleCustomValueChange('type', value)}
                        />
                    </div>
                </article>

                <article>
                    <input
                        type="text"
                        name="articul"
                        className="create-product__input"
                        placeholder="Артикул"
                    />
                    <input
                        type="text"
                        name="code"
                        className="create-product__input"
                        placeholder="Код"
                    />
                </article>
                <article>
                    <input
                        type="text"
                        name="price"
                        required
                        className="create-product__input"
                        placeholder="*Ціна без знижки"
                    />
                    <input
                        type="text"
                        name="discount"
                        className="create-product__input"
                        placeholder="Ціна зі знижкою"
                    />
                </article>
            </div>

            <div className="create-product__sizes">
                <input
                    type="checkbox"
                    checked={isSizeChecked}
                    onChange={handleSizeCheckboxChange}
                />
                Є розміри
                <article className={`create-product__sizes-content ${!isSizeChecked ? "block" : ""}`}>
                    <div className="create-product__type">
                        <label>
                            <input
                                type="radio"
                                name="type"
                                value="Одяг"
                                required={isSizeChecked}
                                checked={type === "clothing"}
                                onChange={handleTypeChange}
                            />
                            Одяг
                        </label>
                        <label>
                            <input
                                type="radio"
                                name="type"
                                value="Взуття"
                                required={isSizeChecked}
                                checked={type === "footwear"}
                                onChange={handleTypeChange}
                            />
                            Взуття
                        </label>
                    </div>
                    <div className="create-product__sizes-list">
                        {sizes.map((size) => (
                            <article
                                key={size}
                                className="create-product__size-item"
                                onClick={() => handleSizeToggle(size)}
                                style={{opacity: selectedSizes.includes(size) ? 1 : 0.3, cursor: "pointer"}}
                            >
                                {size}
                            </article>
                        ))}
                    </div>
                    <input
                        type="checkbox"
                        className="create-product__size-table-checkbox"
                        checked={isSizeTableChecked}
                        onChange={handleSizeTableChange}
                    />
                    Розмірна сітка
                </article>
            </div>

            <div className="create-product__colors">
                <input
                    type="checkbox"
                    checked={isColorChecked}
                    onChange={handleColorCheckboxChange}
                />
                Є кольори
                <article className={`create-product__color-content ${!isColorChecked ? "block" : ""}`}>
                    <div>
                        <p>Кольори товару:</p>
                        <div className="create-product__color-selected">
                            {productColors.length > 0 ? (
                                productColors.map((color, index) => (
                                    <div
                                        key={index}
                                        className="create-product__color-block"
                                        style={{backgroundColor: color}}
                                        onClick={() => removeColorFromProduct(color)}
                                    ></div>
                                ))
                            ) : (
                                <p className="create-product__no-colors-text">- Немає кольорів</p>
                            )}
                        </div>
                    </div>

                    <div className="create-product__ordinary-colors">
                        <p>Звичайні кольори товарів:</p>
                        <div className="create-product__color-available">
                            {availableColors.map((color, index) => (
                                <div
                                    key={index}
                                    className="create-product__color-block"
                                    style={{backgroundColor: color}}
                                    onClick={() => addColorToProduct(color)}
                                ></div>
                            ))}
                        </div>
                    </div>

                    <div className="create-product__custom-color">
                        <p>Виберіть свій колір:</p>
                        <input
                            type="color"
                            value={customColor}
                            onChange={handleCustomColorChange}
                            className="create-product__custom-color-input"
                        />
                        <button onClick={handleAddCustomColor} className="create-product__custom-color-btn">Применить
                        </button>
                    </div>
                </article>
            </div>
            <div className="create-product__characteristics">
                <h1 className="create-product__characteristics-h1">Характеристики</h1>
                <div className="characteristics-list">
                    {characteristics.map((char, index) => (
                        <div key={index} className="characteristic-item">
                            <span>{char.key} - {char.value}</span>
                            <p onClick={() => removeCharacteristic(index)}>Видалити</p>
                        </div>
                    ))}
                </div>
                <div className="add-characteristic">
                    <input
                        type="text"
                        name="key"
                        value={newCharacteristic.key}
                        onChange={handleCharacteristicChange}
                        placeholder="Тип"
                    />
                    <input
                        type="text"
                        name="value"
                        value={newCharacteristic.value}
                        onChange={handleCharacteristicChange}
                        placeholder="Значення"
                    />
                    <div onClick={addCharacteristic} className="add-characteristic-btn">Добавити характеристику</div>
                </div>
            </div>
            <button type="submit" className="create-product-button">Створити товар</button>
        </form>
    );
};

export default CreateProduct;
