 
const express = require("express");
const router = express.Router();
const { createTicket, getAllTickets, getTicketById, updateTicketById, deleteTicketById, addCommentToTicket, getTicketsByEmail } = require("../controllers/ticketController");

 
router.post("/post-new-ticket", createTicket);
router.get("/", getAllTickets);
router.get("/:id", getTicketById);
router.patch("/update-ticket/:id", updateTicketById);
router.delete("/delete-ticket/:id", deleteTicketById);
router.post("/:id/comment", addCommentToTicket);
router.get("/user/:email", getTicketsByEmail); 
module.exports = router;
