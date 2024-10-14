import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import './AdminTicket.scss';
import { axiosSecure } from "../../../api/axios";
import LoaderCSS from "../../Common/LoaderCSS/LoaderCSS";
import CommentSection from "../../../Common/Comment/Comment";
import Swal from 'sweetalert2';
import AssignProduct from "./AssignProduct";

const ViewFullTicket = () => {
    const { id } = useParams();
    const [ticket, setTicket] = useState(null);
    const [loading, setLoading] = useState(true);
    const [userDetails, setUserDetails] = useState(null);
    const [stock, setStock] = useState([]);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [assignModalVisible, setAssignModalVisible] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');

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
                userId: storedUserDetails.userId,
            });
        }
    }, []);

    useEffect(() => {
        const getAllStockDetails = async () => {
            try {
                const response = await axiosSecure.get('/product', {
                    headers: {
                        Authorization: `Bearer ${localStorage.userDetails &&
                            JSON.parse(localStorage.userDetails).token
                            }`,
                    },
                });
                setStock(response.data.products);
            } catch (err) {
                console.error(err);
            }
        };
        getAllStockDetails();
    }, []);

    const handleAssign = async (product) => {
        if (ticket.status === "Done") {
            Swal.fire('Already assigned', 'This ticket is already resolved.', 'info');
            return;
        }

        try {
            await axiosSecure.patch(`/assignedProduct/updateProducts/${product._id}`, {
                tag: "assigned",
                assignedUserEmail: ticket.userEmail
            });
            await axiosSecure.patch(`/ticket/update-ticket/${id}`, {
                status: "Done",
            });
            Swal.fire('Success', 'Product assigned and ticket updated successfully.', 'success');
            setStock(prevStock => prevStock.filter(prod => prod._id !== product._id));
            setSelectedProduct(null);
            setTicket(prevTicket => ({
                ...prevTicket,
                status: "Done"
            }));
            closeAssignModal();
        } catch (err) {
            console.error("Error assigning product:", err);
            Swal.fire('Error', 'Something went wrong while assigning.', 'error');
        }
    };

    const unassignedProducts = stock.filter(product => product.tag === "notassigned");
    const filteredUnassignedProducts = unassignedProducts.filter(product =>
    (product?.accessoriesName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product?.systemName?.toLowerCase().includes(searchTerm.toLowerCase()))
    );

    const openAssignModal = () => {
        setAssignModalVisible(true);
    };

    const closeAssignModal = () => {
        setAssignModalVisible(false);
        setSearchTerm('');
    };

    const handleCommentAdded = (updatedComments) => {
        setTicket({ ...ticket, comments: updatedComments });
    };

    const handleArchive = async () => {
        if (ticket.status !== "Done") {
            Swal.fire('Cannot Archive', 'This ticket is not done yet.', 'warning');
            return;
        }

        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You want to archive this ticket?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, archive it!',
            cancelButtonText: 'No, keep it'
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.patch(`/ticket/update-ticket/${id}`, {
                    archiveTicket: "true"
                });
                Swal.fire('Archived!', 'The ticket has been archived.', 'success');
                setTicket(prevTicket => ({
                    ...prevTicket,
                    archiveTicket: "true"
                }));
            } catch (err) {
                console.error("Error archiving ticket:", err);
                Swal.fire('Error', 'Something went wrong while archiving.', 'error');
            }
        }
    };

    const handleUnarchive = async () => {
        const result = await Swal.fire({
            title: 'Are you sure?',
            text: 'You want to unarchive this ticket?',
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes, unarchive it!',
            cancelButtonText: 'No, keep it archived'
        });

        if (result.isConfirmed) {
            try {
                await axiosSecure.patch(`/ticket/update-ticket/${id}`, {
                    archiveTicket: "false"
                });
                Swal.fire('Unarchived!', 'The ticket has been unarchived.', 'success');
                setTicket(prevTicket => ({
                    ...prevTicket,
                    archiveTicket: "false"
                }));
            } catch (err) {
                console.error("Error unarchiving ticket:", err);
                Swal.fire('Error', 'Something went wrong while unarchiving.', 'error');
            }
        }
    };

    if (loading) return <div><LoaderCSS /></div>;

    return (
        <div className="p-4">
            <h2 className="mb-5">Ticket Details</h2>
            {ticket ? (
                <div className="view-full-card">
                    <div className="d-flex justify-content-around">
                        <div className="view-full-card-half">
                            <div className="d-flex align-items-center gap-1">
                                <h3 className="card-title mb-3">{ticket.accessoriesType}</h3>
                                <b> <p className="text-white bg-dark rounded-1 px-1">{ticket.archiveTicket === "true" && "(archived)"}</p></b>
                            </div>
                            <p className="card-text"><strong>Description:</strong> {ticket.description}</p>
                            <p className="card-text"><strong>Priority:</strong> {ticket.priority}</p>
                            <p className="card-text"><strong>Department:</strong> {ticket.department}</p>
                            <p className="card-text"><strong>Status:</strong> {ticket.status}</p>
                            <p className="card-text"><strong>Created At:</strong> {new Date(ticket.createdAt).toLocaleString()}</p>
                            <div className="d-flex gap-2">
                                <Link to='/adminTicket' className="text-white text-decoration-none">
                                    <button className="btn btn-danger">
                                        <i className="bi bi-arrow-left"></i>
                                    </button>
                                </Link>
                                <button className="btn btn-info text-white" onClick={openAssignModal}>
                                    <b>Assign From Stock</b>
                                </button>
                                {ticket.archiveTicket === "true" ? (
                                    <button className="btn btn-secondary text-white" onClick={handleUnarchive}>
                                        <b>Unarchive</b>
                                    </button>
                                ) : (
                                    <button className="btn btn-secondary text-white" onClick={handleArchive}>
                                        <b>Archive</b>
                                    </button>
                                )}
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
                <p>No ticket found.</p>
            )}

            <AssignProduct
                assignModalVisible={assignModalVisible}
                filteredUnassignedProducts={filteredUnassignedProducts}
                closeAssignModal={closeAssignModal}
                searchTerm={searchTerm}
                setSearchTerm={setSearchTerm}
                handleAssign={handleAssign}
            />
        </div>
    );
};

export default ViewFullTicket;
