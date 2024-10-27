import React, { useEffect, useRef, useState } from "react";

const RangeSlider = ({ classes, isShowTooltip = false, max, min, onChange, step, value }) => {
    const [minValue, setMinValue] = useState(value[0]);
    const [maxValue, setMaxValue] = useState(value[1]);
    const trackRef = useRef(null);
    const minInputRef = useRef(null);
    const maxInputRef = useRef(null);
    const zIndexMin = "10";
    const zIndexMax = "20";

    useEffect(() => {
        if (trackRef.current) {
            const minLeft = `${((minValue - min) / (max - min)) * 100}%`;
            const maxRight = `${((max - maxValue) / (max - min)) * 100}%`;
            trackRef.current.style.left = minLeft;
            trackRef.current.style.right = maxRight;
        }
    }, [max, maxValue, min, minValue]);

    const handleChangeMin = (event) => {
        if (minInputRef.current && maxInputRef.current) {
            minInputRef.current.style.zIndex = zIndexMax;
            maxInputRef.current.style.zIndex = zIndexMin;
        }
        const value = Number(event.target.value);
        if (value <= maxValue) {
            setMinValue(value);
            onChange?.([value, maxValue]);
        }
    };

    const handleChangeMax = (event) => {
        if (minInputRef.current && maxInputRef.current) {
            minInputRef.current.style.zIndex = zIndexMin;
            maxInputRef.current.style.zIndex = zIndexMax;
        }
        const value = Number(event.target.value);
        if (value >= minValue) {
            setMaxValue(value);
            onChange?.([minValue, value]);
        }
    };

    return (
        <div className={`RangeSlider ${classes?.root}`}>
            <div className="RangeSlider-Slider">
                <div className="RangeSlider-Slider-Track" ref={trackRef}></div>
                <input
                    className="RangeSlider-Slider-Input RangeSlider-Slider-Input-Min"
                    max={max}
                    min={min}
                    name="min"
                    onChange={handleChangeMin}
                    ref={minInputRef}
                    step={step}
                    type="range"
                    value={minValue}
                />
                <input
                    className="RangeSlider-Slider-Input RangeSlider-Slider-Input-Max"
                    max={max}
                    min={min}
                    name="max"
                    onChange={handleChangeMax}
                    ref={maxInputRef}
                    step={step}
                    type="range"
                    value={maxValue}
                />
            </div>
        </div>
    );
};

export default React.memo(RangeSlider);
