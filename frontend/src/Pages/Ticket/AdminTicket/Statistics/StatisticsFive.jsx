import React, { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend } from 'recharts';
import { axiosSecure } from '../../../../api/axios';

const StatisticsFive = () => {
    const [data, setData] = useState([]);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await axiosSecure.get('/ticket');
                const tickets = response.data.tickets || [];

                const counts = {};

                tickets.forEach(ticket => {
                    const date = new Date(ticket.createdAt).toDateString();
                    if (!counts[date]) {
                        counts[date] = { open: 0, inProgress: 0, done: 0 };
                    }

                    if (ticket.status === "Open") {
                        counts[date].open += 1;
                    } else if (ticket.status === "In-progress") {
                        counts[date].inProgress += 1;
                    } else if (ticket.status === "Done") {
                        counts[date].done += 1;
                    }
                });

                const dataArray = Object.entries(counts).map(([date, count]) => ({
                    date,
                    open: count.open,
                    inProgress: count.inProgress,
                    done: count.done,
                }));

                setData(dataArray);
            } catch (err) {
                console.error('Error fetching tickets:', err);
            }
        };

        fetchData();
    }, []);

    return (
        <div className='mt-4 line-chart-style text-white'>
            <h4 className='ms-5 pt-3'>Tickets Status Over Time</h4>
            <LineChart width={1600} height={240} data={data}
                margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
                <XAxis dataKey="date" stroke="#FFFFFF" /> 
                <YAxis stroke="#FFFFFF" /> 
                <CartesianGrid strokeDasharray="3 3" stroke="#FFFFFF" /> 
                <Tooltip />
                <Legend />
                <Line name="Open" type="monotone" dataKey="open" stroke="#FF0000" strokeWidth={3} /> 
                <Line name="In-progress" type="monotone" dataKey="inProgress" stroke="#FFA500" strokeWidth={3} /> 
                <Line name="Done" type="monotone" dataKey="done" stroke="#008000" strokeWidth={3} /> 
            </LineChart>
        </div>
    );
};

export default StatisticsFive;
