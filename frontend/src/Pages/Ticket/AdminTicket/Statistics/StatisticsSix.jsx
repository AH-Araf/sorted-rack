import React, { useEffect, useState } from 'react';
import { axiosSecure } from '../../../../api/axios';

const StatisticsSix = () => {
    const [archivedCount, setArchivedCount] = useState(0);
    const [unarchiveCount, setUnarchiveCount] = useState(0);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get('/ticket');
                const tickets = response.data.tickets || [];

                const archived = tickets.filter(ticket => ticket.archiveTicket === "true").length;
                const unarchive = tickets.filter(ticket => ticket.archiveTicket === "false").length;

                setArchivedCount(archived);
                setUnarchiveCount(unarchive);
            } catch (err) {
                console.error('Error fetching tickets:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='ms-3 archive-dashboard text-white p-4'>
            <h4 className='mb-4'>Archived & Unarchive</h4>
            <b>Archived Tickets: <span className='bg-danger px-2 rounded-2'>{archivedCount}</span></b> <br />
            <b>Unarchive Tickets: <span className='bg-success px-2 rounded-2'>{unarchiveCount}</span></b>
        </div>
    );
};

export default StatisticsSix;
