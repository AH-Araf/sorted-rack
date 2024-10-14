const mongoose = require("mongoose");
 
const commentSchema = new mongoose.Schema({
    userEmail: { type: String, required: true },
    text: { type: String, required: true },
    timestamp: { type: Date, default: Date.now },
}); 


const ticketSchema = new mongoose.Schema({
    accessoriesType: { type: String, required: true },
    description: { type: String, required: true },
    priority: { type: String, required: true },
    userEmail: { type: String, required: true },
    userId: { type: mongoose.Schema.Types.ObjectId, required: true },
    department: { type: String, required: true },
    status: { type: String, required: true },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date, default: Date.now },
    archiveTicket: { type: String, required: true },
    comments: [commentSchema],
});

module.exports = mongoose.model("Ticket", ticketSchema);

// const mongoose = require("mongoose");

// const commentSchema = new mongoose.Schema({
//   userEmail: { type: String, required: true },
//   text: { type: String, required: true },
//   timestamp: { type: Date, default: Date.now },
// });

// const ticketSchema = new mongoose.Schema({
//   title: { type: String, required: true },
//   description: { type: String, required: true },
//   priority: { type: String, required: true }, 
//   userEmail: { type: String, required: true },
//   department: { type: String, required: true },
//   status: { type: String, required: true },
//   createdAt: { type: Date, default: Date.now },
//   updatedAt: { type: Date, default: Date.now },
//   comments: [commentSchema],
// });

// module.exports = mongoose.model("Ticket", ticketSchema);
