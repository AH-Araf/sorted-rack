import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { axiosSecure } from '../../../api/axios';

const Ai = () => {
    const [tickets, setTickets] = useState([]);

    useEffect(() => {
        const fetchAndAnalyzeTickets = async () => {
            try {
                const response = await axiosSecure.get('/ticket');
                const openTickets = response.data.tickets.filter(ticket =>
                    ["Open", "In-progress"].includes(ticket.status)
                );

                const analyzedTickets = await Promise.all(openTickets.map(async (ticket) => {
                    const urgencyScore = await analyzeDescription(ticket.description);
                    return { ...ticket, urgencyScore };
                }));

                const sortedTickets = analyzedTickets.sort((a, b) => b.urgencyScore - a.urgencyScore);
                setTickets(sortedTickets);

            } catch (error) {
                console.error('Error fetching or analyzing tickets:', error);
            }
        };

        fetchAndAnalyzeTickets();
    }, []);

    const analyzeDescription = async (description) => {
        try {
            const response = await axios.post('/analyze', { text: description });
            return response.data.urgencyScore;
        } catch (error) {
            console.error('Error analyzing description:', error);
            return 0;
        }
    };

    return (
        <div>
            <h1>Tickets</h1>
            <ul>
                {tickets.map((ticket) => (
                    <li key={ticket._id}>
                        <strong>Description:</strong> {ticket.description} <br />
                        <strong>Status:</strong> {ticket.status} <br />
                        <strong>Urgency Score:</strong> {ticket.urgencyScore}
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default Ai;
