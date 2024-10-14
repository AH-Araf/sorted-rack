import React from 'react';

const Select = ({ label, id, options, register, required, errors }) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <select
                id={id}
                className={`form-select ${errors ? 'is-invalid' : ''}`}
                {...register(id, { required })}
            >
                <option value="">Select {label}</option>
                {options.map((option) => (
                    <option key={option.value} value={option.value}>{option.label}</option>
                ))}
            </select>
            {errors && <div className="invalid-feedback">{label} is required</div>}
        </div>
    );
};

export default Select;
