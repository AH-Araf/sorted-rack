import React from "react";
import { Navigate } from "react-router-dom";
import { getUserDetails } from "../../service";

const AdminRoute = ({ children }) => {
    const { role } = getUserDetails();
    return role === "admin" || role === "superadmin" ? children : <Navigate to="/login" />;
};

const SuperAdminRoute = ({ children }) => {
    const { role } = getUserDetails();
    return role === "superadmin" ? children : <Navigate to="/login" />;
};

export { AdminRoute, SuperAdminRoute };
