import React from 'react';

const TextArea = ({ label, id, register, required, errors }) => {
    return (
        <div className="mb-3">
            <label htmlFor={id} className="form-label">{label}</label>
            <textarea
                id={id}
                className={`form-control ${errors ? 'is-invalid' : ''}`}
                {...register(id, { required })}
            />
            {errors && <div className="invalid-feedback">{label} is required</div>}
        </div>
    );
};

export default TextArea;
