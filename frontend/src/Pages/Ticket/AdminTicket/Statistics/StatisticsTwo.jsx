import React, { useEffect, useState } from 'react';
import { axiosSecure } from '../../../../api/axios';

const StatisticsTwo = () => {
    const [users, setUsers] = useState([]); 
    const [tickets, setTickets] = useState([]); 
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const fetchUserDetails = async () => {
        try {
            const response = await axiosSecure.get('/user', {
                headers: {
                    Authorization: `Bearer ${localStorage.userDetails && JSON.parse(localStorage.userDetails).token}`,
                },
            });
            setUsers(response.data.user || []); 
        } catch (err) {
            setError('Error fetching user details');
        }
    };

    const fetchTickets = async () => {
        try {
            const response = await axiosSecure.get('/ticket');
            setTickets(response.data.tickets || []); 
        } catch (err) {
            setError('Error fetching tickets');
        }
    };

    useEffect(() => {
        fetchUserDetails();
        fetchTickets();
        setLoading(false);
    }, []);

    return (
        <section>
            <div className='dashboard-users-design'>
                <div className='d-flex justify-content-between align-items-center gap-3'>
                    <h4>Total Users</h4>
                    <span className='bg-dark px-2 rounded-2'><i className="bi bi-people"></i></span>
                </div>
                <div>
                    {loading ? (
                        <p>Loading users...</p>
                    ) : error ? (
                        <p></p>
                    ) : (
                        <h2>{Array.isArray(users) ? users.length : 0}</h2> 
                    )}
                </div>
            </div>

            <div className='dashboard-tickets-design'>
                <div className='d-flex justify-content-between align-items-center gap-3'>
                    <h4>Total Tickets</h4>
                    <span className='bg-dark px-2 rounded-2'><i className="bi bi-ticket-perforated"></i></span>
                </div>
                <div>
                    {loading ? (
                        <p>Loading tickets...</p>
                    ) : error ? (
                        <p></p>
                    ) : (
                        <h2>{Array.isArray(tickets) ? tickets.length : 0}</h2>
                    )}
                </div>
            </div>
        </section>
    );
};

export default StatisticsTwo;
