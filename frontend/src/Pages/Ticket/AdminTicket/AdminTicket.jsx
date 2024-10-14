import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { axiosSecure } from '../../../api/axios';
import Swal from 'sweetalert2';
import './AdminTicket.scss';
import LoaderCSS from '../../Common/LoaderCSS/LoaderCSS';
import ListMode from './ViewMode/ListMode';
import StackedMode from './ViewMode/StackedMode';

const AdminTicket = () => {
  const [tickets, setTickets] = useState([]);
  const [filteredTickets, setFilteredTickets] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [viewMode, setViewMode] = useState('list');
  const [priorityFilter, setPriorityFilter] = useState('');
  const [departmentFilter, setDepartmentFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  useEffect(() => {
    const fetchTickets = async () => {
      try {
        const response = await axiosSecure.get('/ticket');
        const activeTickets = response.data.tickets.filter(ticket => ticket.archiveTicket === "false");
        setTickets(activeTickets);
        setFilteredTickets(activeTickets);
      } catch (err) {
        setError('Error fetching tickets');
      } finally {
        setLoading(false);
      }
    };

    fetchTickets();
  }, []);

  const updateTicketStatus = async (id, newStatus) => {
    try {
      await axiosSecure.patch(`/ticket/update-ticket/${id}`, { status: newStatus });
      setTickets(prevTickets =>
        prevTickets.map(ticket =>
          ticket._id === id ? { ...ticket, status: newStatus } : ticket
        )
      );
      Swal.fire('Success', `Status updated to ${newStatus}`, 'success');
    } catch (error) {
      Swal.fire('Error', 'Failed to update status', 'error');
    }
  };

  useEffect(() => {
    let newTickets = [...tickets];
    if (priorityFilter) {
      newTickets = newTickets.filter(ticket => ticket.priority === priorityFilter);
    }
    if (departmentFilter) {
      newTickets = newTickets.filter(ticket => ticket.department === departmentFilter);
    }
    if (statusFilter) {
      newTickets = newTickets.filter(ticket => ticket.status === statusFilter);
    }
    setFilteredTickets(newTickets);
  }, [priorityFilter, departmentFilter, statusFilter, tickets]);

  if (loading) return <div><LoaderCSS /></div>;
  if (error) return <div>{error}</div>;

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

  return (
    <div className='mx-4'>
      <div className='my-3 mb-4 d-flex justify-content-between'>
        <div className='d-flex align-items-start gap-2'>
          <h3>All Tickets</h3>

          <Link to='archiveTickets'>
            <button className='btn btn-secondary px-2'>
              <b>See Archive</b>
            </button>
          </Link>
        </div>

        <div className='d-flex align-items-center'>
          <div className='d-flex align-items-end gap-4 me-4'>
            <select className='form-select' value={priorityFilter} onChange={(e) => setPriorityFilter(e.target.value)}>
              <option value=''>All Priorities</option>
              <option value='High'>High</option>
              <option value='Medium'>Medium</option>
              <option value='Low'>Low</option>
            </select>
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
            <select className='form-select' value={statusFilter} onChange={(e) => setStatusFilter(e.target.value)}>
              <option value=''>All Statuses</option>
              <option value='Open'>Open</option>
              <option value='In-progress'>In-progress</option>
              <option value='Done'>Done</option>
            </select>
          </div>
          <button
            className={`btn ${viewMode === 'list' ? 'btn-primary' : 'btn-secondary'} me-1`}
            onClick={() => setViewMode('list')}
          >
            <i className="bi bi-border-width"></i>
          </button>
          <button
            className={`btn ${viewMode === 'stacked' ? 'btn-primary' : 'btn-secondary'} me-1`}
            onClick={() => setViewMode('stacked')}
          >
            <i className="bi bi-border-all"></i>
          </button>
          

        </div>

      </div>

      {viewMode === 'list' ? (
        filteredTickets.length > 0 ? (
          <ListMode filteredTickets={filteredTickets} updateTicketStatus={updateTicketStatus} getPriorityIcon={getPriorityIcon} />
        ) : (
          <div>No tickets found.</div>
        )
      ) : (
        filteredTickets.length > 0 ? (
          <StackedMode filteredTickets={filteredTickets} updateTicketStatus={updateTicketStatus} getPriorityIcon={getPriorityIcon} />
        ) : (
          <div>No tickets found.</div>
        )
      )}
    </div>
  );
};

export default AdminTicket;
