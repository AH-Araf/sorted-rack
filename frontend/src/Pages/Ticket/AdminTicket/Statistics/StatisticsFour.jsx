import React, { useEffect, useState } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, Legend, CartesianGrid, LabelList, Cell } from 'recharts';
import { axiosSecure } from '../../../../api/axios';

const StatisticsFour = () => {
    const [ticketData, setTicketData] = useState([]);
    const [departmentData, setDepartmentData] = useState([]);

    const departments = [
        { value: 'Operations', label: 'Operations' },
        { value: 'Development', label: 'Development' },
        { value: 'Quality Assurance', label: 'Quality Assurance' },
        { value: 'Product Management', label: 'Product Management' },
        { value: 'Design', label: 'Design' },
        { value: 'Sales and Marketing', label: 'Sales and Marketing' },
        { value: 'Customer Support', label: 'Customer Support' },
        { value: 'Human Resources (HR)', label: 'Human Resources (HR)' }
    ];

    const COLORS = ['#f4621a', '#0088FE', '#00C49F', '#FFBB28', '#FF8042', '#58508D', '#FFC300', '#1B998B'];

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
        const countDepartments = () => {
            const departmentCount = departments.map(department => {
                const count = ticketData.filter(ticket => ticket.department === department.value).length;
                return { name: department.label, count };
            });
            setDepartmentData(departmentCount);
        };

        if (ticketData.length > 0) {
            countDepartments();
        }
    }, [ticketData]);

    return (
        <div className='pie-design bar-design rounded-2 ms-3'>
            <BarChart width={600} height={346} data={departmentData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    angle={-30}
                    textAnchor="end"
                    height={60}
                />
                <YAxis />
                <Tooltip />
                <Legend />
                <Bar dataKey="count" barSize={20}>
                    <LabelList dataKey="count" position="top" />
                    {departmentData.map((entry, index) => (
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Bar>
            </BarChart>
        </div>
    );
};

export default StatisticsFour;
