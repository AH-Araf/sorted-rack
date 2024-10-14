
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import PaginationComponent from '../../../../component/Pagination/Pagination';

const ListMode = ({ filteredTickets, updateTicketStatus, getPriorityIcon }) => {
    const [currentPage, setCurrentPage] = useState(1);
    const itemsPerPage = 10;

    const indexOfLastTicket = currentPage * itemsPerPage;
    const indexOfFirstTicket = indexOfLastTicket - itemsPerPage;
    const currentTickets = filteredTickets.slice(indexOfFirstTicket, indexOfLastTicket);

    const handlePageChange = (pageNumber) => {
        setCurrentPage(pageNumber);
    };

    return (
        <>
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
                                        onClick={() => updateTicketStatus(ticket._id, 'In-progress')}
                                    ></i>
                                    <i
                                        className={`bi bi-check-all ${ticket.status === 'Done' ? 'text-primary' : 'text-muted'}`}
                                        role="button"
                                        title={ticket.status === 'Done' ? "Already Done" : "Set to Done"}
                                        onClick={() => {
                                            if (ticket.status !== 'Done') {
                                                updateTicketStatus(ticket._id, 'Done');
                                            }
                                        }}
                                    ></i>
                                    <small><i className="bi bi-chat-left-text"></i> <b>{ticket.comments.length}</b></small>
                                </div>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <div className='d-flex justify-content-end'>
                <PaginationComponent
                    total={filteredTickets.length}
                    itemsPerPage={itemsPerPage}
                    currentPage={currentPage}
                    onPageChange={handlePageChange}
                />
            </div>
        </>
    );
};

export default ListMode;
