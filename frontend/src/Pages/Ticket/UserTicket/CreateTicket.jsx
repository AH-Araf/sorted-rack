import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import Input from '../../Common/Form/Input/Input';
import Select from '../../Common/Form/Select/Select';
import TextArea from '../../Common/Form/TextArea/TextArea';
import Swal from 'sweetalert2'; 
import './UserTicket.scss';
import { axiosSecure } from '../../../api/axios';

const CreateTicket = () => {
    const { register, handleSubmit, formState: { errors }, reset } = useForm();
    const [userDetails, setUserDetails] = useState({ email: '', userId: '', userName: '' });
console.log(userDetails);
    useEffect(() => {
        const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (storedUserDetails) {
            setUserDetails({
                email: storedUserDetails.email,
                userId: storedUserDetails.userId,
                userName: storedUserDetails.email.split('@')[0]
            });
        }
    }, []);

    const onSubmit = async (data) => {
        const ticketData = {
            ...data,
            userEmail: userDetails.email,
            userId: userDetails.userId,
            status: 'Open',
            archiveTicket: 'false',
        };

        try {
            const response = await axiosSecure.post("/ticket/post-new-ticket", ticketData);
            console.log("Ticket Created", response.data);

            Swal.fire({
                title: 'Success!',
                text: 'Your ticket has been created successfully.',
                icon: 'success',
                confirmButtonText: 'OK'
            });

            reset();
        } catch (error) {
            console.error("Error creating ticket", error);
            Swal.fire({
                title: 'Error!',
                text: 'There was a problem creating your ticket. Please try again.',
                icon: 'error',
                confirmButtonText: 'OK'
            });
        }
    };

    return (
        <div className="p-4 create-ticket-section">
            <div className='mb-5 d-flex justify-content-between'>
                <h2 className="">Create New Ticket</h2>
            </div>
            <form onSubmit={handleSubmit(onSubmit)} className="row g-4">
                <div className="col-md-12">
                    <Select
                        label="Accessories Type"
                        id="accessoriesType"
                        options={[
                            { value: 'Mouse', label: 'Mouse' },
                            { value: 'Monitor', label: 'Monitor' },
                            { value: 'Headphone', label: 'Headphone' },
                            { value: 'Keyboard', label: 'Keyboard' },
                            { value: 'USB Dongle', label: 'USB Dongle' },
                            { value: 'Laptop', label: 'Laptop' }
                        ]}
                        register={register}
                        required={true}
                        errors={errors.accessoriesType}
                    />
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>User Name</label>
                        <div className="input-like-box">{userDetails.userName}</div>
                        <input
                            type="hidden"
                            value={userDetails.userName}
                            {...register('name')}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <div className="form-group">
                        <label>Status</label>
                        <div className="input-like-box">Open</div>
                        <input
                            type="hidden"
                            value="Open"
                            {...register('status')}
                        />
                    </div>
                </div>

                <div className="col-md-6">
                    <Select
                        label="Priority"
                        id="priority"
                        options={[
                            { value: 'High', label: '🔴High' },
                            { value: 'Medium', label: '🟡Medium' },
                            { value: 'Low', label: '🟢Low' }
                        ]}
                        register={register}
                        required={true}
                        errors={errors.priority}
                    />
                </div>
                <div className="col-md-6">
                    <Select
                        label="Department"
                        id="department"
                        options={[
                            { value: 'Operations', label: 'Operations' },
                            { value: 'Development', label: 'Development' },
                            { value: 'Quality Assurance', label: 'Quality Assurance' },
                            { value: 'Product Management', label: 'Product Management' },
                            { value: 'Design', label: 'Design' },
                            { value: 'Sales and Marketing', label: 'Sales and Marketing' },
                            { value: 'Customer Support', label: 'Customer Support' },
                            { value: 'Human Resources (HR)', label: 'Human Resources (HR)' }
                        ]}
                        register={register}
                        required={true}
                        errors={errors.department}
                    />
                </div>
                
                <div className="col-md-12">
                    <TextArea
                        label="Description"
                        id="description"
                        register={register}
                        required={true}
                        errors={errors.description}
                    />
                </div>
                <div className="">
                    <button type="submit" className="btn btn-primary px-4">Create Ticket</button>
                </div>
            </form>
        </div>
    );
};

export default CreateTicket;
