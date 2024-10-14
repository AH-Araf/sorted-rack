import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import LoaderCSS from '../../Common/LoaderCSS/LoaderCSS';
import { axiosSecure } from '../../../api/axios';


const GetUserTicket = () => {
    const [tickets, setTickets] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);
    const [statusFilter, setStatusFilter] = useState('');

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const userDetails = JSON.parse(localStorage.getItem('userDetails'));
                if (userDetails && userDetails.email) {
                    const response = await axiosSecure.get(`/ticket/user/${userDetails.email}`);
                    setTickets(response.data.tickets);
                } else {
                    setError('User details not available');
                }
            } catch (err) {
                console.error(err);
                setError('Failed to load tickets');
            } finally {
                setLoading(false);
            }
        };

        fetchTickets();
    }, []);

    const getStatusColor = (status) => {
        switch (status) {
            case 'Done':
                return 'blue';
            case 'In-progress':
                return 'orange';
            case 'Open':
                return 'red';
            default:
                return 'black';
        }
    };

    if (loading) return <LoaderCSS />;

    const filteredTickets = statusFilter
        ? tickets.filter(ticket => ticket.status === statusFilter)
        : tickets;

    return (
        <div className='m-4'>
            <div className='d-flex justify-content-between'>
                <h2>Your Tickets</h2>

                <div>
                    <select
                        className='form-select'
                        value={statusFilter}
                        onChange={(e) => setStatusFilter(e.target.value)}
                    >
                        <option value=''>All Statuses</option>
                        <option value='Open'>Open</option>
                        <option value='In-progress'>In-progress</option>
                        <option value='Done'>Done</option>
                    </select>
                </div>
            </div>

            {error && <div className="alert alert-danger">{error}</div>}
            <div className="ticket-container">
                {filteredTickets.length > 0 ? (
                    filteredTickets.map(ticket => (
                        <div key={ticket._id} className="ticket-card card mb-1 ticket-box-hover">
                            <div>
                            
                                <h4 className="card-title">{ticket.accessoriesType}</h4>
                                <p className="card-text"><strong>Department:</strong> {ticket.department}</p>
                                <p className="card-text"><strong>Priority:</strong> {ticket.priority}</p>
                                <small>
                                    <strong>Created At: </strong>
                                    {new Date(ticket.createdAt).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', second: '2-digit', hour12: true })} <br />
                                    {new Date(ticket.createdAt).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}
                                </small>
                                <div className='mt-4 d-flex justify-content-between align-items-center'>
                                    <div className='d-flex align-items-end gap-2'>
                                        <Link to={`/userTicketPart/details/${ticket._id}`} replace>
                                            <i className="bi bi-eye-fill text-dark" title="View Details"></i>
                                        </Link>
                                        <small><i className="bi bi-chat-left-text"></i> <b>{ticket.comments.length}</b></small>
                                    </div>
                                    <b>• <small><span style={{ color: getStatusColor(ticket.status) }}>
                                        {ticket.status}
                                    </span></small></b>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div>No Tickets Found</div>
                )}
            </div>
        </div>
    );
};

export default GetUserTicket; 
