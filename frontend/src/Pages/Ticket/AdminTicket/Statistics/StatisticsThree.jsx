import React, { useEffect, useState } from 'react';
import { PieChart, Pie, Cell, Tooltip, Legend } from 'recharts';
import { axiosSecure } from '../../../../api/axios';

const StatisticsThree = () => {
    const [ticketData, setTicketData] = useState([]);
    const [priorityData, setPriorityData] = useState([]);
    const COLORS = ['#f4621a', '#59548c', '#00C49F']; 

    useEffect(() => {
        const fetchTickets = async () => {
            try {
                const response = await axiosSecure.get('/ticket');
                setTicketData(response.data.tickets || []);
            } catch (err) {
                console.error('Error fetching tickets:', err);
            }
        };

        fetchTickets();
    }, []);

    useEffect(() => {
        const countPriorities = () => {
            const priorityCount = ticketData.reduce((acc, ticket) => {
                acc[ticket.priority] = (acc[ticket.priority] || 0) + 1;
                return acc;
            }, {});

            setPriorityData(Object.entries(priorityCount).map(([key, value]) => ({
                name: key,
                value,
            })));
        };

        if (ticketData.length > 0) {
            countPriorities();
        }
    }, [ticketData]);

    return (
        <div className='pie-design rounded-2'>
            <PieChart width={400} height={346}>
                <Pie
                    data={priorityData}
                    cx={200}
                    cy={200}
                    labelLine={false}
                    label={({ name, percent }) => `${name} (${(percent * 100).toFixed(0)}%)`}
                    outerRadius={80}
                    innerRadius={40} 
                    fill="#8884d8"
                    dataKey="value"
                >
                    {priorityData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
                <Tooltip />
                <Legend />
            </PieChart>
        </div>
    );
};

export default StatisticsThree;
