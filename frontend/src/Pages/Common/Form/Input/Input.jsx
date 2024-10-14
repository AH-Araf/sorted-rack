import React from 'react';

const Input = ({ label, id, type = "text", register, required, errors, placeholder = "" }) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <input
                type={type}
                id={id}
                className={`form-control ${errors ? 'is-invalid' : ''}`}
                placeholder={placeholder}
                {...register(id, { required })}
            />
            {errors && <div className="invalid-feedback">{label} is required</div>}
        </div>
    );
};

export default Input;
