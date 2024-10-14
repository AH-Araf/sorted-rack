
import React from 'react';
import { Link } from 'react-router-dom';

const StackedMode = ({ filteredTickets, updateTicketStatus, getPriorityIcon }) => {
    return (
        <div className="ticket-container">
            {filteredTickets.map(ticket => (
                <div key={ticket._id} className="ticket-card card mb-1 ticket-box-hover">
                    <div className="">
                        <h4 className="card-title">{ticket.accessoriesType}</h4>
                        <p className="card-text"><strong>Department:</strong> {ticket.department}</p>
                        <p className="card-text"><strong>Status:</strong> {ticket.status}</p>
                        <small>
                            <strong>Created At: </strong>
                            {new Date(ticket.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })} <br />
                            {new Date(ticket.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                        </small>
                        <div className='mt-4 d-flex justify-content-between align-items-center'>
                            <div className='d-flex align-items-end gap-2'>
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
                            <p>{getPriorityIcon(ticket.priority)}</p>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

export default StackedMode;
