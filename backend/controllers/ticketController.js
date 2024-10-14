
const ticketService = require("../service/ticketService");
const { StatusCodes } = require("http-status-codes");
  
const createTicket = async (req, res) => {
    const ticketData = req.body;
    const ticket = await ticketService.createTicketService(ticketData);
    res.status(StatusCodes.CREATED).json({ ticket });
};

const getAllTickets = async (req, res) => {
    const tickets = await ticketService.getAllTicketsService();
    res.status(StatusCodes.OK).json({ tickets });
};

const getTicketById = async (req, res) => {
    const { id } = req.params;
    const ticket = await ticketService.getTicketByIdService(id);
    if (!ticket) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Ticket not found" });
    }
    res.status(StatusCodes.OK).json({ ticket });
};

const updateTicketById = async (req, res) => {
    const { id } = req.params;
    const updatedData = req.body;

    const updatedTicket = await ticketService.updateTicketByIdService(id, updatedData);
    if (!updatedTicket) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Ticket not found" });
    }
    res.status(StatusCodes.OK).json({ updatedTicket });
};

const deleteTicketById = async (req, res) => {
    const { id } = req.params;
    const ticket = await ticketService.deleteTicketByIdService(id);

    if (!ticket) {
        return res.status(StatusCodes.NOT_FOUND).json({ msg: "Ticket not found" });
    }

    res.status(StatusCodes.OK).json({ msg: "Successfully deleted" });
};

const addCommentToTicket = async (req, res) => {
    const { id } = req.params;
    const commentData = req.body;

    try {
        const updatedTicket = await ticketService.addCommentToTicketService(id, commentData);
        if (!updatedTicket) {
            return res.status(StatusCodes.NOT_FOUND).json({ msg: "Ticket not found" });
        }
        res.status(StatusCodes.OK).json({ ticket: updatedTicket });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error adding comment" });
    }
};

const getTicketsByEmail = async (req, res) => {
    const { email } = req.params;
    try {
        const tickets = await ticketService.getTicketsByEmailService(email);
        res.status(StatusCodes.OK).json({ tickets });
    } catch (error) {
        res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ msg: "Error fetching tickets" });
    }
};



module.exports = {
    createTicket,
    getAllTickets,
    getTicketById,
    updateTicketById,
    deleteTicketById,
    addCommentToTicket,
    getTicketsByEmail,
};
