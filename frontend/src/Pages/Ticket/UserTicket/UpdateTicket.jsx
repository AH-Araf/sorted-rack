import React from 'react';

const UpdateTicket = ({
    editModalVisible,
    setEditModalVisible,
    editAccessoriesType,
    setEditAccessoriesType,
    editDescription,
    setEditDescription,
    editPriority,
    setEditPriority,
    editDepartment,
    setEditDepartment,
    handleUpdate
}) => {
    return (
        <div>
            <b>
                <div
                    className={`slider-background offcanvas offcanvas-end ${editModalVisible ? "show" : ""}`}
                    tabIndex="-1"
                    id="editTicketSidebar"
                    aria-labelledby="editTicketLabel"
                    style={{ visibility: editModalVisible ? "visible" : "hidden" }}
                >
                    <div className="offcanvas-header">
                        <h4 className="offcanvas-title" id="editTicketLabel">Update Ticket</h4>
                        <button
                            type="button"
                            className="btn-close bg-white"
                            onClick={() => setEditModalVisible(false)}
                            aria-label="Close"
                        >❌</button>
                    </div>
                    <div className="offcanvas-body">
                        <div className="mb-3">
                            <label className="form-label">Accessories Type</label>
                            <select
                                className="form-select"
                                value={editAccessoriesType}
                                onChange={(e) => setEditAccessoriesType(e.target.value)}
                            >
                                <option value="Mouse">Mouse</option>
                                <option value="Monitor">Monitor</option>
                                <option value="Headphone">Headphone</option>
                                <option value="Keyboard">Keyboard</option>
                                <option value="USB Dongle">USB Dongle</option>
                                <option value="Laptop">Laptop</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Description</label>
                            <textarea
                                className="form-control "
                                rows="3"
                                value={editDescription}
                                onChange={(e) => setEditDescription(e.target.value)}
                            ></textarea>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Priority</label>
                            <select
                                className="form-select"
                                value={editPriority}
                                onChange={(e) => setEditPriority(e.target.value)}
                            >
                                <option value="High">High</option>
                                <option value="Medium">Medium</option>
                                <option value="Low">Low</option>
                            </select>
                        </div>
                        <div className="mb-3">
                            <label className="form-label">Department</label>
                            <select
                                className="form-select"
                                value={editDepartment}
                                onChange={(e) => setEditDepartment(e.target.value)}
                            >
                                <option value="Operations">Operations</option>
                                <option value="Development">Development</option>
                                <option value="Quality Assurance">Quality Assurance</option>
                                <option value="Product Management">Product Management</option>
                                <option value="Design">Design</option>
                                <option value="Sales and Marketing">Sales and Marketing</option>
                                <option value="Customer Support">Customer Support</option>
                                <option value="Human Resources (HR)">Human Resources (HR)</option>
                            </select>
                        </div>
                    </div>
                    <div className="offcanvas-footer">
                        <button
                            type="button"
                            className="btn btn-success ms-3"
                            onClick={handleUpdate}
                        >
                            Save changes
                        </button>
                    </div>
                </div>
            </b>
        </div>
    );
};

export default UpdateTicket;
