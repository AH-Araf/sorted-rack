import React from 'react';

const AssignProduct = ({ assignModalVisible, filteredUnassignedProducts, closeAssignModal, searchTerm, setSearchTerm, handleAssign }) => {
    return (
        <div>
            <div
                className={`slider-background1 offcanvas offcanvas-end ${assignModalVisible ? "show" : ""}`}
                tabIndex="-1"
                id="assignProductSidebar"
                aria-labelledby="assignProductLabel"
                style={{ visibility: assignModalVisible ? "visible" : "hidden" }}
            >
                <div className="d-flex justify-content-between m-2">
                    <div>
                        <h4 className="" id="assignProductLabel">Assign From Stock</h4>
                        <p className="p-1">
                            <span className="me-1">In Stock</span>
                            <span className="bg-info px-2 rounded-2">
                                <b>{filteredUnassignedProducts.length}</b>
                            </span>
                        </p> 

                    </div>
                    <button
                        type="button"
                        className="btn-close bg-white"
                        onClick={closeAssignModal}
                        aria-label="Close"
                    >❌</button>
                </div>
                <div className="offcanvas-body">

                    <div className="mb-3">
                        <input
                            type="text"
                            className="form-control"
                            placeholder="Search Product..."
                            value={searchTerm}
                            onChange={(e) => setSearchTerm(e.target.value)}
                        />
                    </div>


                    <div className="scrollable-container">
                        {filteredUnassignedProducts.length > 0 ? (
                            filteredUnassignedProducts.map(product => (
                                <div key={product._id} className="d-flex slider-row justify-content-between align-items-center mb-2">
                                    <p className="mb-0">{product.accessoriesName || product.systemName}</p>
                                    <button className="btn btn-dark text-white" onClick={() => handleAssign(product)}>
                                        <i class="bi bi-mouse2"></i>
                                    </button>
                                </div>
                            ))
                        ) : (
                            <p>No products found</p>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AssignProduct;