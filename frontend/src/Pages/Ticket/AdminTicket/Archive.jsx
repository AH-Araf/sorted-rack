import React, { useEffect, useState } from 'react';
import './AdminTicket.scss';
import LoaderCSS from '../../Common/LoaderCSS/LoaderCSS';
import { axiosSecure } from '../../../api/axios';
import Swal from 'sweetalert2';
import { Link } from 'react-router-dom';
import PaginationComponent from '../../../component/Pagination/Pagination';

const Archive = () => {
    const [unarchivedTickets, setUnarchivedTickets] = useState([]);
    const [filteredTickets, setFilteredTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [departmentFilter, setDepartmentFilter] = useState('');
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    useEffect(() => {
        const fetchUnarchivedTickets = async () => {
            try {
                const response = await axiosSecure.get('/ticket');
                const activeTickets = response.data.tickets.filter(ticket => ticket.archiveTicket === "true");
                setUnarchivedTickets(activeTickets);
                setFilteredTickets(activeTickets);
            } catch (err) {
                setError('Error fetching tickets');
            } finally {
                setLoading(false);
            }
        };

        fetchUnarchivedTickets();
    }, []);

    useEffect(() => {
        let newTickets = [...unarchivedTickets];
        if (departmentFilter) {
            newTickets = newTickets.filter(ticket => ticket.department === departmentFilter);
        }
        setFilteredTickets(newTickets);
    }, [departmentFilter, unarchivedTickets]);

    const indexOfLastTicket = currentPage * itemsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
    const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const handleUpdateStatus = (ticket) => {
        if (ticket.status === 'Done') {
            Swal.fire({
                icon: 'info',
                title: 'Ticket Already Done',
                text: 'This ticket is already done and archived. If you want to work on it again, please first unarchive it.',
            });
            return;
        }

        Swal.fire({
            title: 'Change Status',
            text: `Do you want to set the status of this ticket to "${ticket.status === 'In-progress' ? 'Done' : 'In-progress'}"?`,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonText: 'Yes',
            cancelButtonText: 'No'
        }).then((result) => {
            if (result.isConfirmed) {
                Swal.fire('Updated!', 'The ticket status has been updated.', 'success');
            }
        });
    };

    const getPriorityIcon = (priority) => {
        switch (priority) {
            case 'High':
                return '🔴 High';
            case 'Medium':
                return '🟡 Medium';
            case 'Low':
                return '🟢 Low';
            default:
                return priority;
        }
    };

    if (loading) return <div><LoaderCSS /></div>;
    if (error) return <div>{error}</div>;

    return (
        <div className='mx-4'>
            <div className='d-flex justify-content-between'>
                <h3 className='my-3'>Archive Tickets</h3>
                <div className='my-3 mb-4 d-flex justify-content-between'>
                    <select className='form-select' value={departmentFilter} onChange={(e) => setDepartmentFilter(e.target.value)}>
                        <option value=''>All Departments</option>
                        <option value='Operations'>Operations</option>
                        <option value='Development'>Development</option>
                        <option value='Quality Assurance'>Quality Assurance</option>
                        <option value='Product Management'>Product Management</option>
                        <option value='Design'>Design</option>
                        <option value='Sales and Marketing'>Sales and Marketing</option>
                        <option value='Customer Support'>Customer Support</option>
                        <option value='Human Resources (HR)'>Human Resources (HR)</option>
                    </select>
                </div>
            </div>

            {currentTickets.length > 0 ? (
                <table className="table table-hover">
                    <thead className="thead-dark">
                        <tr>
                            <th className="text-start">Accessories Type</th>
                            <th className="text-start">Department</th>
                            <th className="text-start">Status</th>
                            <th className="text-start">Created At</th>
                            <th className="text-start">Priority</th>
                            <th className="text-start">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {currentTickets.map(ticket => (
                            <tr key={ticket._id}>
                                <td className="text-start py-3"><b>{ticket.accessoriesType}</b></td>
                                <td className="text-start">{ticket.department}</td>
                                <td className="text-start">{ticket.status}</td>
                                <td className="text-start">
                                    <small>
                                        {new Date(ticket.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })}<br />
                                        {new Date(ticket.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                    </small>
                                </td>
                                <td className="text-start">{getPriorityIcon(ticket.priority)}</td>
                                <td className="text-start">
                                    <div className='d-flex align-items-end gap-4'>
                                        <Link to={`/adminTicket/details/${ticket._id}`} replace>
                                            <i className="bi bi-eye-fill text-dark" title="View Details"></i>
                                        </Link>
                                        <i
                                            className="bi bi-sort-up"
                                            role="button"
                                            title="Set to In-progress"
                                            onClick={() => handleUpdateStatus(ticket)}
                                        ></i>
                                        <i
                                            className={`bi bi-check-all ${ticket.status === 'Done' ? 'text-primary' : 'text-muted'}`}
                                            role="button"
                                            title={ticket.status === 'Done' ? "Already Done" : "Set to Done"}
                                            onClick={() => handleUpdateStatus(ticket)}
                                        ></i>
                                        <small><i className="bi bi-chat-left-text"></i> <b>{ticket.comments.length}</b></small>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            ) : (
                <div>No Archived tickets found.</div>
            )}

            <div className='d-flex justify-content-end'>
                <PaginationComponent
                    total={filteredTickets.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={setCurrentPage}
                />
            </div>
        </div>
    );
};

export default Archive;
