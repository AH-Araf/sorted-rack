const Ticket = require("../models/ticketModels");

const createTicketService = async (ticketData) => {
    return await Ticket.create(ticketData);
}; 
 
const getAllTicketsService = async () => {
    return await Ticket.find().sort({ createdAt: -1 });
};

const getTicketByIdService = async (id) => {
    return await Ticket.findById(id);
};

const updateTicketByIdService = async (id, updatedData) => {
    return await Ticket.findByIdAndUpdate(id, updatedData, { new: true }); 
};

const deleteTicketByIdService = async (id) => {
    return await Ticket.findByIdAndDelete(id);
};

const addCommentToTicketService = async (ticketId, commentData) => {
    return await Ticket.findByIdAndUpdate(
        ticketId,
        { $push: { comments: commentData }, updatedAt: Date.now() },
        { new: true }
    );
};

const getTicketsByEmailService = async (email) => {
    return await Ticket.find({ userEmail: email }).sort({ createdAt: -1 });
};


module.exports = {
    createTicketService,
    getAllTicketsService,
    getTicketByIdService,
    updateTicketByIdService,
    deleteTicketByIdService,
    addCommentToTicketService,
    getTicketsByEmailService,
};
