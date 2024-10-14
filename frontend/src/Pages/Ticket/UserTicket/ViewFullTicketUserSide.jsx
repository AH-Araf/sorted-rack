import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import Swal from "sweetalert2";
import '../AdminTicket/AdminTicket.scss';
import { axiosSecure } from "../../../api/axios";
import LoaderCSS from "../../Common/LoaderCSS/LoaderCSS";
import "./UserTicket.scss"
import UpdateTicket from "./UpdateTicket";
import CommentSection from "../../../Common/Comment/Comment";


const ViewFullTicketUserSide = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [editModalVisible, setEditModalVisible] = useState(false);
    const [editAccessoriesType, setEditAccessoriesType] = useState('');


    const [editDescription, setEditDescription] = useState('');
    const [editPriority, setEditPriority] = useState('');
    const [editDepartment, setEditDepartment] = useState('');

    useEffect(() => {
        const fetchTicket = async () => {
            try {
                const response = await axiosSecure.get(`/ticket/${id}`);
                setTicket(response.data.ticket);
            } catch (err) {
                console.log(err);
            } finally {
                setLoading(false);
            }
        };

        fetchTicket();
    }, [id]);

    useEffect(() => {
        const storedUserDetails = JSON.parse(localStorage.getItem('userDetails'));
        if (storedUserDetails) {
            setUserDetails({
                email: storedUserDetails.email,
                userId: storedUserDetails.userId
            });
        }
    }, []);

    

    const handleDelete = async () => {
        if (ticket.status !== "Open") {
            Swal.fire({
                icon: 'error',
                title: 'Cannot Delete',
                text: `Ticket is ${ticket.status}. You cannot delete this ticket.`,
            });
            return;
        }

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: "You won't be able to revert this!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, delete it!',
            cancelButtonText: 'No, cancel!',
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.delete(`/ticket/delete-ticket/${id}`);
                Swal.fire(
                    'Deleted!',
                    'Your ticket has been deleted.',
                    'success'
                ).then(() => {
                    window.location.href = "/userTicketPart";
                });
            } catch (err) {
                Swal.fire(
                    'Error!',
                    'There was a problem deleting the ticket.',
                    'error'
                );
            }
        }
    };

    const openEditModal = () => {
        if (ticket.status === "Open") {
            setEditAccessoriesType(ticket.accessoriesType);
            setEditDescription(ticket.description);
            setEditPriority(ticket.priority);
            setEditDepartment(ticket.department);
            setEditModalVisible(true);
        } else {
            Swal.fire({
                icon: 'error',
                title: 'Cannot Edit',
                text: `Ticket is ${ticket.status}. You cannot update the ticket.`,
            });
        }
    };

    const handleUpdate = async () => {
        const updatedData = {
            accessoriesType: editAccessoriesType,
            description: editDescription,
            priority: editPriority,
            department: editDepartment,
        };

        try {
            const response = await axiosSecure.patch(`/ticket/update-ticket/${id}`, updatedData);
            setTicket(response.data.ticket);
            setEditModalVisible(false);
            Swal.fire({
                icon: 'success',
                title: 'Updated!',
                text: 'Ticket updated successfully.',
            }).then(() => {
                <LoaderCSS />
            })
                .then(() => {
                    window.location.reload();
                });
        } catch (err) {
            Swal.fire({
                icon: 'error',
                title: 'Error',
                text: 'Error updating ticket.',
            });
        }
    };

    const handleCommentAdded = (updatedComments) => {
        setTicket({ ...ticket, comments: updatedComments });
    };

    if (loading) return <div><LoaderCSS /></div>;

    return (
        <div className="p-4">
            <h2 className="mb-5">Ticket Details</h2>
            {ticket ? (
                <div className="view-full-card">
                    <div className="d-flex justify-content-around">
                        <div className="view-full-card-half">
                            <h3 className="card-title mb-3">{ticket.accessoriesType}</h3>
                            <p className="card-text"><strong>Description:</strong> {ticket.description}</p>
                            <p className="card-text"><strong>Priority:</strong> {ticket.priority}</p>
                            <p className="card-text"><strong>Department:</strong> {ticket.department}</p>
                            <p className="card-text"><strong>Status:</strong> {ticket.status}</p>
                            <p className="card-text"><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
                            <div>
                                <button className="btn btn-primary mt-2 me-2" data-toggle="tooltip" data-placement="left" title="Exit">
                                    <Link to='/userTicketPart' className="text-white text-decoration-none">
                                        <i className="bi bi-arrow-left"></i>
                                    </Link>
                                </button>

                                <button
                                    className="btn btn-success mt-2 me-2"
                                    data-toggle="tooltip"
                                    data-placement="left"
                                    title="Edit"
                                    onClick={openEditModal}
                                >
                                    <i className="bi bi-pencil-square"></i>
                                </button>

                                <button
                                    className="btn btn-danger mt-2"
                                    data-toggle="tooltip"
                                    data-placement="left"
                                    title="Delete"
                                    onClick={handleDelete}
                                >
                                    <i className="bi bi-trash"></i>
                                </button>
                            </div>
                        </div>

                        <CommentSection
                            ticketId={id}
                            comments={ticket.comments}
                            userEmail={userDetails.email}
                            onCommentAdded={handleCommentAdded}
                        />
                        
                    </div>
                </div>
            ) : (
                <p></p>
            )}

            <UpdateTicket
                editModalVisible={editModalVisible}
                setEditModalVisible={setEditModalVisible}
                editAccessoriesType={editAccessoriesType}
                setEditAccessoriesType={setEditAccessoriesType}
                editDescription={editDescription}
                setEditDescription={setEditDescription}
                editPriority={editPriority}
                setEditPriority={setEditPriority}
                editDepartment={editDepartment}
                setEditDepartment={setEditDepartment}
                handleUpdate={handleUpdate}
            />
            

        </div>
    );
};

export default ViewFullTicketUserSide;
